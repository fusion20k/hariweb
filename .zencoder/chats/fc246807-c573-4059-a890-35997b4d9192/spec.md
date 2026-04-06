# Technical Specification: Landing Page Rewrite

## Difficulty: Medium
Restructuring an existing single-page website with new copy, sections, and layout while preserving existing assets and design system.

## Technical Context
- **Stack**: Static HTML/CSS/JS site (no framework)
- **Fonts**: Inter via Google Fonts
- **Design system**: CSS custom properties (dark theme with teal/gold accents)
- **Assets**: HariDemo.mp4 video, screenshot PNGs, logo, Philippines photo background
- **Hosting**: GitHub Pages (push to https://github.com/fusion20k/hariweb)

## Implementation Approach

### Section Mapping (Old → New)

| New Section | Source |
|---|---|
| 1. Hero | Rewrite hero copy. CTA: "Start free 10k-character trial". No credit card required. |
| 2. Video demo | Keep existing `hero-demo` section with HariDemo.mp4 right below hero |
| 3. Who it's for | New section replacing old "Who Hari is for". Paragraph + 3 bullets. |
| 4. How Hari works | 4-step process replacing old 3-step "Get started". |
| 5. Free trial details | New section with explainer box about 10k character trial |
| 6. Emotional "why" | New section "Reconnect with Tagalog without burning out" |
| 7. What you'll actually see | Reuse existing screenshot section (compareenglish/comparetagalog PNGs) |
| 8. Pricing | Simplified: just $20/month card with features list |
| 9. FAQ | Rewritten with 5 new questions |
| 10. Final CTA | New closing CTA |
| 11. Footer | Keep existing footer, update links |

### Sections Removed
- Testimonials section (not in new copy)
- Discord section (not in new copy)
- "You control how much Tagalog you see" standalone section (absorbed into step 4)
- Old example section with before/after (replaced by "What you'll actually see")
- Comparison table (simplified pricing)

### Key Decisions
- Video placement: Right after hero (natural demo position)
- Trial messaging: Changed from "30-day trial" to "10k-character trial, no credit card"
- CTA links: Keep Chrome Web Store URL
- Nav: Update anchors to match new section IDs
- Sticky mobile CTA: Update text to match new messaging

## Source Code Changes

### Files Modified
1. `index.html` - Full page content rewrite
2. `styles.css` - New section styles, remove unused styles
3. `script.js` - Update selectors for new section structure

## Verification
- Open index.html in browser and verify all sections render
- Check responsive behavior at 768px and 480px breakpoints
- Verify all links work (Chrome Web Store, privacy, terms)
- Verify video plays correctly
