# Complete Website Redesign — Editorial Magazine Style

## Agent Instructions

Ask the user questions when anything is unclear or needs their input.
Do not make assumptions on important decisions — get clarification first.

---

## Reference Image Analysis

The reference shows an editorial/magazine-style layout with:
- **Light/off-white background** (not dark) — approximately #e8e5e0 warm gray
- **Large dark letter** ("S") top-left with subtle halftone dot-pattern texture — dark charcoal/black
- **Animal** (salamander) HUGE, centered, naturally sitting on the surface — dominates the viewport, bleeds across boundaries, NO container/box
- **Counter** ("← 02 →") small, positioned upper-right
- **Species name** bottom-left in large uppercase: "SALAMANDRA INFRAMMACULATA"
- **Bottom text nav tabs**: "ABOUT  HISTORY  LIFESTYLE" as simple inline text links
- **Page number** "014" bottom-left corner
- Very clean, minimal, editorial aesthetic

## Critical Issues to Fix

1. **Eagle image**: Current PNG has transparent background showing as checkered pattern. Need a NEW eagle image rendered on a solid light/off-white background matching the hero color. The eagle must be MUCH bigger — 2.5x the current size, dominating the viewport like the salamander in the reference.
2. **"H" letter**: Current dot pattern is too harsh. Needs to be more subtle — a delicate halftone, not bold grid dots. The letter should feel elegant, not pixelated.
3. **Below-hero sections**: ALL sections (demo, philosophy, how-it-works, pricing, FAQ, closing) need to be restyled to match the editorial/professional aesthetic. Remove the dark tech-startup look entirely.
4. **Conversion focus**: De-emphasize pricing. Push "Add to Chrome — it's free" everywhere. Don't show prices prominently.

---

## Workflow Steps

### [x] Step 1: Generate New Eagle Image

Generate a new Philippine Eagle (Haribon) image that:
- Has a SOLID light/off-white background (#e8e5e0 or similar warm gray) — NOT transparent
- Shows the eagle front-facing, majestic, perched and looking directly at the camera
- Is high quality, photorealistic
- The eagle should be centered and fill most of the frame
- Similar pose to the current eagle but on a solid matching background

Save to `./assets/haribon-eagle.png` (overwrite the existing one).

---

### [x] Step 2: Complete Hero + Full Site CSS/HTML Rewrite

This is the big step. Completely rewrite the hero AND all below-hero sections to match the editorial magazine aesthetic.

**Hero requirements:**
1. Light/off-white background (#e8e5e0) for the hero
2. "H" letter: dark charcoal, MUCH more subtle halftone pattern (tiny dots, high frequency, barely visible — like a print texture). The letter should be large but elegant.
3. Eagle: HUGE — should take up ~70-80% of the hero viewport height, centered, naturally grounded. Use `object-fit: contain` so it displays naturally on the matching background.
4. Counter "← 01 →" upper-right, subtle
5. Bottom bar: "LEARN TAGALOG" / "While You Browse" left, CTA right
6. Bottom text nav: "OUR PHILOSOPHY · HOW IT WORKS · DOWNLOAD · FAQ"
7. Header: dark text on light hero, switches to light text on scroll

**Below-hero section requirements — FULL REDESIGN:**
- Switch from dark (#0a0a0a) backgrounds to a clean light/white aesthetic
- Use off-white (#f8f7f5) or white backgrounds with subtle warm tones
- Dark text (#1a1a1a) for headings, muted gray (#666) for body text
- Cards: white with subtle shadows, no dark backgrounds
- Teal (#1ABC9C) as accent only — buttons, highlights, icons
- Remove all dark-mode radial gradients, dark card backgrounds, teal glows
- Clean typography, generous whitespace, editorial feel throughout
- Pricing section: de-emphasize — smaller, less prominent, free plan highlighted
- Demo section: clean light styling, no dark frame
- FAQ: clean accordion on light background
- Footer: can remain darker as a contrast anchor

**Files:** `index.html`, `styles.css`

---

### [ ] Step 3: Animations + Responsive + QA

1. Smooth staggered hero entrance animations
2. Eagle parallax on mouse move (desktop)
3. Counter cycling through 3 feature slides
4. Scroll-reveal animations for all sections
5. Full responsive polish (375px, 768px, 1024px, 1440px)
6. Smooth hero-to-content transition
7. Verify all analytics (GTM, GA4, Reddit Pixel), tracking attrs, CTA links
8. Git commit and push to https://github.com/fusion20k/hariweb

**Files:** `styles.css`, `script.js`, `index.html`
