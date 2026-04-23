# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static landing page for **Das German Bot** — a Telegram bot for learning German. No build tools, frameworks, or package managers. Pure HTML + CSS + JS.

## Architecture

- **`index.html`** — Main landing page (hero, demo video, features, how-it-works, CTA, footer)
- **`thank-you.html`** — Post-conversion page shown after user clicks through to Telegram bot
- All CSS and JS are inline within each HTML file (no external stylesheets or scripts besides Google Fonts)

## i18n System

Client-side multi-language support with 4 languages: **EN, UA (Ukrainian), RU (Russian), SK (Slovak)**.

- Translation keys are applied via `data-i18n` attributes on elements
- Translations are stored in a `translations` object in each page's `<script>` block
- Language preference is persisted to `localStorage` under key `'lang'`
- Language switcher buttons use `data-lang` attribute and call `setLanguage(lang)`
- Both pages share the same i18n pattern independently — translations must be updated in **both** files

## Video Behavior

- Demo video sources are language-specific (`videoSources` object in `index.html`)
- Russian video (`demo_ru.mp4`) renders in **1:1 square** aspect ratio with `max-width: 480px`
- All other languages render in **16:9 landscape** with `max-width: 1000px`
- Video URLs for EN, UA, SK are TODO (empty strings)

## Design

- Skyeng-inspired animated background: three floating blurred color blobs + subtle grid overlay
- CSS custom properties for theming (accent blue `#4271FE`, coral `#FA6254`)
- Responsive breakpoints at 992px and 768px
- Font: Inter via Google Fonts

## Key URLs

- Telegram bot: `https://t.me/dasgermanbot`
- All CTA buttons link to the Telegram bot URL

## Development

Open `index.html` directly in a browser — no server or build step required. For local development with live reload, use any static file server (e.g. `python3 -m http.server`).
