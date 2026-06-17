export const HOW_IT_WORKS_STEPS = [
	"Upload a DOCX file using the drop zone or file picker.",
	"Choose an output format: HTML, plain text, or PDF.",
	"Click Convert, then download your result. Nothing is uploaded to a server.",
] as const;

export const SECURITY_SECTION_COPY =
	"Your files are processed locally in your browser. Nothing is stored on a server and nothing is uploaded over the network. That makes this tool a good fit for contracts, reports, and other sensitive documents you do not want to send to a third-party service.";

export const CONVERSION_DESCRIPTIONS: Record<string, string> = {
	"docx-html":
		"Convert DOCX to HTML for web publishing, CMS import, or preview in a browser.",
	"docx-txt":
		"Extract plain text from a Word document for search, analysis, or paste into other apps.",
	"docx-pdf":
		"Turn a Word document into a basic PDF snapshot of the content. Layout may differ from the original Word file.",
};
