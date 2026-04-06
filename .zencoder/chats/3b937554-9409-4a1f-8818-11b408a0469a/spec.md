# Technical Specification: Conversion Optimization

## Difficulty Assessment

**Medium.** Static HTML/CSS/JS site — no build tooling, no framework. Changes are content-heavy (copy rewrites, section reorder, new sections) plus moderate CSS additions. No architectural risk.

---

## Technical Context

- **Stack**: Vanilla HTML, CSS (custom properties + flexbox/grid), vanilla JS
- **Files modified**: `index.html`, `styles.css`, `script.js`
- **No new dependencies**
- **Assets available for reuse**:
  - `compareenglish.png` / `comparetagalog.png` — before/after pair
  - `exampleenglish.png` / `exampletagtalog.png` — second before/after pair
  - `feedexample.png` — Hari on a social/news feed
  - `penguinSS.png` — additional screenshot
  - `eagless2.png` — currently in use
  - `HariDemo.mp4` — currently in use (autoplay video)

---

## What We're Skipping (and Why)

| Feature | Reason skipped | When to add |
|---|---|---|
| Trust bar (ratings, reviews) | No real Chrome Web Store data yet | Add when ≥10 genuine reviews |
| User/install count | Too low to display without undermining credibility | Add when ≥500 installs |
| Testimonials section | No real quotes available | Add when 2–3 users submit feedback |

A comment placeholder will be left in `index.html` for each skipped section so they can be uncommented and filled in later.

---

## Implementation Approach

All changes follow existing codebase conventions:
- New sections use `padding: 6rem 2rem` + centered `max-width` container
- CSS variables (`--primary-teal`, `--primary-gold`, `--white`, etc.) used throughout
- Dark sections: `linear-gradient(160deg, #0f1d2b 0%, #162436 60%, #0d1a25 100%)`
- Light sections: `var(--light-bg)` + dot-pattern `background-image: radial-gradient(...)`
- New CSS classes appended to `styles.css` — no rewrites of existing rules
- JS changes limited to adding new elements to the existing `IntersectionObserver`

---

## Source Code Changes

### `index.html`

#### 1. Hero section — copy rewrite
- **`h1`**: `"Turn the sites you already browse into Tagalog practice"`
- **`p.hero-subheadline`**: Lead with differentiation — "No flashcards, no streaks, no study sessions. Hari quietly layers Tagalog into the sites you already read, with instant translations so you're never stuck."
- **CTA label**: `"Add to Chrome — it's free"` (all 4 CTA instances + sticky mobile button)
- **Reassurance line**: `"No credit card · Pause anytime · Uninstall in one click"`

#### 2. Skipped sections (placeholder comments)
After `.hero-demo`, insert three HTML comment blocks:
```html
<!-- FUTURE: Trust bar — add when Chrome Web Store rating ≥ 4.5 with real reviews -->
<!-- FUTURE: User count badge — add when installs exceed 500 -->
<!-- FUTURE: Testimonials section — add when 2–3 real user quotes are collected -->
```

#### 3. Before/after product demo (enhance `#in-action`)
Replace the single `eagless2.png` screenshot with a richer layout:
- **Row 1**: Side-by-side before/after using `compareenglish.png` + `comparetagalog.png` with "Before" / "After Hari" label overlays
- **Row 2**: Full-width `feedexample.png` showing Hari on a social feed, with caption
- Update section subtitle to match the new layout

#### 4. Reorder page sections
New order (current order shown for reference):

| # | Section | Change |
|---|---|---|
| 1 | Hero | Rewritten |
| 2 | Hero demo (video) | No change |
| 3 | *(placeholder comments)* | New |
| 4 | How It Works | Moved up (was after Who It's For) |
| 5 | Before/After demo `#in-action` | Enhanced, moved up |
| 6 | Who It's For `#who-its-for` | Moved down |
| 7 | Emotional reconnect | Moved here (was after Trial) |
| 8 | Objection reassurance strip | New |
| 9 | Trial explainer | Stays |
| 10 | Pricing `#pricing` | Strengthened copy |
| 11 | FAQ `#faq` | + 2 new items |
| 12 | Discord | No change |
| 13 | CTA | No change |

#### 5. Objection reassurance strip (new section before Trial)
Horizontal row of trust-signal pills before the trial/pricing block:
- "No credit card required"
- "You control how much Tagalog you see"
- "Works on your existing tabs"
- "Doesn't replace full pages"
- "Uninstall in one click"

#### 6. Pricing section — copy strengthening
- Add explicit value comparison line: "Less than a single tutoring session ($50–80/hr). Tagalog in your life every day."
- Keep $16.99/month only (no annual plan for now)
- Add a "What you get" sub-line before the features list to anchor the value

#### 7. FAQ — 2 new items
- **"Does Hari read or store what I browse?"** — Privacy reassurance; confirm data handling is local/minimal
- **"Which sites does Hari work on?"** — List categories: news, Wikipedia, blogs, social feeds, etc.

#### 8. Nav link addition
Add a `"See It"` anchor link in `.nav-links` pointing to `#in-action` so visitors can jump to the demo directly from the nav.

---

### `styles.css`

New classes to append (no existing rules modified):

- **`.before-after-grid`** — two-column CSS grid for the image comparison layout; stacks to single column on ≤768px
- **`.before-after-item`** — wrapper for each image + label
- **`.before-after-label`** — absolute-positioned pill overlay ("Before" / "After Hari")
- **`.feed-example-row`** — full-width second row in the demo section
- **`.reassurance-strip`** — centered flex row of pill badges, wraps on mobile
- **`.reassurance-pill`** — individual badge: border, rounded, small text, teal accent

---

### `script.js`

Add new elements to the existing `IntersectionObserver` selector:
```js
'.before-after-item, .reassurance-pill'
```
No other JS changes.

---

## Data / API / Interface Changes

None. Static marketing site.

---

## Verification Steps

1. Open `index.html` in Chrome and visually inspect each section at 1280px, 768px, and 375px
2. Confirm all 4+ CTA buttons read "Add to Chrome — it's free" and link to `./go/chrome/`
3. Confirm the sticky mobile CTA button also updated
4. Confirm before/after images load and labels are legible over the images
5. Confirm `feedexample.png` renders full-width with caption
6. Confirm all anchor nav links (`#who-its-for`, `#how-it-works`, `#in-action`, `#pricing`, `#faq`) still scroll to correct sections after reorder
7. Confirm reassurance strip wraps gracefully on mobile (no overflow)
8. Confirm video still autoplays and loops
9. Confirm no horizontal scrollbar on any viewport width
