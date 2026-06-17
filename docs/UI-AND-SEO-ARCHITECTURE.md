# docx-tools UI & SEO Architecture Guide

Reference implementation for Ask Jeeves single-page converter sites. This repo follows the same pattern as [png-tools](../png-tools/docs/UI-AND-SEO-ARCHITECTURE.md).

**Site:** `https://docx.askjeeves.cc`

---

## 1. Project shape

| Layer | Role |
|-------|------|
| **Project-local** (`src/`, `tool.config.ts`, `public/`) | Tool-specific SEO copy, FAQ, structured data, llms files, processors |
| **Vendor shared** (`vendor/@askjeeves/*`) | Reusable layout, converter shell, head/footer, CSS, client controller, Astro integration |
| **Build pipeline** | `prebuild` regenerates OG images + favicons + llms.txt; `@astrojs/sitemap` emits sitemap at build |

**Stack:** Astro 6 static site, pnpm, Playwright E2E, Cloudflare Pages deploy.

**Single route:** `src/pages/index.astro` — one homepage, no multi-page SEO routing.

**Conversions (3):** DOCX → HTML, DOCX → plain text, Word → PDF (basic)

---

## 2. UI structure and content

### 2.1 Page composition (top → bottom)

```
<head>  ToolHead: meta, OG, Twitter, llms alternates
        ToolStructuredData: JSON-LD @graph
<body>  <main max-width 820px>
          ConverterShell — hero grid + interactive tool
          SeoContent — collapsible SEO sections
          ToolFooter — hub link + version
```

### 2.2 On-page SEO content (`src/components/SeoContent.astro`)

| Section | Source |
|---------|--------|
| Intro | `SEO_DESCRIPTION` + static copy |
| How it works | `HOW_IT_WORKS_STEPS` from `src/seo-copy.ts` |
| Supported conversions | `getEnabledConversions()` + `CONVERSION_DESCRIPTIONS` |
| Secure and private | `SECURITY_SECTION_COPY` |
| FAQ | `FAQ_ENTRIES` from `src/faq.ts` |
| Related tools | `RELATED_TOOLS` from `src/related-tools.ts` (excludes docx.askjeeves.cc) |

---

## 3. SEO implementation inventory

### 3.1 Single source of truth (`src/seo.ts`)

| Export | docx-tools value |
|--------|------------------|
| `SEO_SITE_ORIGIN` | `https://docx.askjeeves.cc` |
| `SEO_BRAND_TITLE` | `Free Secure Word Converter` |
| `SEO_DOCUMENT_TITLE` | `Free Secure Word Converter \| Ask Jeeves` |
| `SEO_OG_TITLE` | `Free Secure Word Converter — Ask Jeeves` |

### 3.2 JSON-LD graph (`src/seo-structured-data.ts`)

`buildDocxToolsExtraGraph(siteOrigin, featureList)` returns 5 linked `@graph` entities with `applicationSubCategory: "DocumentConverter"`.

### 3.3 Static SEO assets

| File | Role |
|------|------|
| `public/og.png` | 1200×630 social image (generated) |
| `public/favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` | Ask Jeeves mascot icons (static in `public/`) |
| `public/robots.txt` | Allow all + sitemap URL |
| `public/_headers` | CDN cache headers |
| `dist/sitemap-index.xml` | Emitted by `@astrojs/sitemap` at build |

---

## 4. File reference (this repo)

| File | Role |
|------|------|
| `src/seo.ts` | Canonical SEO constants |
| `src/seo-copy.ts` | How-it-works, security, conversion descriptions |
| `src/seo-content.ts` | Bridge to tool.config for enabled conversions |
| `src/faq.ts` | FAQ shared by HTML, JSON-LD, llms |
| `src/related-tools.ts` | Cross-links to sibling tools |
| `src/seo-structured-data.ts` | JSON-LD `@graph` builder (`buildDocxToolsExtraGraph`) |
| `src/llms.ts` | llms.txt / llms-full.txt builders |
| `src/components/SeoContent.astro` | On-page SEO sections |
| `src/pages/index.astro` | Page wiring |
| `tool.config.ts` | Tool identity and conversions |
| `astro.config.ts` | Site URL, integrations |
| `scripts/generate-seo-images.mjs` | OG image + favicons |
| `scripts/generate-llms-txt.ts` | llms file generation |
| `public/robots.txt` | Crawler directives |
| `public/_headers` | CDN cache headers |
| `tests/e2e/seo-head.spec.ts` | SEO regression tests |

---

## 5. Verification

```bash
pnpm install
pnpm build
pnpm test:e2e tests/e2e/seo-head.spec.ts
```

See [png-tools UI & SEO Architecture](../png-tools/docs/UI-AND-SEO-ARCHITECTURE.md) for the full replication checklist and design principles.
