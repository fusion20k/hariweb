# Implementation Report — Daily Tagalog Words Section

## What Was Implemented

### index.html
- Inserted a new `<section class="scene scene--words" data-scene="7" id="scene-words">` between the `scene--reassurance` section (Scene 6) and the `scene--pricing` section (now renumbered to `data-scene="8"`).
- The section contains: a `.words-header` block (eyebrow label, section title, intro copy), an empty `#word-cards` container (populated at runtime by JS), and a `.words-cta` block with a CTA button linking to `./go/chrome/`.

### styles.css
- Added ~185 lines of CSS for the new section after the `.reassurance-icon` block.
- Key classes: `.scene--words`, `.words-inner`, `.words-header`, `.words-eyebrow`, `.words-intro`, `.word-cards`, `.word-card`, `.word-card-header`, `.word-tagalog`, `.word-pos`, `.word-pronunciation`, `.word-meaning`, `.word-sentence`, `.word-highlight`, `.word-usage`, `.words-cta`, `.words-cta-text`.
- Entry animations follow the same pattern as all other scenes: elements start `opacity: 0; transform: translateY(...)` and transition to visible when `.scene--words.is-active` is toggled by the IntersectionObserver.
- Staggered `transition-delay` on word cards: 0.1s, 0.25s, 0.4s.
- Card hover effect: `translateY(-5px)` with teal border glow and drop shadow.
- Mobile breakpoint at `max-width: 768px`: grid collapses to `1fr` (single column, max-width 480px).
- Added `.words-header`, `.word-card`, `.words-cta` to the `@media (prefers-reduced-motion: reduce)` block.

### script.js
- Added `TAGALOG_WORDS` — a 30-entry array (10 batches of 3), each entry containing `word`, `pronunciation`, `pos`, `meaning`, `sentence` (with `<span class="word-highlight">` wrapping the Tagalog word), and `usage`.
- Added `getTodaysWordIndices()` — computes the current date in America/New_York timezone, rolls back one day if before 6am EST, calculates days since the Jan 1 2025 epoch, and returns the starting indices for today's batch of 3 words.
- Added `initWordCards()` — creates and appends three `<article class="word-card">` elements into `#word-cards`, calling `getTodaysWordIndices()` to select which words to display.
- `initWordCards()` is called at the top of the IIFE, before the IntersectionObserver setup, so cards exist in the DOM when the observer first fires.

## How It Was Tested

- Verified the HTML section appears correctly positioned between scene--reassurance and scene--pricing by reading the modified `index.html`.
- Verified the CSS block was inserted at the correct location in `styles.css` and that the reduced-motion media query was updated.
- Verified the JS functions and word data were inserted before `prefersReducedMotion` in the IIFE, ensuring `initWordCards()` runs on page load.
- The rotation algorithm was confirmed correct: with a 30-word pool and batches of 3, 10 distinct daily batches cycle continuously from the Jan 1 2025 epoch, resetting at 6am EST each day.
- Unicode escape sequences (`\u003c`, `\u003e`) are used in sentence strings for the HTML span tags — these are valid JS string escapes and resolve to `<` / `>` at runtime, rendering correctly via `innerHTML`.

## Challenges

- **Unicode escapes in innerHTML strings**: The `sentence` field in each word object contains a `<span class="word-highlight">` tag. To avoid issues with quote escaping inside the string values, the angle brackets were represented as `\u003c` / `\u003e` — valid JS unicode escapes that the engine correctly resolves at runtime.
- **Hover state conflict with entry animation**: The `.word-card:hover` rule applies `transform: translateY(-5px)`, which could conflict with the entry animation's `transform: translateY(28px)` on non-active scenes. This is resolved naturally because hover only applies when the user's mouse is over the card, which can't happen before the card is visible.
- **data-scene numbering**: The existing pricing section was `data-scene="7"`. The new words section was assigned `data-scene="7"` and pricing updated to `data-scene="8"`. The JS never reads the numeric value of `data-scene` — it only uses the attribute as a selector — so no JS changes were needed.
