# gurunathparasaram.github.io

Personal website of Gurunath Parasaram: **https://gurunathparasaram.github.io/**

A small Jekyll site that GitHub Pages builds by itself: no theme gem, no npm and no build workflow. All content lives in data files (`_data/*.yml`) and Markdown, and both site modes read from the same files.

## Contents
- [Docs](#docs)
- [The site at a glance](#the-site-at-a-glance)
- [Quick start](#quick-start)
- [Backing up Claude settings](#backing-up-claude-settings)
- [Credits](#credits)
- [Changelog](#changelog)

## Docs

| Doc | For | What's in it |
| --- | --- | --- |
| [docs/content-guide.md](docs/content-guide.md) | Gurunath | How to update every part of the site: news, posts, experience, reading, travel, Telugu, X feed, PDF |
| [docs/architecture.md](docs/architecture.md) | Anyone changing code | How the pages, modes, news box, map and styles work |
| [docs/decisions.md](docs/decisions.md) | Everyone | What was decided and why, plus the open to-do list |
| [AGENTS.md](AGENTS.md) | AI coding agents | Content rules that must always hold, and how to work in this repo |
| [CLAUDE.md](CLAUDE.md) | Claude Code | Loads `AGENTS.md` as project memory |

None of these files are published on the site (see `exclude` in `_config.yml`).

`docs/claude-user-CLAUDE.md` holds Gurunath's working preferences for all projects; copy it to `~/.claude/CLAUDE.md` (see [Backing up Claude settings](#backing-up-claude-settings)).

## The site at a glance

| Page | URL | Content from |
| --- | --- | --- |
| Home | `/` | `_data/profile.yml`, `_data/experience.yml` (highlights), `_data/news.yml` + blog posts |
| Experience | `/experience/` | `_data/experience.yml`, `_data/profile.yml` (About) |
| Blog | `/blog/` | `_posts/` |
| Life | `/life/` | `_data/levels.yml` |
| Life › Travel | `/life/travel/` | `_data/travel.yml` |
| Life › Reading | `/life/reading/` | `_data/reading.yml` |
| Life › Telugu | `/life/telugu/` | `_data/telugu.yml` |
| Life › Feed | `/life/feed/` | `twitter_handle` in `_config.yml`, `_data/x_posts.yml` |

**Two modes, same content.** Plain mode is a clean profile site. Game mode shows the same pages as levels on a quest map, with a progress bar and an **Exit to plain mode** button. The Plain/Game switch is in the top-right of every page; the choice is remembered in the browser.

## Quick start

Preview locally:

```bash
bundle install
```

```bash
bundle exec jekyll serve --livereload
```

Open http://localhost:4000 (add `?mode=game` to try game mode).

Publish: push or merge to `main`. GitHub Pages (Settings › Pages › "Deploy from a branch", `main`, `/ (root)`) rebuilds the site in about a minute.

## Backing up Claude settings
| What | Where it lives | How it is backed up |
| --- | --- | --- |
| This repo's rules | `AGENTS.md`, `CLAUDE.md`, `docs/` | In git, on GitHub |
| Your preferences for all projects | `~/.claude/CLAUDE.md` on each computer | Master copy at `docs/claude-user-CLAUDE.md` here; better, a private dotfiles repo (below) |
| Claude Code settings, custom agents, commands, skills | `~/.claude/settings.json`, `~/.claude/agents/`, `~/.claude/commands/`, `~/.claude/skills/` | Private dotfiles repo |

Keep `~/.claude` config in a private Git repo and link it into place on each computer:

```bash
mkdir -p ~/dotfiles/claude && cp ~/.claude/CLAUDE.md ~/.claude/settings.json ~/dotfiles/claude/
```

```bash
ln -sf ~/dotfiles/claude/CLAUDE.md ~/.claude/CLAUDE.md && ln -sf ~/dotfiles/claude/settings.json ~/.claude/settings.json
```

Commit `~/dotfiles` to a private GitHub repo. Never commit secrets (API keys, tokens, `.credentials.json`). Cloud sessions on claude.ai do not see `~/.claude` from your computer, so rules a repo must always follow belong in that repo's `AGENTS.md`/`CLAUDE.md`. For the claude.ai chat app, paste a short version of your preferences into Settings › Profile.

## Credits
- Fonts from Google Fonts, under the SIL Open Font License: [Fraunces](https://fonts.google.com/specimen/Fraunces), [Noto Sans Telugu](https://fonts.google.com/noto/specimen/Noto+Sans+Telugu) and [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P).
- World map outlines: [Natural Earth](https://www.naturalearthdata.com/) (public domain) via [world-atlas](https://github.com/topojson/world-atlas) (ISC), pre-rendered into `_includes/world-land-path.txt`.
- Icons, the quest map and the avatar were drawn for this site.

## Changelog
Site and docs history, newest first. PRs are in [GitHub](https://github.com/gurunathparasaram/gurunathparasaram.github.io/pulls?q=is%3Apr).
- **2026-11-02** · Docs reorganized into README, `docs/`, `AGENTS.md` and `CLAUDE.md`; cross-project preferences file added.
- **2026-11-02** · CV renamed Experience (`/experience/`); figures written in words; payment-integrity result credited to the program, with Gurunath leading its AI core (#6).
- **2026-11-02** · X feed: live timeline loads automatically, plus hand-picked posts (#5). X handle set to `guru__nath` (#4).
- **2026-11-02** · News fills from blog posts and manual items; one page list (`levels.yml`) drives both modes; Reading split into Fiction, Non-fiction and Technical articles (#3).
- **2026-11-02** · Shorter experience entries; Telugu panel removed from Home; RSS and sample post removed; city references removed; Travel lists US states (#2).
- **2026-11-01** · Redesign: new Jekyll site with plain and game modes, replacing the old theme fork and its leftover third-party content (#1).
