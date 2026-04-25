# Technical Specification

## Difficulty: Medium

Three separate UI fixes that collectively require image generation, SVG editing, and hero layout restructuring. The GROW-style effect is the most complex piece.

---

## Technical Context

- **Stack**: Vanilla HTML/CSS/JS — no build toolchain, no framework
- **Hero section**: `index.html` lines 98–130; styled in `styles.css` (~319–514, 1189–1400)
- **Favicon**: `assets/favicon.svg` — inline SVG, loaded via `<link rel="icon">` in `index.html` line 45
- **Eagle assets**: All existing PNGs (`haribon-eagle.png`, `haribon-eagle-2.png`, etc.) have solid cream/beige backgrounds — **none are transparent**
- **Hero bg color**: `--bg: #f8f7f5` (warm off-white)
- **Eagle image used**: `assets/haribon-eagle.png` (front-facing, portrait aspect ratio, cream bg)

---

## Issue 1 — Hero Eagle Image Cut-Off

### Root Cause
`.hero-stage` has `overflow: hidden`. `.hero-eagle-wrap` is anchored `bottom: 0` with `height: 95%`. With `object-position: center center`, the image is vertically centered inside the wrap. On short viewports, the vertical centering combined with the wrap's height budget causes the bird's crest/head to hit the top boundary and get clipped.

### Fix
Two-part:
1. Change `object-position: center center` → `object-position: top center` on `.hero-eagle-img` so the head is always anchored at the top of the container rather than centered
2. The GROW restructure (Issue 3 below) will fully replace this layout anyway, so this CSS fix only matters if Issue 3 is not implemented simultaneously

### Files Changed
- `styles.css` (`.hero-eagle-img` rule, line ~358)

---

## Issue 2 — Favicon Invisible on Dark Browser Tabs

### Root Cause
`assets/favicon.svg` has a dark circle `fill="#1a1a1a"` as background. On dark browser tabs (Chromium, Firefox dark theme), this blends into the tab — only the white path is technically present but the overall impression is invisible/dark.

### Fix
Invert the favicon: **white circle + dark logo path**, so it has strong contrast on dark tabs (white circle visible) and remains legible on light tabs too.

Change:
```svg
<circle cx="256" cy="256" r="256" fill="#1a1a1a"/>
...
<path fill-rule="evenodd" fill="#ffffff" d="..."/>
```
To:
```svg
<circle cx="256" cy="256" r="256" fill="#ffffff"/>
...
<path fill-rule="evenodd" fill="#1a1a1a" d="..."/>
```

### Files Changed
- `assets/favicon.svg`

---

## Issue 3 — GROW-Style "HARI" Hero (replaces the big "H")

### Design Goal
Inspired by the "GROW" reference: large bold letters ("HARI") as the visual centerpiece, with the haribon eagle image layered so the eagle "peeks through/behind" the letters — head emerging above the text block, body visible behind/between the letters.

### Key Constraint
All existing eagle images have solid cream/beige backgrounds. For proper layering (so the eagle appears in front of some letter elements), a **transparent-background version** is required. This will be AI-generated using the `generate_image` tool, using the existing `haribon-eagle.png` as a reference.

### Implementation Approach

#### New Asset
Generate `assets/haribon-eagle-nobg.png`: front-facing haribon eagle, same majestic posture as `haribon-eagle.png`, transparent background.

#### HTML Change
Replace `.hero-letter` (single "H" div) with a `.hero-letters` container holding four `<span>` elements:

```html
<div class="hero-stage">
    <div class="hero-letters" aria-hidden="true">
        <span>H</span><span>A</span><span>R</span><span>I</span>
    </div>
    <div class="hero-eagle-wrap">
        <img src="./assets/haribon-eagle-nobg.png" ...>
    </div>
</div>
```

#### CSS / Layering Strategy
- `.hero-letters`: positioned same as current `.hero-letter`, but renders all 4 letters in a row — letters use the existing dotted `background-clip: text` style, z-index: 1
- `.hero-eagle-wrap`: z-index: 2 (above letters) so the eagle physically overlaps the letter block
- The eagle image (transparent bg) is centered in the stage and sized so the bird's **head/crest extends above** the top edge of the letter baseline, while the body occupies the same vertical zone as the letters
- This creates the "peek through" illusion: letters frame the eagle's body, eagle's head emerges above

#### Letter Style
- **Solid bold white** — matching the GROW reference exactly. Letters are filled `#ffffff`, no dotted/stipple effect.
- Font: inherit existing hero font (black/900 weight), `color: #ffffff`
- Remove the `background-image` / `background-clip: text` dotted trick; replace with a plain `color: #fff` fill
- A subtle `text-shadow` or slight opacity may be added to keep letters from looking flat against the white page bg at the edges

#### Letter Sizing
- Current "H" is `font-size: clamp(18rem, 75vh, 55rem)` — for 4 letters "HARI" we need to reduce to approximately `clamp(8rem, 20vw, 20rem)` so all 4 fit in one row without overflowing
- Letter spacing tight (e.g. `letter-spacing: -0.04em`) to pack the word together like the GROW reference
- Layout: single row, horizontally centered in the stage

#### Eagle Sizing
- Eagle wrap keeps `bottom: 0; left: 50%; transform: translateX(-50%)` anchor
- Height increased to `100%` (from 95%) so the eagle's head can reach above the stage top edge — but eagle image naturally clips at top, which is fine (head just emerges into the stage)
- `object-position` changed to `bottom center` so the eagle's body (not feet) anchors at bottom

### Responsive Behavior
- All existing responsive breakpoints (1024px, 768px, 480px, 375px) get updated letter `font-size` values for "HARI" 4-letter layout
- On mobile, eagle sizing unchanged, letters stack or reduce further

---

## Files to Create or Modify

| File | Action | What Changes |
|------|--------|--------------|
| `assets/haribon-eagle-nobg.png` | **CREATE** (AI gen) | Transparent-bg front-facing haribon eagle |
| `assets/favicon.svg` | **MODIFY** | Invert circle/path fill colors (dark bg → white bg) |
| `index.html` | **MODIFY** | Replace `<div class="hero-letter">H</div>` with `.hero-letters` containing 4 spans |
| `styles.css` | **MODIFY** | Update `.hero-letter` → `.hero-letters` + child spans; fix image clipping; update all responsive breakpoints |

---

## Verification

1. Open `index.html` in Chrome; confirm:
   - Favicon tab shows white circle with dark icon (visible on dark tabs)
   - Hero section shows "HARI" letters with the eagle peeking through
   - Eagle head not cut off — full crest visible
   - Layout correct at: desktop 1440px, laptop 1024px, tablet 768px, mobile 375px (use DevTools device emulation)
2. No console errors
3. No linting/build steps required (vanilla project)
