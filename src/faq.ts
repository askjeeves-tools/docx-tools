export interface FaqEntry {
	question: string;
	answer: string;
}

export const FAQ_ENTRIES: FaqEntry[] = [
	{
		question: "Is this Word converter free?",
		answer:
			"Yes. Every conversion is free with no account, watermark, or usage limit.",
	},
	{
		question: "Is this DOCX converter secure?",
		answer:
			"Yes. Files are processed locally in your browser. Nothing is uploaded to a server, so your documents stay on your device.",
	},
	{
		question: "What formats can I convert DOCX to?",
		answer:
			"You can convert DOCX to HTML, plain text, or PDF. Choose the output format after uploading your Word file.",
	},
	{
		question: "How accurate is Word to PDF conversion?",
		answer:
			"The PDF output is a basic snapshot of the document content rendered in your browser. Complex Word layouts, headers, footers, and precise formatting may not match Microsoft Word exactly.",
	},
	{
		question: "Does the converter work on mobile?",
		answer:
			"Yes. It runs in modern mobile browsers that support HTML5 and JavaScript. Very large files may be slower on mobile devices.",
	},
	{
		question: "What is the maximum file size?",
		answer:
			"Each file can be up to about 50 MB. If a file is too large, you will see a clear error message asking you to use a smaller file.",
	},
	{
		question: "Why did my conversion fail?",
		answer:
			"Common causes are a non-DOCX file, corrupted document data, or exceeding the size limit. Check the message below the converter for specific guidance, then try again or refresh the page.",
	},
];
