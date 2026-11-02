# Content guide

How to update each part of the site. Edit the file, commit, push to `main`; the site updates in about a minute.
Before writing anything public, read the content rules in [`AGENTS.md`](../AGENTS.md#content-rules-always-follow). They apply to humans too.

- [Home page](#home-page)
- [News](#news)
- [Blog posts](#blog-posts)
- [Experience page](#experience-page)
- [Résumé PDF](#résumé-pdf)
- [Reading](#reading)
- [Travel](#travel)
- [Telugu](#telugu)
- [X (Twitter) feed](#x-twitter-feed)
- [Pages and navigation](#pages-and-navigation)
- [Site settings](#site-settings)
- [Changelog](#changelog)

## Home page
`_data/profile.yml`:
- `summary`: the intro under your name (also used in link previews).
- `about`: the longer paragraph at the top of the Experience page.
- `stats`: the four number tiles. Keep figures general and in words.
- `focus`: the topic chips.
- `links`: LinkedIn, GitHub, Google Scholar buttons (also used in the footer and on Experience).
- `availability`: optional one-line note under the summary; leave `""` to hide it.
- `email_user` / `email_domain`: the email is assembled in the browser so it is not plain text in the page source.

The "Selected work" cards come from `highlights` in `_data/experience.yml`.

## News
The News box on the home page fills itself:
- **Blog posts** appear automatically, labelled "Blog".
- **Everything else** (LinkedIn posts, talks) goes in `_data/news.yml`:

```yaml
- date: 2026-12-03                       # YYYY-MM-DD, YYYY-MM or YYYY
  source: LinkedIn                       # optional label
  text: Wrote about evaluating LLM agents with golden datasets.
  link: https://www.linkedin.com/posts/...
  link_text: Read on LinkedIn            # optional, default "Read more"
```

Items are sorted newest first. No career or education updates here. LinkedIn has no public feed for personal posts, so LinkedIn posts are added by hand. While the list is empty the box says "No updates yet"; once it is taller than the box it scrolls slowly, pauses on hover or focus, and stays still for visitors who prefer reduced motion.

## Blog posts
1. Create `_posts/YYYY-MM-DD-short-title.md`, for example `_posts/2026-11-15-evaluating-llm-agents.md`.
2. Start it with front matter (only `title` is required):
   ```yaml
   ---
   title: Evaluating LLM agents with golden datasets
   description: One or two sentences for the blog list and link previews.
   tags: [llm, evaluation]
   ---
   ```
3. Write Markdown below it. Images go in `assets/img/blog/` and need alt text: `![What the image shows](/assets/img/blog/diagram.png)`.
4. Push. The post appears at `/blog/YYYY/MM/DD/short-title/`, on the Blog page, under "Latest writing" on Home, and in the News box. There is no RSS feed.

## Experience page
`_data/experience.yml`:
- `roles`: each has `company`, `role`, `location` (country only), `dates`, a 1-3 sentence `summary` (Markdown allowed) and a one-line `stack`.
- `skills`, `education`, `projects`.
- `highlights`: the three "Selected work" cards on Home.

Keep it short; the PDF carries the full résumé. The Tiger Analytics title stays **Data Scientist**.

## Résumé PDF
Export from Overleaf and save as **`assets/gurunath-parasaram.pdf`**, replacing the one-page placeholder. The "PDF" button on Home and "Download PDF" on Experience already point to it. Check that the PDF itself follows the content rules (no phone number, no client names) before publishing it.

## Reading
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

Book `status` is `reading`, `read` or `want`; optional `note` and `link`. Articles are grouped by source.

## Travel
`_data/travel.yml`:
- `states`: all 50 US states. Mark one as visited: `- { name: Colorado, visited: true, when: "2025", note: Road trip }`.
- `places`: optional cities or countries (`name`, `country`, `lat`, `lon`, `when`, `note`, optional `photo` + `photo_alt`). They show as cards with pins on a world map (`travel_map: true` in `_config.yml`).

## Telugu
`_data/telugu.yml`: `phrases` (each with `te` Telugu script, `rom` romanization, `en` English) and `notes` (`title`, `date`, Markdown `body`). Telugu text is marked `lang="te"` automatically.

## X (Twitter) feed
`twitter_handle` in `_config.yml` is `guru__nath` (no `@`). Life › Feed shows:
1. **Selected posts** from `_data/x_posts.yml`; these show for every visitor:
   ```yaml
   - url: https://x.com/guru__nath/status/1234567890123456789
     date: 2026-11-02
     text: Short copy of the post text.
   ```
2. **Latest posts**: X's official timeline embed, loaded automatically. X often shows it empty to visitors who are not signed in to X or who block its cookies; a link to the profile always shows.

Fully automatic posts for everyone would need the X API (pay-per-use since 2026, no free tier for new developers) and a scheduled GitHub Action with an API token stored as a repository secret. Not set up.

## Pages and navigation
`_data/levels.yml` is the single list of pages for **both** modes: `nav: true` puts a page in the top menu, `parent: life` puts it under Life, and the order is the game-mode level order. See [architecture.md](architecture.md#one-page-list-for-both-modes).

## Site settings
`_config.yml`: `twitter_handle`, `travel_map`, `default_mode` (`plain` or `game` for first-time visitors), `description` (used in link previews).

## Changelog
- **2026-11-02** · Created from the README's how-to sections; covers Experience, news from posts, three reading shelves, US states, X feed.
