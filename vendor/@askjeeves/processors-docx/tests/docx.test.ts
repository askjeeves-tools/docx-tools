import { loadFixtureFile } from "@askjeeves/test-e2e/fixtures";
import { describe, expect, it } from "vitest";
import { docxToHtml, docxToText } from "../src/index";

describe("docx processors", () => {
	it("docxToHtml produces HTML with fixture content", async () => {
		const file = await loadFixtureFile("minimal.docx");
		const result = await docxToHtml(file);

		expect(result.filename).toBe("minimal.html");
		expect(result.mimeType).toBe("text/html");
		const html = await result.blob.text();
		expect(html).toContain("Hello from test fixture");
	});

	it("docxToText extracts plain text", async () => {
		const file = await loadFixtureFile("minimal.docx");
		const result = await docxToText(file);

		expect(result.filename).toBe("minimal.txt");
		const text = await result.blob.text();
		expect(text).toContain("Hello from test fixture");
	});
});
