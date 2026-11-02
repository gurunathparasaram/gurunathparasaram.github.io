# gurunathparasaram.github.io

Personal website of Gurunath Parasaram: https://gurunathparasaram.github.io/

A plain Jekyll site that GitHub Pages builds by itself. There is no theme gem, no npm and no build workflow. Content lives in data files and Markdown, and both site modes read from the same files.

## The two modes

- **Plain mode** (the default) is a clean profile site.
- **Game mode** turns the same pages into seven levels on a quest map: Home, CV, Blog, Travel, Reading, Telugu and Feed. A bar under the header shows the current level, a progress bar of levels explored, previous/next buttons, a Map button, and **Exit to plain mode**.

**Switching:** use the **Plain / Game** switch in the top-right of every page. The choice is saved in the visitor's browser (`localStorage`, key `gp-mode`); if storage is blocked the site still works and falls back to `default_mode` in `_config.yml`. You can link straight to a mode with `?mode=game` or `?mode=plain`.

**Game controls:** press `M` to open the map; on the map, use the arrow keys (or Home/End) to move and Enter to open a level; Esc closes it. Visited levels get a star (`localStorage`, key `gp-visited`).

The theme button (sun/moon) switches light and dark; by default the site follows the system setting.

## Where things live

| What | File |
| --- | --- |
| Name, summary, links, photo, focus areas, home-page numbers | `_data/profile.yml` |
| CV (short role summaries, skills, education, projects, home highlights) | `_data/cv.yml` |
| News on the home page | `_data/news.yml` |
| Travel (US states, other places) | `_data/travel.yml` |
| Books | `_data/reading.yml` |
| Telugu phrases and notes | `_data/telugu.yml` |
| Game levels (order, titles, icons) | `_data/levels.yml` |
| Blog posts | `_posts/` |
| Site settings (Twitter handle, default mode, map) | `_config.yml` |
| Styles / scripts | `assets/css/site.css`, `assets/js/site.js` |

## How to…

### Add a news item
Add an entry at the **top** of `_data/news.yml` (newest first):

```yaml
- date: 2026-12            # YYYY, YYYY-MM or YYYY-MM-DD, shown as written
  text: Spoke about LLM evaluation at a local meetup.
  link: https://example.com # optional
  link_text: Slides         # optional, default "Read more"
```

The news box scrolls slowly and loops when the list is taller than the box. It pauses on hover or keyboard focus, has a Pause button, and stays still for visitors who prefer reduced motion.

### Write a blog post
1. Create `_posts/YYYY-MM-DD-short-title.md`, for example `_posts/2026-11-15-evaluating-llm-agents.md`.
2. Start it with front matter:
   ```yaml
   ---
   title: Evaluating LLM agents with golden datasets
   description: One or two sentences for the blog list and link previews.
   tags: [llm, evaluation]
   ---
   ```
3. Write the post in Markdown below that. Put images in `assets/img/blog/` and always add alt text: `![What the image shows](/assets/img/blog/diagram.png)`.
4. Commit and push. The post appears at `/blog/YYYY/MM/DD/short-title/`, on the Blog page and in "Latest writing" on the home page.

`AGENTS.md` has the same steps for AI coding agents, plus the content rules for this site.

### Add a book
Add to `_data/reading.yml`:

```yaml
- title: Designing Data-Intensive Applications
  author: Martin Kleppmann
  status: reading      # reading | read | want
  year: 2026           # optional
  note: Optional one-liner.
  link: https://...    # optional
```

The three entries marked `sample: true` are placeholders that show a "Sample entry" badge. Replace or delete them.

### Update travel
In `_data/travel.yml`, mark a US state as visited:

```yaml
  - { name: Colorado, visited: true, when: "2025", note: Rocky Mountain NP }
```

Visited states are highlighted on Life › Travel. For cities or countries outside that list, add entries under `places:` (name, country, lat, lon, when, note, optional photo with photo_alt). They appear as cards with pins on a world map.

### Add Telugu phrases or notes
Edit `_data/telugu.yml`. `phrases` and `notes` feed Life › Telugu. Each phrase has `te` (Telugu script), `rom` (romanization) and `en` (English gloss). Telugu text is marked `lang="te"` automatically.

### Update the CV
Each role in `_data/cv.yml` has a 1-3 sentence `summary` and a one-line `stack`. Keep it short; the PDF has the full resume.

### Add the CV PDF
Export the PDF from Overleaf and save it as **`assets/cv.pdf`**, replacing the one-page placeholder that is there now. The "Download PDF" buttons on Home and CV already point to it.

### Set the Twitter / X handle
In `_config.yml`, set `twitter_handle: yourhandle` (no `@`). Until then, Life › Feed shows a short note. Once it is set, the page shows a "Follow on X" link plus a button that loads X's official timeline embed on demand. If the embed is blocked or does not load within 8 seconds, a message with the link to X appears instead.

### Add or reorder game levels
Edit `_data/levels.yml`. Each page says which level it is with `level: <id>` in its front matter. Icons are defined in `_includes/icon.html`.

## Run it locally

```bash
bundle install
```

```bash
bundle exec jekyll serve --livereload
```

Then open http://localhost:4000. On Ruby 3+ the `webrick` gem in the `Gemfile` is needed for `serve`.

## Deploying
Push to `main`. GitHub Pages (Settings › Pages › "Deploy from a branch", `main`, `/ (root)`) builds and publishes the site in a minute or two. Only the plugins GitHub Pages supports are used: `jekyll-seo-tag`, `jekyll-sitemap` and `jekyll-redirect-from`. Old URLs (`/resume/`, `/travel/`, `/contact/`, `/aboutme/`, `/posts/`) redirect to the new pages.

## Credits
- Fonts from Google Fonts, all under the SIL Open Font License: [Fraunces](https://fonts.google.com/specimen/Fraunces), [Noto Sans Telugu](https://fonts.google.com/noto/specimen/Noto+Sans+Telugu) and [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P).
- World map land outlines: [Natural Earth](https://www.naturalearthdata.com/) (public domain), via the [world-atlas](https://github.com/topojson/world-atlas) package (ISC), pre-rendered into `_includes/world-land-path.txt`.
- Icons, the quest map and the avatar were drawn for this site.
- Accessibility: semantic HTML, skip link, visible focus, keyboard-operable map (roving tabindex), `prefers-reduced-motion` support, and light and dark themes.
