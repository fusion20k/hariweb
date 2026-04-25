# Website Redesign — Round 5: Hero Polish & Image Carousel

## Agent Instructions

Ask the user questions when anything is unclear or needs their input.
Do not make assumptions on important decisions — get clarification first.

---

## Context

The website is a landing page for "Hari" — a Chrome extension that teaches Tagalog while you browse. Located at `c:\Users\david\Desktop\HariWeb`. Static site: HTML + CSS + vanilla JS. Remote: `https://github.com/fusion20k/hariweb` branch `main`.

Key files: `index.html`, `styles.css`, `script.js`. Assets in `./assets/`.

The hero section uses a light off-white background (`#f0ede8`). The design follows an editorial magazine aesthetic inspired by a reference image showing a large stylized letter on the left, an animal dominating the viewport, and a counter (`← 02 →`) positioned ABOVE the animal image at the top-right.

Current hero background color: `#f0ede8`

## Current Issues

1. **Logo SVG is invisible**: The file `./assets/HariLogoRoundHead.svg` has `fill="white"` hardcoded on the path element. On the light background it's invisible. Must change to `fill="currentColor"` so it inherits CSS color (#1a1a1a).
2. **Eagle background mismatch**: The eagle PNG (`./assets/haribon-eagle.png`) background color doesn't match `#f0ede8`. Even with `mix-blend-mode: multiply` there's a visible box. Need to either regenerate the eagle with the exact background color OR make it truly seamless.
3. **Counter position**: The `← 01 →` counter is currently at `top: 2rem; right: 2.5rem` which puts it above/beside the eagle. In the reference image, the counter is positioned ABOVE the animal, slightly right of center. It should be inside the hero-stage area, above the eagle, matching the reference layout.
4. **Need 2 more haribon images**: AI-generate 2 additional Philippine Eagle images for the carousel. Save as `./assets/haribon-eagle-2.png` and `./assets/haribon-eagle-3.png`. These should have backgrounds matching `#f0ede8`.
5. **Carousel**: The counter should cycle through 3 eagle images (not just text captions). When clicking arrows or auto-cycling, the eagle image should crossfade/transition.
6. **"H" letter**: The halftone "H" letter should be on the left side of the hero, styled uniquely to match the editorial reference (large "S" with artistic texture in the reference image).

---

## Workflow Steps

### [x] Step 1: Fix Logo SVG + Eagle Background + Counter Position

1. **Fix SVG**: In `./assets/HariLogoRoundHead.svg`, change `fill="white"` to `fill="currentColor"` on the `<path>` element. This will make the logo inherit the CSS color (#1a1a1a = black).
2. **Fix eagle background**: Generate a NEW eagle image with background color EXACTLY `#f0ede8` (the hero bg). The eagle should be front-facing, majestic, photorealistic, head/upper body focused. Save to `./assets/haribon-eagle.png` (overwrite).
3. **Fix counter position**: In `styles.css`, the `.hero-counter` should be positioned above the eagle image area — roughly `top: 1.5rem` and horizontally centered-right (like the reference). Keep the same look but ensure it's clearly above the eagle, not hidden by it.
4. **Remove `mix-blend-mode: multiply`** from `.hero-eagle-img` since we'll have a matching background now. This was causing color shifts.

**Files:** `./assets/HariLogoRoundHead.svg`, `./assets/haribon-eagle.png`, `styles.css`

---

### [x] Step 2: Generate 2 Additional Eagle Images + Build Image Carousel

1. **Generate 2 more eagle images**: AI-generate 2 additional Philippine Eagle (Haribon) images. Each should:
   - Have background color EXACTLY `#f0ede8`
   - Show the eagle from slightly different angles/poses (e.g., side profile, looking slightly left)
   - Be photorealistic, majestic, head/upper body focused
   - Save to `./assets/haribon-eagle-2.png` and `./assets/haribon-eagle-3.png`

2. **Update HTML**: Modify the hero to support 3 images. Add all 3 `<img>` elements inside `.hero-eagle-wrap`, with the first visible and others hidden. Use a class like `.hero-eagle-img--active` to show the current one.

3. **Update JS**: Modify `initHeroCounter()` in `script.js` to:
   - Switch eagle images when the counter changes (crossfade transition)
   - Each slide has: image, counter number, caption text
   - Slides: `01` = main eagle, `02` = eagle-2, `03` = eagle-3
   - Smooth crossfade transition between images

4. **Update CSS**: Add styles for the image carousel — absolute positioning for images, opacity transitions for crossfade, `.hero-eagle-img--active` class.

**Files:** `index.html`, `script.js`, `styles.css`, `./assets/haribon-eagle-2.png`, `./assets/haribon-eagle-3.png`

---

### [ ] Step 3: Final QA + Git Push

1. Verify the logo is now visible and black in the header.
2. Verify all 3 eagle images display seamlessly (no background mismatch).
3. Verify the counter cycles through images correctly.
4. Verify the "H" letter is still present and styled well.
5. Verify all analytics, CTAs, and tracking are intact.
6. Git commit and push to `https://github.com/fusion20k/hariweb` on branch `main`.

**Files:** All
