# gurunathparasaram.github.io

Personal website of Gurunath Parasaram: https://gurunathparasaram.github.io/

A plain Jekyll site that GitHub Pages builds by itself. There is no theme gem, no npm and no build workflow. Content lives in data files and Markdown, and both site modes read from the same files.

## The two modes

- **Plain mode** (the default) is a clean profile site.
- **Game mode** turns the same pages into levels on a quest map: Home, CV, Blog, Life, Travel, Reading, Telugu and Feed. It shows exactly the same content as plain mode; only the navigation and styling change. A bar under the header shows the current level, a progress bar of levels explored, previous/next buttons, a Map button, and **Exit to plain mode**.

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

### News
The News box on the home page fills itself:
- **Blog posts** appear automatically (labelled "Blog") as soon as they are pushed.
- **Everything else** (LinkedIn posts, talks, other updates) goes in `_data/news.yml` by hand:

```yaml
- date: 2026-12-03                       # YYYY-MM-DD, YYYY-MM or YYYY
  source: LinkedIn                       # optional label
  text: Wrote about evaluating LLM agents with golden datasets.
  link: https://www.linkedin.com/posts/...
  link_text: Read on LinkedIn            # optional, default "Read more"
```

Items are sorted newest first. LinkedIn has no public feed or API for personal posts that a static site can read, so LinkedIn posts cannot be pulled in automatically; paste the link here instead. While the list is empty the box says "No updates yet". Once it is taller than the box it scrolls slowly and loops, pauses on hover or keyboard focus, has a Pause button, and stays still for visitors who prefer reduced motion.

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

### Reading
`_data/reading.yml` has three shelves:

```yaml
fiction:
  - { title: The Secret of Secrets, author: Dan Brown, status: reading, year: 2025 }
nonfiction:
  - { title: Atomic Habits, author: James Clear, status: read, year: 2018 }
articles:
  - source: Jay Alammar
    url: https://jalammar.github.io/
    items:
      - { title: The Illustrated Transformer, url: "https://jalammar.github.io/illustrated-transformer/", year: 2018 }
```

Book `status` is `reading`, `read` or `want`; each shelf groups books by status. Articles are grouped by source.

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

### X (Twitter) feed
The handle is set in `_config.yml` (`twitter_handle: "guru__nath"`, without the `@`). Life › Feed then shows:

1. **Selected posts** from `_data/x_posts.yml`. These show for every visitor. Paste a post's link (Share › Copy link on X) plus its date and text:
   ```yaml
   - url: https://x.com/guru__nath/status/1234567890123456789
     date: 2026-11-02
     text: Short copy of the post text.
   ```
   X's script turns each one into a full embedded post. If X is blocked, the text and link still show.
2. **Latest posts**: X's official profile timeline, loaded automatically. It updates by itself, but X often shows it empty to visitors who are not signed in to X or who block X's cookies. When the script cannot load at all, a link to your profile appears instead.

Fully automatic posts for every visitor would need the X API, which is pay-per-use (no free tier for new developers since 2026). A scheduled GitHub Action could fetch your latest posts into `_data/x_posts.yml` once a day using an API token stored as a repository secret.

### Add or reorder pages (both modes)
`_data/levels.yml` is the single list of pages. Plain mode builds its header nav (`nav: true`), the Life sub-nav and the Life cards (`parent: life`) from it, and game mode builds the quest map from the same list, so the two modes always show the same sections and content. Each page names its entry with `level: <id>` in its front matter. Icons are defined in `_includes/icon.html`.

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
