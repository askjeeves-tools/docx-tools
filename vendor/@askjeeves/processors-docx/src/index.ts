import type {
	ConversionOptions,
	ConversionResult,
	ProcessorContext,
} from "@askjeeves/conversion-core";
import {
	basename,
	formatBytes,
	MAX_DOCX_PDF_BYTES,
	MAX_DOCX_PDF_PAGES,
	throwIfAborted,
	userFacingError,
	withConversionError,
} from "@askjeeves/conversion-core";
import { mammothInput } from "./docx-mammoth";

export async function docxToHtml(
	file: File,
	_options?: ConversionOptions,
	_context?: ProcessorContext,
): Promise<ConversionResult> {
	return withConversionError("docx", async () => {
		const mammoth = await import("mammoth");
		const arrayBuffer = await file.arrayBuffer();
		throwIfAborted(_context?.signal);
		const result = await mammoth.convertToHtml(mammothInput(arrayBuffer));

		const html = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>${result.value}</body></html>`;
		return {
			blob: new Blob([html], { type: "text/html" }),
			filename: `${basename(file.name)}.html`,
			mimeType: "text/html",
		};
	});
}

export async function docxToText(
	file: File,
	_options?: ConversionOptions,
	_context?: ProcessorContext,
): Promise<ConversionResult> {
	return withConversionError("docx", async () => {
		const mammoth = await import("mammoth");
		const arrayBuffer = await file.arrayBuffer();
		throwIfAborted(_context?.signal);
		const result = await mammoth.extractRawText(mammothInput(arrayBuffer));
		return {
			blob: new Blob([result.value], { type: "text/plain" }),
			filename: `${basename(file.name)}.txt`,
			mimeType: "text/plain",
		};
	});
}

export async function docxToPdf(
	file: File,
	_options?: ConversionOptions,
	_context?: ProcessorContext,
): Promise<ConversionResult> {
	return withConversionError("docx", async () => {
		if (file.size > MAX_DOCX_PDF_BYTES) {
			throw userFacingError(
				`File exceeds ${formatBytes(MAX_DOCX_PDF_BYTES)} limit for Word → PDF.`,
			);
		}

		const mammoth = await import("mammoth");
		const { jsPDF } = await import("jspdf");

		const arrayBuffer = await file.arrayBuffer();
		throwIfAborted(_context?.signal);
		const result = await mammoth.convertToHtml(mammothInput(arrayBuffer));

		const container = document.createElement("div");
		container.style.cssText = [
			"position: fixed",
			"left: -9999px",
			"top: 0",
			"width: 800px",
			"padding: 40px",
			"font-family: system-ui, sans-serif",
			"font-size: 12pt",
			"line-height: 1.5",
			"color: #000",
			"background: #fff",
		].join(";");
		container.innerHTML = result.value;
		document.body.appendChild(container);

		try {
			const doc = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
			await doc.html(container, {
				width: 515,
				windowWidth: 800,
				html2canvas: { scale: 0.75, useCORS: true },
			});

			const pages = doc.getNumberOfPages();
			if (pages > MAX_DOCX_PDF_PAGES) {
				throw userFacingError(
					`Output exceeds ${MAX_DOCX_PDF_PAGES} pages. Try a shorter document or split it first.`,
				);
			}

			const pdfBlob = doc.output("blob");
			return {
				blob: pdfBlob,
				filename: `${basename(file.name)}.pdf`,
				mimeType: "application/pdf",
			};
		} finally {
			document.body.removeChild(container);
		}
	});
}
