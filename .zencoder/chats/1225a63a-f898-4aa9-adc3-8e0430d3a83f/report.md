# Implementation Report

## What Was Implemented

### Task 1: Fix Word Card Text Misplacement

Removed `margin-top: auto;` from the `.word-sentence` rule in `styles.css` (line 1275). This property was causing the sentence block to be pushed to different vertical positions across the three word cards because each card stretches to equal height in the CSS grid but had varying content amounts above `.word-sentence`. With `margin-top: auto` removed, the flex column's existing `gap: 0.75rem` handles spacing uniformly from the top, keeping all card content vertically consistent.

### Task 2: New Section — "Why not just change your PC language to Tagalog?"

Added a new `<section class="scene scene--vs-pc" data-scene="9" id="scene-vs-pc">` between `#scene-faq` and `#scene-closing` in `index.html`. The closing scene's `data-scene` was updated from `9` to `10`.

The section contains:
- A header with an eyebrow label, bold question heading, and brief intro text
- A two-column comparison grid contrasting "Just switching OS language" (✕ items in muted style) against "Hari" (✓ items in teal-accented style)
- Five comparison rows covering: vocabulary type, exposure control, word relevance, translation support, and workflow impact

Added corresponding CSS in `styles.css` covering:
- `.scene--vs-pc`, `.vs-pc-inner`, `.vs-pc-header`, `.vs-pc-eyebrow`, `.vs-pc-title`, `.vs-pc-intro` — layout and scroll-in animation for the header block
- `.vs-comparison`, `.vs-col`, `.vs-col--os`, `.vs-col--hari`, `.vs-col-header`, `.vs-col-label`, `.vs-rows`, `.vs-row`, `.vs-icon`, `.vs-icon--no`, `.vs-icon--yes` — two-column comparison grid styling following existing design tokens (`var(--teal)`, `var(--bg-3)`, `var(--text-muted)`, etc.)
- Responsive override inside `@media (max-width: 768px)`: collapses `.vs-comparison` to `grid-template-columns: 1fr`
- `prefers-reduced-motion` override: `.vs-pc-header` and `.vs-comparison` added to the opacity/transform reset list

The IntersectionObserver in `script.js` required no changes — it already queries all `[data-scene]` elements dynamically, so the new section animates in automatically on scroll.

## How the Solution Was Tested

Verified by visual inspection of `index.html` in a browser:
1. Scrolled to "Words of the Day" — all three word cards now have their sentence/usage text starting at a consistent vertical offset from the card top
2. Scrolled to the new section between FAQ and the closing CTA — confirmed scroll-in animation activates, two-column layout renders correctly with teal Hari column and muted OS column
3. Resized to 375px — comparison grid collapses to a single column cleanly
4. Toggled `prefers-reduced-motion` in DevTools — new section elements appear immediately without animation

## Challenges Encountered

No significant challenges. The codebase's consistent naming conventions and the IntersectionObserver pattern made adding a new animated scene straightforward. The main care taken was matching the existing CSS design token usage (`var(--bg-3)`, `var(--teal)`, `var(--ease-out)`) and following the same opacity/transform animation pattern used by every other scene.
