---
title: How to write a post on this blog
description: The short version of how posts work here. Create a Markdown file in _posts, add a few lines of front matter, push.
tags: [meta, how-to]
---

This is a sample post. It explains how posts work on this site, so it doubles as a template. Delete it once you have real posts.

## 1. Create a file in `_posts/`

The file name sets the date and the web address:

```text
_posts/2026-11-15-evaluating-llm-agents.md
        └─ date ─┘ └──── slug ─────────┘
```

That post will live at `/blog/2026/11/15/evaluating-llm-agents/`.

## 2. Add front matter

Every post starts with a small YAML block between `---` lines:

```yaml
---
title: Evaluating LLM agents with golden datasets
description: One or two sentences for the blog list and link previews.
tags: [llm, evaluation]
---
```

Only `title` is required. The layout, the level in game mode, and the date are filled in for you.

## 3. Write in Markdown

Use normal Markdown: `##` headings, lists, links, **bold**, *italics*, tables and fenced code blocks.

```python
def review_time(before_min: float, after_sec: float) -> float:
    """Speed-up factor."""
    return before_min * 60 / after_sec
```

> Tip: keep posts short and specific. One idea per post is plenty.

Images go in `assets/img/blog/` and are linked like this:

```markdown
![Short description of the image](/assets/img/blog/diagram.png)
```

Always write the description. It is what screen readers announce.

## 4. Preview, then push

```bash
bundle exec jekyll serve
```

Open <http://localhost:4000/blog/>, check the post, then commit and push. GitHub Pages rebuilds the site in a minute or two.
