# Implementation Report

## What was implemented

### 1. Demo Section (Scene 2)
- Swapped video source from `./assets/HariDemo.mp4` to `./assets/HariVidDemo.mp4`.
- Rewrote the three callouts with stronger, outcome-focused copy:
  - "Learn without lifting a finger"
  - "Never feel stuck"
  - "Progress at your pace"
- Added a trust line beneath the demo frame: "Works on Reddit, Wikipedia, news, and social feeds" (`.demo-trust`).
- Added a prominent CTA below the callouts/video layout: "Add to Chrome — it's free" with sub-note "Free forever · No credit card · Uninstall anytime" (`.demo-cta`, `.demo-cta-note`). Includes a fade-in transition hooked to `.scene--demo.is-active`.

### 2. Drag-to-Compare Slider (Scene 4 — Culture)
- Removed the entire before/after tabs UI (`.comparison-toggle-wrap`, `.comparison-tabs`, `.comparison-tab`, `.comparison-panel`, `.comparison-display`) and the secondary social-feed preview mockup (`.feed-preview`, `.feed-caption`) from `index.html`.
- Replaced them with a single drag-to-compare slider using the Pointer Events API:
  - Before image: `./assets/beforehari.png` (base layer)
  - After image: `./assets/withhari.png` (clipped via `clip-path: inset(0 0 0 X%)`)
  - Vertical white divider line
  - Circular teal-shadow handle with dual arrow SVG
  - Labels "Without Hari" (left) and "With Hari" (right, teal background)
  - Starts at 50%
- Added a section intro above the slider: eyebrow "Drag to compare", h3 "See the same page with and without Hari", descriptive paragraph.
- JS (`initCompareSlider` IIFE in `script.js`):
  - Uses `pointerdown`/`pointermove`/`pointerup`/`pointercancel`/`pointerleave` so the same handler works for mouse, touch, and pen.
  - Uses `setPointerCapture` for smooth dragging outside the element.
  - Keyboard accessible: Arrow keys (step 2%, Shift+Arrow = 10%), Home/End.
  - Sets `role="slider"` and `aria-valuenow` on the handle.
- Removed the obsolete `querySelectorAll('.comparison-tabs')` tab handler block from `script.js`.
- Removed all related CSS blocks. Updated the `@media` responsive override (was `.comparison-toggle-wrap`) and the `prefers-reduced-motion` block (was `.culture-comparison-wrap, .feed-preview`) to reference `.compare-slider` / `.compare-heading`.

### 3. Philosophy Section (replaces Who It's For)
- Renamed section id from `scene-who` to `scene-philosophy` and class to `scene--philosophy`.
- New heading "Immersion is how you actually learn a language" with eyebrow "The Hari Method" and intro paragraph grounded in comprehensible-input research.
- Three cards (reusing existing `.persona-card` / `.persona-icon` styles for visual consistency) with SVG icons and new titles:
  1. **Comprehensible Input**
  2. **Effortless Repetition**
  3. **Zero Disruption**
- Added new `.persona-title` style and `.philosophy-eyebrow` style.
- Extended `.scene--who` selectors in CSS to also match `.scene--philosophy` (animation entry, hover effect, section layout).
- Updated footer Quick Links: `#scene-who` → `#scene-philosophy`, text "Who It's For" → "The Hari Method". (The nav never linked to scene-who, so no change needed there.)

## How it was tested
- Visual/structural review of the edited HTML and CSS.
- Verified all required asset filenames exist in `./assets/` (`HariVidDemo.mp4`, `beforehari.png`, `withhari.png`).
- Confirmed there are no remaining references to the removed classes (`comparison-tab*`, `culture-comparison-wrap`, `feed-preview`, `HariDemo.mp4`, `scene-who`) in runtime files (`index.html`, `styles.css`, `script.js`, `tracking.js`). Remaining mentions exist only in the `.zencoder` spec/plan docs.
- Slider logic reviewed: pointer capture, bounds clamping (0–100%), keyboard controls, and starts at 50%.

## Challenges
- The original demo-frame was constrained by an `aspect-ratio: 16/10` and `object-fit: cover`, so the new video needed no extra CSS — the trust line was placed just below the frame inside `.demo-frame-wrap` to keep it visually tied to the video.
- Reused the existing `.persona-card` grid/animation system for the new philosophy cards instead of introducing a parallel stylesheet, which required teaching several `scene--who` selectors to also match `scene--philosophy`.
- The drag-to-compare slider needed to clamp to the slider's bounding rect regardless of where the pointer moves, so `setPointerCapture` on the slider element (not the handle) was used so users can drag anywhere across the slider width smoothly.
