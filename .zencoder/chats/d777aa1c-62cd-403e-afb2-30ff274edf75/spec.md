# Technical Specification: Add Eagle Screenshots to Real Sites Section

## Difficulty: Easy

## Technical Context
- Static HTML/CSS website
- Images need to be copied to `assets/` folder
- Existing screenshot showcase uses `.screenshot-frame` with `.screenshot-img` and `.screenshot-caption`

## Implementation Approach
1. Copy `eagless1.png` and `eagless2.png` from Downloads to `assets/`
2. Add two new `screenshot-frame` divs inside `.screenshot-showcase` in `index.html`
3. Add `max-height` constraint to `.screenshot-img` so images are not too large and are easier to see
4. Use `object-fit: cover` or `contain` to keep images well-proportioned

## Files Modified
- `index.html` — add two new screenshot entries
- `styles.css` — add max-height to `.screenshot-img`

## Verification
- Visual inspection
