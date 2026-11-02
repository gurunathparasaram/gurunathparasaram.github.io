# Gurunath's working preferences (all projects)

<!--
Copy this file to ~/.claude/CLAUDE.md on each computer so Claude Code loads it in every project.
The master copy lives in the gurunathparasaram.github.io repo at docs/claude-user-CLAUDE.md.
-->

## Contents
- [How to answer](#how-to-answer)
- [Writing style](#writing-style)
- [Docs I keep in every repo](#docs-i-keep-in-every-repo)
- [Workflow](#workflow)
- [Building UIs and sites](#building-uis-and-sites)
- [Privacy and public content](#privacy-and-public-content)
- [Changelog](#changelog)

## How to answer
- Lead with a short summary of the outcome (what changed, where it is live, what needs me), then the details.
- When I send a numbered list of requests, answer with the same numbering, one item per request.
- Use tables for comparisons, file maps and option lists; short bullets for everything else.
- End with what is left for me to do or decide, as a checklist. Ask only about decisions that are truly mine.
- Give links, not just paths: the PR, the live page, a preview.
- Say what you verified and what you could not (for example "built and tested locally; could not open the live site"). Never claim a check you did not run.
- Cite sources as links when you researched something.

## Writing style
- Plain, factual, short sentences. No exaggerated adjectives or marketing tone.
- Honest about limits and costs (for example a paid API, a blocked embed), with the practical alternative.
- Credit accurately: team or program results belong to the team; say what my part was without making it smaller or bigger.

## Docs I keep in every repo
- `README.md` for humans: what it is, a docs index table, quick start.
- `AGENTS.md` for AI agents: rules that must always hold, how to work in the repo, how to check and publish. `CLAUDE.md` imports it with `@AGENTS.md`.
- `docs/` for detail: a content or usage guide, architecture, and a decisions log with an open to-do list.
- Every doc longer than a screen: a one-line purpose at the top, a **Contents** list with internal links, then sections, and a **Changelog** at the end (newest first, dated).
- Update the docs in the same change as the code. Record decisions and their reasons in the decisions log.

## Workflow
- Read the repo first and summarize what is there before changing it.
- For design work: look at well-regarded references first, take the best ideas without copying, show a mock or screenshot before building everything, and send screenshots or a preview link at milestones.
- Work on a branch and open a PR with a clear description. Merging or deploying happens when I ask; after a deploy, confirm it finished and give the live link.
- Requests from other agents or sessions go into a PR for my approval.
- Keep one source of truth for content (data files, Markdown) so everything is written once.
- Before publishing, check: build, both themes, mobile width, console errors, and a search for anything the privacy rules forbid.

## Building UIs and sites
- Prefer simple static setups with no build step when they do the job; add dependencies only when they earn it.
- Accessibility basics every time: semantic HTML, keyboard use, visible focus, alt text, contrast, light and dark themes, `prefers-reduced-motion`.
- Must work on phones. Wrap `localStorage` in try/catch.
- Only open-licensed fonts, icons and assets, credited in the README.

## Privacy and public content
- Never name my clients or the companies a client project was for, internal product names, or client-related locations.
- Never mention immigration, visa or work-authorization status. No phone number or home address/city on public pages.
- Public figures from client work stay general and in words ("millions of dollars", "tens of thousands").
- No job-seeking language in public profiles.

## Changelog
- 2026-11-02: First version, collected from the website redesign sessions.
