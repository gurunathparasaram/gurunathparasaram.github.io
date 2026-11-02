# Decisions and to-dos

Why the site looks the way it does. Newest first within each section. Update this file when a decision changes.

## Contents
- [Content and wording](#content-and-wording)
- [Features](#features)
- [Design](#design)
- [Open to-dos for Gurunath](#open-to-dos-for-gurunath)
- [Changelog](#changelog)

## Content and wording
- **Experience, not CV.** The work-history page is "Experience" at `/experience/`; `/cv/` and `/resume/` redirect. The PDF is `assets/gurunath-parasaram.pdf`. No job-seeking language anywhere.
- **Credit for the payment-integrity result.** It came from a multi-team program. Gurunath led technical development of its AI core (agentic contract extraction) and worked with business and legal leads. Wording: "Led the AI core of a payment-integrity program that identified millions of dollars in overpayments." Never imply he alone found or saved the money. This matches his LinkedIn.
- **General figures, in words.** "millions of dollars", "tens of thousands of contracts", "thousands of service reps", "tens of thousands of requests per second". No exact amounts or counts, and no placeholders like `$xx M`.
- **Short experience.** 1-3 sentences per role plus a stack line; the PDF has the full résumé. The Tiger Analytics title is **Data Scientist**, matching the résumé on file.
- **Privacy.** No client names, internal product names, client-related US states, visa or work-authorization status, phone number, or home city. Job locations say "USA" or "India".
- **Voice.** Plain, factual, no inflated adjectives.
- **Data analysis** is a focus area and a skills row (EDA, statistical analysis, SQL, PySpark, pandas, NumPy, Matplotlib).
- **Removed:** the Llama-3-70B training project, the Telugu panel on Home (Telugu stays under Life), city references, the RSS feed, the sample blog post (its how-to moved to the docs), and career or education items in News.

## Features
- **News** = blog posts (automatic) + manual items in `_data/news.yml` (LinkedIn posts, talks). LinkedIn cannot be pulled automatically.
- **X feed** for `@guru__nath`: X's live timeline (often empty for logged-out visitors) plus hand-picked posts in `_data/x_posts.yml`, which always show. A paid X API integration was considered and not set up.
- **Reading** has three shelves: Fiction (Dan Brown; *The Secret of Secrets* in progress), Non-fiction (*Atomic Habits*), and Technical articles and blogs (Jay Alammar, colah's blog).
- **Travel** lists all 50 US states with a `visited` flag (Utah so far), plus optional places on a world map.
- **Plain and game modes stay in sync** through `_data/levels.yml`; game mode only changes navigation and styling.

## Design
- Redesigned in Nov 2026, replacing a Minimal Mistakes fork that still carried a previous owner's papers, CV files and travel list (all removed).
- Plain mode: warm paper palette, Fraunces headings, system body font. Game mode: meadow (light) or night-sky (dark) palette, Press Start 2P for labels, chunky borders, quest map, HUD, toast.
- Inspirations, not copied: text-first AI researcher sites; recruiter-friendly impact up front; game-style portfolios that keep a professional default and an easy exit.

## Open to-dos for Gurunath
- [ ] Replace the placeholder `assets/gurunath-parasaram.pdf` with the Overleaf export.
- [ ] Mark visited states in `_data/travel.yml`.
- [ ] Add posts to `_data/x_posts.yml`; check the live X timeline in a normal and a private browser window.
- [ ] Add LinkedIn posts or talks to `_data/news.yml` as they happen.
- [ ] Check the Telugu phrases and add notes in `_data/telugu.yml`.
- [ ] Confirm the Google Scholar link in `_data/profile.yml` is your profile, and that Matplotlib belongs in the skills.
- [ ] Click through a few Reading article links once to confirm they open.
- [ ] Decide what to do with `LICENSE` (still the old theme's MIT license).
- [ ] Optional: link the X profile from the Home buttons and footer.

## Changelog
- **2026-11-02** · First version, collected from the redesign and follow-up sessions (PRs #1-#6).
