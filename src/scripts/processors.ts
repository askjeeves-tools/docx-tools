import { docxToHtml, docxToPdf, docxToText } from "@askjeeves/processors-docx";
import type { ProcessorMap } from "@askjeeves/ui/scripts/tool-controller";

export const processors: ProcessorMap = {
	"docx-html": docxToHtml,
	"docx-txt": docxToText,
	"docx-pdf": docxToPdf,
};
