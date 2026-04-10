# Technical Specification: Update Hari Logo to SVG

## Difficulty: Easy

Straightforward asset swap across three HTML files with one CSS adjustment to handle color on dark backgrounds.

---

## Technical Context

- **Stack:** Static HTML/CSS/JS — no build system, no framework
- **Current logo:** `./assets/HariLogo (bigger) (1).png` (PNG, awkward filename with spaces)
- **New logo:** `C:\Users\david\Desktop\Hari\assets\HariLogoRoundHead.svg` (SVG, viewBox 1920×1080)
- **Logo usage locations:**
  - `index.html` — `<link rel="icon">`, `<meta og:image>`, `<img>` in nav
  - `privacy.html` — `<link rel="icon">`, `<img>` in nav
  - `terms.html` — `<link rel="icon">`, `<img>` in nav
- **CSS:** `.logo-icon` is 36×36px with `object-fit: contain` on the child `<img>`

## Key Constraint: Color on Dark Background

The new SVG has black paths (no `fill` attribute → defaults to black). The site header has a dark background (`rgba(10,10,10,0.95)` when scrolled, dark gradient overlay otherwise). The black logo will be invisible without a color fix.

**Approach:** Modify the copied SVG to use `fill: white` on the path, making it cleanly visible on dark backgrounds. This is simpler and more reliable than a CSS filter.

## favicon and og:image

- **`<link rel="icon">`:** SVG favicons are supported in all modern browsers (Chrome, Firefox, Safari 12+, Edge). Safe to swap to SVG.
- **`<meta og:image>`:** Social preview images require a fully-qualified URL to a raster image. The existing PNG will be **kept as-is** for `og:image` in `index.html` — only the nav `<img>` and favicon get the new SVG.

---

## Implementation Approach

### Files to Create
- `assets/HariLogoRoundHead.svg` — copied from `C:\Users\david\Desktop\Hari\assets\HariLogoRoundHead.svg`, with the path's fill changed to `white`

### Files to Modify
| File | Change |
|---|---|
| `index.html` | `<link rel="icon">` → SVG; nav `<img src>` → SVG |
| `privacy.html` | `<link rel="icon">` → SVG; nav `<img src>` → SVG |
| `terms.html` | `<link rel="icon">` → SVG; nav `<img src>` → SVG |

`styles.css` — no changes needed (fill is handled in the SVG itself)

### SVG Modification Detail
In the copied SVG, change:
```xml
<path class="st0" d="M873.44..."/>
```
to:
```xml
<path class="st0" d="M873.44..." fill="white"/>
```
(two `<path>` elements inside the `<g>` — both get `fill="white"`)

---

## Verification

1. Open `index.html` in browser — confirm logo appears white in the navbar
2. Scroll down — confirm logo remains visible on the darker scrolled header
3. Check favicon tab icon — confirm new SVG icon appears
4. Open `privacy.html` and `terms.html` — confirm logo appears correctly in both
