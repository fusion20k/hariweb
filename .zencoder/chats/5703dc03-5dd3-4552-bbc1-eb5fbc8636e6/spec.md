# Technical Specification: Hari Landing Page Cinematic Redesign

## Difficulty: Hard

Complete redesign of a static landing page from a conventional stacked layout into a cinematic, scroll-driven, scene-based experience with continuity transitions, sticky sections, and premium motion choreography.

---

## Technical Context

- **Stack**: Static HTML / CSS / JS (no build tools, no frameworks)
- **Files to modify**: `index.html`, `styles.css`, `script.js`
- **Files to preserve unchanged**: `privacy.html`, `terms.html`, `go/chrome/index.html`
- **Font**: Inter (Google Fonts) — keep
- **Brand colors**: `--primary-teal: #1ABC9C`, `--primary-gold: #C9A961`, `--primary-navy: #2C3E50` — refine palette for cinematic feel while keeping teal as primary accent
- **Analytics**: GTM, Google Analytics (2 properties), Reddit Pixel — must preserve all tracking code exactly
- **Assets available**: `HariLogo (bigger) (1).png`, `phillipinesphoto.jpg`, `HariDemo.mp4`, `compareenglish.png`, `comparetagalog.png`, `feedexample.png`
- **External links to preserve**: Chrome Web Store (`./go/chrome/`), Discord (`https://discord.gg/7h3Z2Um3rB`), `support@haritagalog.com`, legal pages

---

## Implementation Approach

### Architecture: Scroll-Driven Scene System

Each major section becomes a **scene** — a tall sticky container that pins its content while scroll progress drives animations within it. Scenes transition into each other using shared visual elements (backgrounds, UI frames, text) that transform rather than disappear.

**Core scroll engine:**
- CSS `position: sticky` for pinning scene content during scroll
- JS `IntersectionObserver` to detect scene entry/exit
- JS `scroll` event (throttled via `requestAnimationFrame`) to calculate per-scene scroll progress (0→1)
- CSS custom properties (`--progress`) set via JS, consumed by CSS for all animations
- GPU-accelerated properties only: `transform`, `opacity`, `clip-path`
- `will-change` applied sparingly on actively animating elements
- `prefers-reduced-motion`: disable all scroll-linked motion, show static layout with simple crossfades

**No external libraries.** Everything is vanilla HTML/CSS/JS for performance and zero dependencies.

### Narrative Flow (Redesigned Section Order)

1. **Scene 1 — Hero**: Full-viewport cinematic intro. Philippines photo as immersive background with slow parallax. Bold headline types/reveals in. Subtext fades up. Single CTA. The hero image gradually scales and fades as user scrolls, morphing into...
2. **Scene 2 — Product Demo**: The demo video frame scales up from the hero's context. Sticky video plays while scroll progress reveals feature callouts around it. This shows the extension in action.
3. **Scene 3 — How It Works**: Horizontal step progression driven by scroll. Steps reveal one-by-one with a shared progress line connecting them. Each step slides/fades in as the user scrolls.
4. **Scene 4 — Immersion / Culture**: Split editorial layout. Left side: text about reconnecting with Tagalog and Filipino culture. Right side: before/after screenshots that crossfade or slide-reveal via clip-path as user scrolls. Asymmetric composition.
5. **Scene 5 — Who It's For**: Persona cards that stack/unstack with parallax depth. Each card enters from slightly different positions, creating layered depth.
6. **Scene 6 — Trust / Reassurance**: Minimal strip — reassurance pills animate in with staggered timing. Clean, confident.
7. **Scene 7 — Pricing**: Two cards with subtle entrance animation. Premium card has a gentle glow/highlight.
8. **Scene 8 — FAQ**: Accordion-style FAQ with smooth expand/collapse. Clean, no heavy animation needed here.
9. **Scene 9 — Community + Final CTA**: Discord section merges into final CTA as one closing moment. Background transitions to teal gradient. Strong closing copy.
10. **Footer**: Standard footer, clean.

### Visual Design Direction

- **Color palette**: Dark base (`#0a0a0a` to `#111`) with warm accents. Teal remains primary CTA color. Gold for premium/accent. Cream/off-white (`#f5f0eb`) for light text sections if used sparingly.
- **Typography**: Inter remains, but use more dramatic scale contrast. Hero: ~5rem+, body: ~1rem, with generous line-height.
- **Spacing**: Large padding (8-12rem vertical) between scenes. Generous whitespace.
- **Imagery**: Philippines photo as cinematic backdrop (hero). Demo video as focal product moment. Screenshots in editorial frames.
- **Composition**: Vary rhythm — full-bleed moments, contained editorial layouts, asymmetric splits. No two consecutive sections should have the same layout pattern.

### Header

- Transparent on hero, transitions to solid dark on scroll (via JS class toggle)
- Minimal: logo left, sparse nav right, CTA button
- Nav links: How It Works, Pricing, FAQ, Discord icon
- Mobile: hamburger menu

### Motion Principles

- **Enter**: Elements reveal via `clip-path: inset()` or `polygon()` wipes, opacity + translateY, or scale from 0.95→1
- **Continuity**: Background colors/gradients blend across scene boundaries. Shared elements (like the product frame) persist across scenes.
- **Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` (smooth decel) for reveals. `cubic-bezier(0.65, 0, 0.35, 1)` for transforms.
- **No**: bounce, flash, or abrupt teleporting. No fade-up-everything approach.

---

## Source Code Structure Changes

### `index.html`
- Complete rewrite of `<body>` content (preserving `<head>` analytics/meta)
- New scene-based section structure with data attributes for scroll engine
- Semantic HTML5 sections with `data-scene` identifiers
- Simplified, tightened copy throughout
- FAQ becomes interactive accordion

### `styles.css`
- Complete rewrite
- CSS custom properties for scroll progress (`--scene-progress`)
- Scene container system (sticky positioning, viewport heights)
- All animation states defined in CSS (driven by custom properties)
- `@media (prefers-reduced-motion: reduce)` overrides
- Mobile-first responsive with breakpoints at 768px and 480px
- Legal page styles preserved

### `script.js`
- Complete rewrite
- Scroll engine: calculates per-scene progress, sets CSS custom properties
- Scene observer: detects active scene for class toggling
- Header transparency controller
- Mobile nav toggle
- FAQ accordion
- Smooth scroll for nav links
- `prefers-reduced-motion` detection to disable scroll engine

---

## Data Model / API / Interface Changes

None — this is a static site with no backend. All links and tracking remain the same.

---

## Verification Approach

1. **Visual verification**: Open `index.html` in browser, scroll through entire page, verify:
   - All scenes transition smoothly
   - No layout jumps or broken elements
   - Animations feel premium, not jarring
   - All content is readable
2. **Responsive testing**: Check at 1440px, 1024px, 768px, 480px, 375px widths
3. **Reduced motion**: Enable `prefers-reduced-motion`, verify page is fully usable without animation
4. **Links**: Verify all CTAs go to `./go/chrome/`, Discord link works, legal page links work, email link works
5. **Analytics**: Verify GTM, GA, and Reddit Pixel code is present and unchanged in `<head>` and `<noscript>`
6. **Performance**: No layout thrashing in scroll handler (check with throttling). GPU-accelerated properties only.
7. **Cross-browser**: Standard modern browsers (Chrome, Firefox, Safari, Edge)
