# Das German Bot — Landing Page

Static landing page for **Das German Bot**, a Telegram bot for learning German.

Live at [dasgermanbot.com](https://dasgermanbot.com)

## Structure

```
index.html              Main landing page
privacy.html            Privacy Policy
terms.html              Terms of Service
thank-you.html          Post-conversion page
demo_ru.mp4             Demo video
favicon.svg             Site favicon
CNAME                   Custom domain for GitHub Pages
blog/
  index.html            Blog listing
  article.html          Legacy article template (redirects)
  manifest.json         Article index
  {slug}.html           Individual article pages (one per article)
  posts/
    en/                 English articles (markdown)
    ru/                 Russian articles
    uk/                 Ukrainian articles
    sk/                 Slovak articles
```

## Adding a New Blog Article

1. Write a markdown file with YAML frontmatter and save it for each language:
   ```
   posts/en/my-new-article.md
   posts/ru/my-new-article.md   (optional)
   posts/uk/my-new-article.md   (optional)
   ```

   Frontmatter format:
   ```md
   ---
   title: "Article Title"
   description: "Short description for SEO and cards."
   date: "2026-04-23"
   lang: "en"
   image: ""
   tags: ["tips"]
   ---
   ```

2. Add an entry to `blog/manifest.json`:
   ```json
   {
     "slug": "my-new-article",
     "date": "2026-04-23",
     "image": "",
     "tags": ["tips"],
     "langs": {
       "en": { "title": "...", "description": "..." },
       "ru": { "title": "...", "description": "..." }
     }
   }
   ```

3. Copy an existing article HTML file:
   ```bash
   cp blog/why-learn-german-in-telegram.html blog/my-new-article.html
   ```

   The slug is auto-detected from the filename — no code changes needed.

4. Commit and push. The article appears on the blog immediately.

## Tech

- Pure HTML + CSS + JS, no build tools or frameworks
- Client-side i18n with 4 languages: EN, UA (Ukrainian), RU (Russian), SK (Slovak)
- Blog articles rendered from markdown via [marked.js](https://marked.js.org)
- Hosted on GitHub Pages with custom domain
