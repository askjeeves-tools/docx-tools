import askJeeves from "@askjeeves/astro-integration";
import { defineConfig } from "astro/config";
import pkg from "./package.json" with { type: "json" };

export default defineConfig({
	output: "static",
	site: "https://docx.askjeeves.cc",
	integrations: [
		askJeeves({
			name: "Ask Jeeves",
			tagline:
				"Convert Word files in your browser. Nothing leaves your device.",
			version: pkg.version,
			openGraph: {
				home: {
					title: "Word Converter — Ask Jeeves",
					description:
						"Free DOCX to HTML, plain text, and PDF conversion in your browser.",
				},
			},
		}),
	],
	vite: {
		resolve: { preserveSymlinks: true },
		ssr: {
			noExternal: [
				"@askjeeves/conversion-core",
				"@askjeeves/processors-docx",
				"@askjeeves/ui",
			],
		},
	},
});
