# Notes for AI agents working on this repo

This is Gurunath Parasaram's personal site (Jekyll, built by GitHub Pages from `main`).
Humans: see `README.md`. This file is excluded from the site build.

## Content rules (always follow)
- Never name clients or the companies a client project was for, internal product or project names, or the US states tied to client work.
- Never mention immigration, visa or work-authorization status.
- No phone number. No home city or street; the site shows the role and links only.
- Keep the Tiger Analytics role title as **Data Scientist**, matching the resume on file. Other roles are as in `_data/cv.yml`.
- Experience on the site stays short: 1-3 sentences per role (`summary`) plus a one-line `stack`. The full resume is the PDF at `assets/cv.pdf`.
- Plain, factual wording. No superlatives or inflated adjectives.
- Figures stay general (matching LinkedIn): `$xx M`, `$x M`, `xxK RPS`, "tens of thousands of contracts", "thousands of service reps". Never the exact dollar, contract or RPS numbers.
- The payment-integrity result belongs to a multi-team program. Credit Gurunath with leading its AI core ("Led the AI core of a payment-integrity program that identified $xx M in overpayments"); never say he alone found, saved or surfaced the money.
- No job-seeking language ("open to work", "looking for").
- News: blog posts are added automatically. `_data/news.yml` is for manual items (LinkedIn posts, talks). No career or education updates.
- Plain and game mode must show the same pages and content. Add pages through `_data/levels.yml`; never add content that only one mode shows.

## Where content lives
- `_data/profile.yml` (summary, links, numbers), `_data/cv.yml`, `_data/news.yml`, `_data/travel.yml`, `_data/reading.yml`, `_data/telugu.yml`, `_data/x_posts.yml` (selected X posts), `_data/levels.yml` (page list for both modes).
- Blog posts: `_posts/`.
- One stylesheet (`assets/css/site.css`) and one script (`assets/js/site.js`). No build step and no npm.

## How to write a blog post
1. Create `_posts/YYYY-MM-DD-short-title.md`, for example `_posts/2026-11-15-evaluating-llm-agents.md`. The post is served at `/blog/YYYY/MM/DD/short-title/`.
2. Start with front matter. Only `title` is required; the layout and the game-mode level are set by `_config.yml` defaults.
   ```yaml
   ---
   title: Evaluating LLM agents with golden datasets
   description: One or two sentences for the blog list and link previews.
   tags: [llm, evaluation]
   ---
   ```
3. Write Markdown (GFM): `##` headings, lists, links, tables and fenced code blocks with a language.
4. Images go in `assets/img/blog/` and need alt text: `![What the image shows](/assets/img/blog/diagram.png)`.
5. Posts appear on `/blog/`, under "Latest writing" on the home page, and in the home page News box automatically. There is no RSS feed.

## Checking a change
```bash
bundle exec jekyll build
```
Then serve `_site/` and check both modes: `?mode=plain` and `?mode=game` (the mode is stored in `localStorage` key `gp-mode`).
Check light and dark themes, a 390px-wide viewport, and the browser console for errors.
Only GitHub Pages-supported plugins may be added (see `_config.yml`).
