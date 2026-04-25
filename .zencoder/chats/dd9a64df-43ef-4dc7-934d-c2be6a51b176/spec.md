# Technical Specification: HariWeb Redesign

## Difficulty Assessment: **HARD**

This is a significant visual and structural overhaul — not a cosmetic update. It involves:
- Complete hero section architectural redesign (new grid, new visual hierarchy)
- New animation system (entrance, scroll-trigger, tab transitions)
- Fixed bottom tab navigation replacing the current scroll-only model
- Eagle image integration with available (non-transparent) assets
- Conversion-focused restructuring (de-emphasizing pricing, foregrounding CTA)
- Responsive parity across mobile/desktop

---

## Technical Context

| Item | Detail |
|------|--------|
| Language | HTML5, CSS3, Vanilla JS (ES5+ IIFE) |
| Fonts | Inter (existing, Google Fonts) + possible Display serif for decorative letter |
| Build system | None — static files, direct edit |
| Analytics | Google GTM/GA4 + Reddit Pixel (must be preserved) |
| Hosting | GitHub Pages (via github.com/fusion20k/hariweb) |
| Key CSS approach | CSS custom properties already established in `:root` |
| Animation approach | CSS `@keyframes` + JS `IntersectionObserver` for scroll triggers |

### CSS Custom Properties (existing, preserve)
```
--bg: #0a0a0a
--teal: #1ABC9C
--teal-dark: #16a085
--text: #e5e7eb
--text-muted: #9ca3af
--ease-out: cubic-bezier(0.16, 1, 0.3, 1)
```

---

## Eagle Image Situation — ⚠️ OPEN QUESTION

Neither existing eagle asset is a clean transparent PNG:
- `assets/eagless1.png` — Screenshot of a Filipino travel article; eagle fills the top half with a forest background; Tagalog article title overlaid
- `assets/eagless2.png` — Screenshot of a Philippine Eagle article page; eagle face close-up in top half, Tagalog body text in bottom half

**Design implication:** The reference image works because the salamander is isolated on a neutral background. We cannot replicate that exact editorial "floating animal" look without a clean eagle PNG.

**Proposed fallback (no action needed from user to proceed):**
- Use `eagless2.png` with aggressive CSS `object-fit: cover` + `object-position: top center` cropped into a circular or shaped container, cutting out the text portion below. The green forest background becomes a dark atmospheric layer with CSS `mix-blend-mode: luminosity` + dark overlay.
- The large decorative "H" on the left and the eagle container on the right creates the editorial split regardless.

**Ideal path (if user can provide):**
A transparent PNG of the Haribon eagle (just the bird, no background) would let us replicate the reference image precisely — eagle floating in space on the dark canvas.

*The spec proceeds with the fallback. If the user provides a transparent PNG, swap `eagless2.png` for it and remove the overlay CSS.*

---

## Visual Design Spec

### Color Palette (unchanged)
- Background: `#0a0a0a` (near-black)
- Accent: `#1ABC9C` (teal) — used for the decorative "H", button, highlights
- Text: `#e5e7eb`
- Muted: `#9ca3af`

### Typography
- **Body/UI:** Inter (existing)
- **Decorative "H":** Use a CSS-rendered letterform with Inter Black (800) at ~30vw font size with teal fill and optional subtle halftone dot overlay (matching the reference's dotted S treatment — CSS `background-image: radial-gradient` mask on the letter)

### Hero Layout (reference-inspired editorial grid)

```
Desktop (≥1024px):
┌────────────────────────────────────────────┐
│  [logo icon] Hari          [Add to Chrome] │  ← fixed top nav (64px)
├──────────────┬─────────────────────────────┤
│              │                             │
│   H          │   [EAGLE PHOTO]    ← 01 →  │
│   (teal,     │   (centered,                │
│   20vw tall) │    full height)             │
│              │                             │
├──────────────┴─────────────────────────────┤
│ HARIBON EAGLE                [Add to       │
│ Pithecophaga jefferyi         Chrome →]   │
├────────────────────────────────────────────┤
│ LEARN  │  HOW IT WORKS  │  FAQ  │ PRICING  │  ← fixed bottom tab nav (56px)
└────────────────────────────────────────────┘
```

```
Mobile (<768px):
┌──────────────────────────┐
│ [logo]   Hari  [hamburger]│  ← 56px
├──────────────────────────┤
│       H                  │  ← decorative letter, top-left, smaller
│   [Eagle photo, tall]    │
│   HARIBON EAGLE          │
│   [Add to Chrome]        │
├──────────────────────────┤
│ LEARN │ HOW IT │ FAQ │ $ │  ← bottom tabs (icons + labels)
└──────────────────────────┘
```

### Bottom Tab Nav
Tabs: **Learn** / **How It Works** / **FAQ** / **Pricing**  
Behavior: Fixed at bottom of viewport (always visible). Clicking a tab smooth-scrolls the main content area to that section (not a full SPA panel swap — the scroll-based section flow is preserved, tabs are section anchors). Active tab highlights in teal.

### Scroll Sections (below hero)
Sections 2–8 remain in their scroll flow but get:
- Cleaner spacing (more whitespace)
- Entrance animations (slide-up + fade in via IntersectionObserver)
- Pricing section: visually de-emphasized — smaller cards, no "featured" badge prominence, free plan CTA is the largest button

---

## Source Code Changes

### `index.html`
**Structural changes:**
1. **`<header>`** — Simplify to: logo left, "Add to Chrome" CTA right, hamburger mobile. Remove the full nav link list from desktop view (links move to bottom tab nav).
2. **`<section.scene--hero>`** — Complete internal rebuild:
   - Remove: background image (`phillipinesphoto.jpg`), overlay div, existing hero-content/hero-headline/hero-subtext
   - Add: `.hero-grid` container with two columns
     - Left col: `.hero-letter` — the decorative "H"
     - Right col: `.hero-eagle-wrap` — eagle photo + counter `← 01 →`
   - Bottom bar: `.hero-bottom` — eagle name label (left) + CTA button (right)
3. **`<nav class="bottom-tab-nav">`** — New fixed bottom nav element (before `</body>`). Four tab links pointing to existing section IDs.
4. **Remaining sections** — Keep content, add `data-animate` attribute for JS-driven entrance animations.
5. **Pricing section** — Remove `plan-badge--loved` prominence styling (handled in CSS).

### `styles.css`
**New/rewritten blocks:**
- `:root` — Add `--hero-letter-size: clamp(8rem, 20vw, 18rem)` and tab nav height variables
- `.site-header` — Simplify to minimal 64px bar (logo + CTA only on desktop)
- `.nav-links` — Hidden on desktop (links now in bottom tab nav), preserved for mobile menu
- `.scene--hero` — Complete rewrite: CSS Grid layout, no background image, dark canvas
- `.hero-grid` — Two-column grid: `[letter] [eagle]`
- `.hero-letter` — Large teal "H", dot-pattern overlay, entrance animation
- `.hero-eagle-wrap` — Image container with crop mask, counter overlay
- `.hero-eagle-img` — `object-fit: cover; object-position: top center` to crop text
- `.hero-counter` — Pagination component (← 01 →) — decorative only (not interactive v1)
- `.hero-bottom` — Flex row: eagle taxonomy label + CTA
- `.bottom-tab-nav` — Fixed bottom bar, glassmorphism blur background, 4 tabs
- `.bottom-tab-nav a` — Tab links with active state (teal underline/color)
- Responsive breakpoints for hero grid → stacked on mobile
- `.scene` entrance animation class: `[data-animate]` hidden by default, `.is-visible` reveals
- Reduced motion: `@media (prefers-reduced-motion: reduce)` disables transitions

### `script.js`
**New functions:**
1. **`initHeroAnimation()`** — On page load, trigger staggered entrance of hero elements (letter → eagle → bottom bar) using CSS class toggles + `setTimeout`
2. **`initScrollAnimations()`** — `IntersectionObserver` watching all `[data-animate]` elements; adds `.is-visible` when they enter viewport (0.15 threshold)
3. **`initBottomTabNav()`** — Scroll listener that marks the active tab based on current scroll position (which section is in view)
4. **`initTabNavClick()`** — Smooth scroll to section on tab click (native `scrollIntoView({behavior: 'smooth'})`)
5. **`initEagleParallax()`** (optional, desktop only) — Subtle `transform: translateY()` on eagle as user scrolls, adds depth
6. Keep all existing: word-of-day, FAQ accordion, menu toggle, scroll header, tracking

---

## Data Model / API / Interface Changes

None. This is a pure frontend redesign. All analytics tracking attributes (`data-track-btn`) are preserved or added to new CTA instances.

---

## Conversion Focus Strategy

1. **Hero CTA** — "Add to Chrome — it's free" button in `hero-bottom` bar, teal filled, prominent. No pricing visible in hero.
2. **Top nav CTA** — "Add to Chrome" button in the header (replaces the nav link cluster on desktop).
3. **Section CTAs** — Kept in demo, words, and closing sections as now.
4. **Pricing** — Moved to last tab position. Free plan CTA is the biggest button; premium/PAYG are presented as "optional upgrades."
5. **Social proof** — If install count is known, the `← 01 →` counter can be replaced with "X learners" or similar.

---

## Animation Specification

### Hero Entrance (on page load)
```
t=0ms:   Page visible; all hero elements at opacity:0, translateY(30px)
t=100ms: .hero-letter transitions → opacity:1, translateY(0), duration 800ms, ease-out
t=350ms: .hero-eagle-wrap → opacity:1, translateY(0), duration 700ms, ease-out
t=500ms: .hero-counter → opacity:1, duration 500ms
t=650ms: .hero-bottom → opacity:1, translateY(0), duration 600ms, ease-out
```

### Scroll Section Reveal
- Elements with `[data-animate]` start hidden (`opacity: 0; transform: translateY(40px)`)
- `IntersectionObserver` adds `.is-visible` → CSS transition: `opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out)`
- Stagger children using `transition-delay: calc(var(--i, 0) * 80ms)`

### Tab Nav Active State
- JS scroll listener checks `getBoundingClientRect()` of each section; updates `.is-active` on matching tab
- CSS: `.is-active` tab gets `color: var(--teal); border-top: 2px solid var(--teal)`

### Button Hover (existing, preserve)
- `transform: translateY(-2px)` + `box-shadow` glow (already implemented)

---

## Verification Approach

No build step, no test suite. Verification is manual:

1. **Visual check** — Open `index.html` in Chrome; hero layout matches reference editorial design
2. **Animation check** — Refresh page; hero elements animate in correctly; scroll sections reveal on scroll
3. **CTA check** — Clicking "Add to Chrome" buttons navigates to `./go/chrome/` in new tab
4. **Tab nav check** — Scrolling to each section highlights the correct tab; clicking tabs scrolls to section
5. **Mobile check** — Chrome DevTools responsive mode at 375px, 768px; hero stacks correctly; bottom tabs readable
6. **Analytics check** — `data-track-btn` attributes present on all CTAs
7. **Privacy/Terms** — `privacy.html` and `terms.html` open correctly (no layout changes needed)
8. **Performance** — Lighthouse run; ensure no regressions from existing score

---

## Open Questions for User

1. **Eagle PNG**: Neither `eagless1.png` nor `eagless2.png` is a clean transparent PNG — both are screenshots of web articles. The design will use `eagless2.png` with CSS cropping as a fallback, but the editorial "floating eagle" effect from the reference requires a transparent or white-background eagle image. **Can you provide a clean Haribon eagle PNG (transparent background preferred)?**

2. **Counter content**: The reference shows `← 02 →` as a species counter. For Hari, should this counter show something real (e.g., "2,400 learners"  or a word-of-day counter), or should it be decorative/removed?

3. **Bottom tab labels**: Proposed tabs are `Learn | How It Works | FAQ | Pricing`. Any changes? (Could reduce to `Learn | FAQ | Install` for simpler nav.)

4. **Hero eagle label**: The reference shows the animal's scientific name below the photo (e.g., "SALAMANDRA INFRAMMACULATA"). Should the hero show "HARIBON EAGLE / Pithecophaga jefferyi" or Hari branding copy instead?
