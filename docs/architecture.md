# Architecture

How the site is put together. For editing content, see [content-guide.md](content-guide.md).

## Contents
- [Stack](#stack)
- [Files](#files)
- [Modes](#modes)
- [News box](#news-box)
- [Other pieces](#other-pieces)
- [Checking a change](#checking-a-change)
- [Workflow](#workflow)
- [Changelog](#changelog)

## Stack
- **Jekyll 3** as built by GitHub Pages ("Deploy from a branch", `main`, root). `theme: null`: every layout and include lives in this repo.
- **Plugins** (GitHub Pages-supported only): `jekyll-seo-tag` (meta and Open Graph tags), `jekyll-sitemap`, `jekyll-redirect-from`.
- **One stylesheet** (`assets/css/site.css`) and **one script** (`assets/js/site.js`, no dependencies). No npm, no bundler, no Actions workflow.
- Fonts from Google Fonts. Everything else is self-hosted.

## Files
```
_config.yml            site settings, plugins, post defaults, build excludes
_data/                 all content (see content-guide.md)
_layouts/default.html  page shell: head, header, game HUD, main, toast, map dialog, footer
_layouts/post.html     blog post
_includes/
  head.html            meta, fonts, CSS/JS, inline script that sets mode/theme before paint
  header.html          brand, main nav (from levels.yml), Plain/Game switch, theme button
  game-hud.html        game-mode bar: level, progress, prev/next, Map, Exit
  quest-map.html       level-select map (used on Home and in the map dialog)
  map-dialog.html      <dialog> wrapper for the map (key M)
  news.html            News box: merges news.yml + posts
  life-nav.html        Life sub-nav (from levels.yml)
  bookshelf.html       a status-grouped book shelf (Reading)
  email.html           obfuscated email link
  icon.html            inline SVG icons
  world-land-path.txt  pre-rendered world map path (Travel)
index.html             Home
experience/index.html  Experience (redirects from /cv/ and /resume/)
blog/index.html        Blog list
life/…                 Life overview, travel, reading, telugu, feed
404.html
assets/                css, js, img, résumé PDF
docs/                  these docs (not published)
```

## Modes
- `<html data-mode="plain|game">` drives everything. The inline script in `head.html` sets it before first paint from, in order: the `?mode=` URL parameter, `localStorage` key `gp-mode`, then `default_mode` in `_config.yml`. Storage access is wrapped in try/catch.
- Game-only UI has the class `game-only` and is hidden by CSS unless `data-mode="game"` (and hidden without JS).
- Game mode changes **styling and navigation only** (palette, pixel headings, HUD, map, toast). It never adds or hides content. Keep it that way.
- Theme: `data-theme="light|dark"` when the visitor has chosen one (`localStorage` `gp-theme`), otherwise `prefers-color-scheme`. JS mirrors the result in `data-theme-resolved`. All colors are CSS custom properties defined in four blocks (plain/game × light/dark) at the top of `site.css`.

### One page list for both modes
`_data/levels.yml` lists every page once. Plain mode builds the header nav (`nav: true`), the Life sub-nav and the Life cards (`parent: life`) from it. Game mode builds the quest map and the HUD's prev/next from it, in the same order. Each page names its entry with `level: <id>` in front matter (posts get `level: blog` from `_config.yml` defaults). Pages without a level show "Side area" in the HUD.

### Game details
- Progress: every visited page id is stored in `localStorage` `gp-visited` and shown as stars and the XP bar.
- Map keyboard: roving tabindex; arrows and Home/End move, Enter opens. The trail SVG and avatar position are computed from node positions and redrawn on resize.
- Toast: "Level clear" appears when the footer scrolls into view.
- Reduced motion: no avatar animation or transitions.

## News box
`_includes/news.html` builds keys like `2026-12-03~n~0` (manual item) and `2026-11-15~p~2` (post), sorts them as strings (newest first) and renders each. Empty list → "No updates yet". `site.js` makes the box scroll only when the list is taller than the box: it clones the list for a seamless loop, pauses on hover, focus or the Pause button, stops when off-screen, and does nothing under `prefers-reduced-motion`.

## Other pieces
- **Travel map:** equirectangular SVG; Liquid converts `lat`/`lon` to x/y (`x = (lon + 180) × 2.7778`, `y = (90 − lat) × 2.7778`).
- **X feed:** `site.js` loads `platform.twitter.com/widgets.js` on the Feed page, which upgrades the timeline link and selected-post blockquotes. A fallback note appears if the script cannot load within 10 seconds.
- **Email:** assembled in the browser from `email_user` and `email_domain`.
- **Redirects:** `redirect_from` in front matter keeps old URLs working (`/cv/`, `/resume/`, `/travel/`, `/contact/`, `/aboutme/`, `/posts/`).
- **Accessibility:** semantic landmarks, skip link, visible focus, `[hidden]` always hidden, `lang="te"` on Telugu text, alt text, light and dark themes.

## Checking a change
```bash
bundle exec jekyll build
```
Serve `_site/` and check: plain and game mode (`?mode=plain`, `?mode=game`), light and dark, a 390px-wide viewport, and the browser console. Search the built site for anything the content rules forbid before publishing.

## Workflow
Work on a branch, open a PR, squash-merge to `main`; GitHub Pages deploys `main`. Merging is publishing, so merge only when Gurunath asks.

## Changelog
- **2026-11-02** · First version, written after the Experience rename and the X feed changes.
