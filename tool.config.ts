import { createToolConfig } from "@askjeeves/conversion-core";
import { SEO_BRAND_TITLE, SEO_DESCRIPTION } from "./src/seo";

export const toolConfig = createToolConfig({
	id: "docx-tools",
	title: SEO_BRAND_TITLE,
	tagline: SEO_DESCRIPTION,
	sourceFormat: "docx",
	allowsMultiple: false,
	minFiles: 1,
	conversions: [
		{
			id: "docx-html",
			source: "docx",
			target: "html",
			label: "DOCX → HTML",
			enabled: true,
			options: "none",
		},
		{
			id: "docx-txt",
			source: "docx",
			target: "txt",
			label: "DOCX → plain text",
			enabled: true,
			options: "none",
		},
		{
			id: "docx-pdf",
			source: "docx",
			target: "pdf",
			label: "Word → PDF (basic)",
			enabled: true,
			options: "none",
		},
	],
});
