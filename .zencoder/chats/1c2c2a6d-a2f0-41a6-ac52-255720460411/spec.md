# Technical Specification: "See Hari in Action" Screenshot Layout Fix

## Difficulty: Easy

## Technical Context
- Static HTML/CSS landing page
- No build tools or frameworks — plain HTML + CSS
- File: `index.html` (lines 176–198), `styles.css` (lines 537–598, responsive at 1010–1013, 1071–1073)

## Problem
The 4 screenshots in the "See Hari in action" section are:
1. Centered in a narrow column
2. The two side-by-side screenshots (penguinSS, eagless1) are too small
3. The bottom eagle article screenshot (eagless2) is excessively tall showing the full article
4. Layout feels unnatural — stacked straight down the middle

## Implementation Approach
Redesign the `.screenshot-showcase` grid to a more natural, editorial bento-grid layout:

1. **Widen the container** from 1100px to ~1200px
2. **Use a 12-column grid** for flexible sizing
3. **Control image heights** with `object-fit: cover` and max-height on tall images
4. **Add slight visual variety** — stagger the two middle images with different sizes (e.g., 7-col and 5-col split instead of equal halves)
5. **Cap the tall eagle article image** height so it doesn't dominate the page

## Files Modified
- `styles.css` — update `.screenshot-showcase`, `.screenshot-frame`, `.screenshot-wide`, `.screenshot-img` styles and responsive rules

## Verification
- Visual inspection in browser
- Check responsive behavior at mobile breakpoints
