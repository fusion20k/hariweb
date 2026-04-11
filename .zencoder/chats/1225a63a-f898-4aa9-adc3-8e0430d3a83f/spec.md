# Technical Specification

## Difficulty: Medium

---

## Technical Context

- **Language**: HTML5, vanilla CSS, vanilla JavaScript (ES5-compatible IIFE)
- **No build system** — static files served directly
- **Key files**: `index.html`, `styles.css`, `script.js`
- **Dependencies**: Google Fonts (Inter), no CSS frameworks, no JS libraries
- **Animation system**: IntersectionObserver in `script.js` adds `.is-active` to any `.scene[data-scene]` element when 15% is visible; new scenes get animations for free by using this pattern

---

## Task 1: Fix Word Card Text Misplacement

### Root Cause

`styles.css` line 1275:
```css
.word-sentence {
    ...
    margin-top: auto;   /* ← this is the culprit */
    ...
}
```

The `.word-card` is a **flex column** (`display: flex; flex-direction: column; gap: 0.75rem`). The `.word-sentence` element has `margin-top: auto`, which in a flex column absorbs all remaining vertical space above it, pushing the sentence block toward the bottom.

Because the three word cards sit in a **CSS grid** (`grid-template-columns: repeat(3, 1fr)`), all cards in a row stretch to equal height. Each card may have a different amount of content above `.word-sentence` (the Tagalog word, POS tag, pronunciation, meaning can vary in length). The `margin-top: auto` therefore produces a **different-sized gap** above the sentence in each card, making the sentence and usage text appear at inconsistent vertical positions across the three cards — visually "floating" to different heights.

Example: Card with a short meaning (e.g. "hungry") gets a large gap before the sentence; card with a long multi-line POS like "verb · adjective" gets a smaller gap.

### Fix

**File**: `styles.css`

Remove `margin-top: auto` from `.word-sentence`. Allow the flex column's `gap: 0.75rem` to handle spacing uniformly. This lets all card content stack naturally from the top with equal rhythm.

If bottom-anchoring of the usage note is desired, move `margin-top: auto` to `.word-usage` instead — that pushes only the note to the bottom while keeping sentence aligned near the meaning.

**Change summary**:
- Remove `margin-top: auto;` from `.word-sentence` (line 1275)
- Optionally add `margin-top: auto;` to `.word-usage` if bottom-anchoring the note is preferred

---

## Task 2: New Section — "Why not just change your PC language to Tagalog?"

### Purpose

Address a common objection/question users might have: "Can't I just switch my OS or browser language to Tagalog?" The section should explain concisely why Hari is fundamentally different and better for learning.

### Key Points (content)

1. **Context matters**: Switching your PC to Tagalog changes menus, settings, error messages — technical UI strings, not conversational Tagalog. No one learns a language from reading "File > Save As" in another language.
2. **No scaffolding**: OS language switch is all-or-nothing with zero explanation. You're lost instantly. Hari shows translations on hover so you always understand.
3. **Wrong vocabulary**: System UI uses formal/technical Tagalog. Hari teaches the words you'd actually hear at a family dinner or on Filipino social media.
4. **Gradual exposure**: Hari lets you control how much Tagalog appears. OS language change is a cliff-edge — everything changes at once.
5. **No disruption**: Hari doesn't break your workflow. Switching your PC language makes everyday tasks harder.

### Placement

Insert between `#scene-faq` (Scene 8) and `#scene-closing` (Scene 9) in `index.html`. Assign `data-scene="9"` (closing becomes `data-scene="10"`) — or use a non-conflicting number. *(Note: scene numbers are only used for `data-scene` attribute, not relied on for logic, so reuse of "9" for closing is fine — both are just observed.)*

### Visual Design

Follow the existing scene pattern. Use a layout similar to `scene--reassurance` (pill/feature list style) or a two-column comparison table (Hari vs. OS language switch). The comparison table approach is more persuasive and visually distinct.

**Proposed layout**: Side-by-side comparison with two columns:
- Left: "Just switching OS language" — each point with an ✕ icon
- Right: "Hari" — each point with a ✓ icon (teal)

This mirrors the visual language of `.reassurance-pills` (checkmarks, teal icons) already present.

Alternatively, a simpler single-column with a bold question heading and a few short points (similar to `scene--who` with persona cards). This is lighter to implement and matches the site's tone better.

**Recommended**: Single-column with a 2-col comparison grid (left = OS, right = Hari), using the existing `var(--teal)` for Hari column highlights and `var(--text-muted)` for the OS column.

---

## Source Code Changes

### `index.html`

1. Add new `<section>` between `#scene-faq` and `#scene-closing`:
   ```html
   <!-- Scene: Why not just switch OS language -->
   <section class="scene scene--vs-pc" data-scene="9" id="scene-vs-pc">
     <!-- comparison content -->
   </section>
   ```
2. The `data-scene` attribute value only needs to be present (any value) for the IntersectionObserver to pick it up.

### `styles.css`

1. **Line 1275**: Remove `margin-top: auto;` from `.word-sentence`
2. Add new CSS block for `.scene--vs-pc`, `.vs-pc-inner`, `.vs-comparison`, `.vs-col`, `.vs-col-header`, `.vs-row`, `.vs-icon` following the existing naming conventions and animation patterns (`.scene--vs-pc.is-active` triggers)
3. Add responsive overrides inside the existing `@media (max-width: 768px)` block

### `script.js`

No changes required. The IntersectionObserver already queries all `[data-scene]` elements dynamically.

---

## Data / API / Interface Changes

None. This is purely presentational HTML/CSS with no backend interaction.

---

## Verification Approach

1. **Visual inspection**: Open `index.html` in Chrome and scroll to "Words of the Day" — confirm all three cards have their sentence/usage text at the same vertical offset from the top of the card
2. **Cross-batch testing**: Temporarily modify `script.js` to hardcode different word indices (e.g. indices 0, 3, 6 which have varied POS lengths) to confirm cards no longer misalign under different data
3. **New section**: Scroll to the new section and confirm it animates in on scroll, compares OS vs Hari clearly, and looks consistent with the surrounding sections
4. **Mobile**: Resize to 375px and confirm the comparison layout collapses cleanly to single column
5. **Reduced motion**: Toggle `prefers-reduced-motion` in DevTools and confirm the new section elements are included in the opacity/transform overrides
