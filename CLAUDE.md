# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static landing page for **Das German Bot** — a Telegram bot for learning German. Live at [dasgermanbot.com](https://dasgermanbot.com). No build tools, frameworks, or package managers. Pure HTML + CSS + JS. Hosted on GitHub Pages with custom domain.

## Development

Open `index.html` directly in a browser — no server or build step required. For local dev with live reload: `python3 -m http.server`.

## File Structure

- **`index.html`** — Main landing page (hero, demo video, features, how-it-works, CTA, footer)
- **`thank-you.html`** — Post-conversion page after user clicks through to Telegram bot
- **`privacy.html`** / **`terms.html`** — Legal pages
- **`demo_ru.mp4`** — Russian demo video
- **`CNAME`** — Custom domain (`dasgermanbot.com`) for GitHub Pages
- **`blog/`** — Blog section (see below)

All CSS and JS are inline within each HTML file (no external stylesheets or scripts besides Google Fonts, GTM, Meta Pixel, GA4, Flowsery, and marked.js in blog articles).

## i18n System

Client-side multi-language support with 4 languages: **EN, UA (Ukrainian), RU (Russian), SK (Slovak)**.

- Translation keys applied via `data-i18n` attributes on elements
- Translations stored in a `translations` object in each page's `<script>` block
- Language preference persisted to `localStorage` under key `'lang'`
- Language switcher buttons use `data-lang` attribute and call `setLanguage(lang)`
- Each HTML page has its own independent translations — must update **all** relevant files

## Blog Architecture

Blog articles use a **markdown + client-side rendering** pattern:

- **`blog/manifest.json`** — Article index (array of objects with slug, date, tags, per-language title/description). Articles display in reverse manifest order (last entry = newest = shown first).
- **`blog/posts/{lang}/{slug}.md`** — Markdown source per language. Files have YAML frontmatter (`title`, `description`, `date`, `lang`, `image`, `tags`).
- **`blog/{slug}.html`** — One HTML file per article. All article HTML files share the same template. Slug is auto-detected from the filename via `window.location.pathname`. The JS fetches the markdown, parses frontmatter, renders with **marked.js**, and injects into `#article-body`.
- **`blog/index.html`** — Blog listing page. Reads `manifest.json` and renders article cards.

### Adding a New Blog Article

1. Write markdown files: `blog/posts/{en,ru,uk,sk}/{slug}.md` with YAML frontmatter
2. Add entry to `blog/manifest.json` (append to end of array — it will show as newest)
3. Copy an existing article HTML: `cp blog/why-learn-german-in-telegram.html blog/{slug}.html`
4. Commit and push

## Analytics & Tracking

All pages include (via inline `<script>`):
- **Google Tag Manager** (GTM-PXHHH8TK)
- **Meta Pixel** (ID 1445746883270633)
- **GA4** (G-FES4KCTZ1T)
- **Flowsery** (flid_4RIHfEW_NNP0UCNbgJia_g)

Blog article pages also track CTA clicks via `trackCTAClick()` — fires `InitiateCheckout` (Meta) and `blog_cta_click` (GA4) events with location context (`navbar` or `article_body`).

## Design

- Dark theme with CSS custom properties (accent blue `#4271FE`, coral `#FA6254`, bg `#070612`)
- Skyeng-inspired animated background: three floating blurred color blobs + subtle grid overlay
- Responsive breakpoints at 992px and 768px
- Fonts: Inter (UI), Lora (blog article body) via Google Fonts

## Key URLs

- Telegram bot: `https://t.me/dasgermanbot` — all CTA buttons link here


## Development Timeline

### Recent Commits (Last 10)

- **46da3f9** (2026-04-26): Extract navbar into shared navbar.js component - 5-tips-german-beginners.html, article.html, german-animals.html (+39 more)
- **66aa384** (2026-04-26): Replace language buttons with dropdown on all pages - 5-tips-german-beginners.html, article.html, german-animals.html (+37 more)
- **f4496f7** (2026-04-26): Unify langs/languages: normalize both property names everywhere - index.html, index.html
- **b8a653d** (2026-04-26): Fix missing articles + show hero video on mobile - manifest.json, index.html
- **d1d9796** (2026-04-26): Add blog article: German Colors Vocabulary (EN/RU/UK/SK) - german-colors-vocabulary.html, manifest.json, german-colors-vocabulary.md (+3 more)
- **a3f4a55** (2026-04-26): Add blog article: German Food Vocabulary (EN/RU/UK/SK) - german-food-vocabulary.html, manifest.json, german-food-vocabulary.md (+3 more)
- **b82e7a9** (2026-04-26): Add blog article: German Emotions and Feelings (EN/RU/UK/SK) - german-emotions.html, manifest.json, german-emotions.md (+3 more)
- **a967ff6** (2026-04-26): Add blog article: German Animals Vocabulary (EN/RU/UK/SK) - german-animals.html, manifest.json, german-animals.md (+3 more)
- **79f224d** (2026-04-26): Add blog article: German House and Home Vocabulary (EN/RU/UK/SK) - german-house-vocabulary.html, manifest.json, german-house-vocabulary.md (+3 more)
- **da90997** (2026-04-26): Add blog article: German Hobbies and Leisure Vocabulary (EN/RU/UK/SK) - german-hobbies.html, manifest.json, german-hobbies.md (+3 more)