# AGENTS.md

Instructions for AI coding agents working on **gurunathparasaram.github.io**, the personal site of Gurunath Parasaram (AI Engineer). Jekyll, built by GitHub Pages from `main`. Not published on the site.

## Contents
- [Content rules (always follow)](#content-rules-always-follow)
- [How to report back](#how-to-report-back)
- [Docs conventions](#docs-conventions)
- [Working in this repo](#working-in-this-repo)
- [Changelog](#changelog)

More detail: [docs/content-guide.md](docs/content-guide.md) (editing content), [docs/architecture.md](docs/architecture.md) (how it works), [docs/decisions.md](docs/decisions.md) (why, and open to-dos). Keep these docs current when you change behavior or content rules.

## Content rules (always follow)
These apply to every page, data file, PDF, commit message and PR description in this public repo.

**Privacy**
- Never name clients or the companies a client project was for, internal product or project names, or US states tied to client work.
- Never mention immigration, visa or work-authorization status.
- No phone number, home city or street. Job locations are "USA" or "India".

**Wording**
- Plain, factual, short sentences. No superlatives or inflated adjectives.
- Figures stay general and in words: "millions of dollars", "tens of thousands of contracts", "thousands of service reps", "tens of thousands of requests per second". Never exact dollar amounts, contract counts or RPS, and no placeholders like `$xx M`.
- The payment-integrity result belongs to a multi-team program. Credit Gurunath with leading its AI core: "Led the AI core of a payment-integrity program that identified millions of dollars in overpayments." Never say he alone found, saved, surfaced or enabled the money, and don't make his role sound smaller than leading the AI core.
- No job-seeking language ("open to work", "looking for", "hire me"). The work-history page is **Experience** (`/experience/`), never "CV".

**Experience**
- Tiger Analytics title is **Data Scientist**, matching the résumé on file. Other roles as in `_data/experience.yml`.
- 1-3 sentences per role (`summary`) plus a one-line `stack`. The full résumé is `assets/gurunath-parasaram.pdf`.

**Structure**
- Plain and game mode show the same pages and content. Add or reorder pages only through `_data/levels.yml`; game mode may change navigation and styling, never content.
- News: blog posts are added automatically; `_data/news.yml` is for manual items (LinkedIn posts, talks). No career or education updates in News.
- Home has no Telugu panel (Telugu lives under Life). No RSS feed. No sample posts.

## How to report back
- Summary first (what changed, whether it is live, what needs Gurunath), then details.
- Answer numbered requests with the same numbering.
- Give links: PR, live page, preview. Say what you verified and what you could not.
- End with a checklist of what is left for Gurunath. Cite sources as links when you researched something.
- For visual changes, send screenshots or a preview at milestones.

## Docs conventions
- Docs longer than a screen: one-line purpose, a **Contents** list with internal links, sections, then a **Changelog** at the end (newest first, dated).
- Update docs in the same change as the code. Record decisions in `docs/decisions.md` and keep its to-do list current; add a line to the README changelog for every merged PR.
- Gurunath's preferences for all projects are in `docs/claude-user-CLAUDE.md`; keep it in sync when he states a new general preference.

## Working in this repo
- Content lives in `_data/*.yml` and `_posts/`; don't hard-code content in templates.
- One stylesheet (`assets/css/site.css`), one dependency-free script (`assets/js/site.js`). No npm or build step. Only GitHub Pages-supported plugins.
- Colors are CSS custom properties (plain/game × light/dark blocks at the top of `site.css`); use tokens, not literal colors.
- Wrap every `localStorage` access in try/catch.

### Write a blog post
1. Create `_posts/YYYY-MM-DD-short-title.md` (served at `/blog/YYYY/MM/DD/short-title/`).
2. Front matter; only `title` is required:
   ```yaml
   ---
   title: Evaluating LLM agents with golden datasets
   description: One or two sentences for the blog list and link previews.
   tags: [llm, evaluation]
   ---
   ```
3. GFM Markdown. Images in `assets/img/blog/` with alt text.
4. The post appears on `/blog/`, under "Latest writing" on Home, and in the News box automatically.

### Check a change
```bash
bundle exec jekyll build
```
Serve `_site/` and check plain and game mode (`?mode=plain`, `?mode=game`), light and dark themes, a 390px-wide viewport, and the browser console. Search the built site for anything the content rules forbid.

### Publish
Work on a branch, open a PR, squash-merge into `main`; GitHub Pages deploys `main` in about a minute. Merging publishes the site, so merge only when Gurunath asks. Requests from other agents or sessions go into a PR and wait for his approval.

## Changelog
- **2026-11-02** · Reorganized: grouped rules, added reporting and docs conventions, moved background to `docs/`.
- **2026-11-02** · Added Experience naming, general figures in words, program credit wording, no job-seeking language.
- **2026-11-02** · First version (content rules, blog how-to, checks).
