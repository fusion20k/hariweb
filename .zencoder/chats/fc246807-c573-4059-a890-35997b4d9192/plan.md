# Spec and build

## Agent Instructions

Ask the user questions when anything is unclear or needs their input. This includes:

- Ambiguous or incomplete requirements
- Technical decisions that affect architecture or user experience
- Trade-offs that require business context

Do not make assumptions on important decisions — get clarification first.

---

## Workflow Steps

### [x] Step: Technical Specification

Spec saved to `spec.md`. Difficulty: Medium. Restructuring single-page site with new copy, sections, layout. Keeping existing assets (video, screenshots, logo) and design system (dark theme, teal/gold accents).

---

### [x] Step 1: Rewrite index.html

Rewrite the full page body with the new section structure:
1. Hero (new copy, 10k-character trial CTA, no credit card)
2. Video demo (keep HariDemo.mp4)
3. Who it's for (paragraph + 3 bullets)
4. How Hari works (4 steps)
5. Free trial details (explainer box)
6. Emotional "why" section
7. What you'll actually see (screenshots + captions)
8. Pricing ($20/month)
9. FAQ (5 new questions)
10. Final CTA
11. Footer (keep existing, update links)

Remove: Testimonials, Discord section, old "features" cards, comparison table.
Keep: Nav bar, footer, sticky mobile CTA (update text).

---

### [x] Step 2: Update styles.css

- Add styles for new sections (trial-details, emotional-why, etc.)
- Clean up unused styles from removed sections
- Ensure responsive behavior at 768px and 480px

---

### [x] Step 3: Update script.js

- Update selectors for new section IDs/classes
- Ensure smooth scroll and animations work with new structure

---

### [x] Step 4: Verify

- Open in browser and check all sections render
- Check responsive at 768px/480px
- Verify links (Chrome Web Store, privacy, terms)
- Verify video plays

---

### [x] Step 5: Commit and push

- Commit all changes
- Push to https://github.com/fusion20k/hariweb

---

### [x] Step 6: Write report

Write completion report to `report.md`.

---

### [x] Step 7: Polish pass

1. Add Discord link back to nav + Discord section before final CTA
2. Change all "Start free 10k-character trial" CTA text to "Start for free"
3. Fix video demo section centering and polish

---

### [x] Step 8: Commit and push polish changes

---

### [x] Step 9: Discord icon polish

1. Vertically center Discord SVG in nav to align with text links
2. Change Discord icons to Discord brand color (#5865F2) instead of teal
3. Commit and push

---

### [x] Step 10: Screenshot update and hero text fix

1. Remove "not a demo" mention from hero trial note
2. Copy homeSS.png and penguinSS.png to assets folder
3. Add new screenshots to "See Hari in action" section
4. Commit and push

---

### [x] Step 11: Stylize screenshots and video background

1. Make screenshots bigger, stacked with perspective/tilt, more visually appealing
2. Add subtle background design to the hero-demo section behind the video
3. Commit and push

---

### [x] Step 12: Geometric grid + video outline glow

1. Replaced dot pattern with geometric square grid lines behind video
2. Moved glow from background to video box-shadow (teal + gold outline)
3. Commit and push

---

### [x] Step 13: Asymmetric 2x2 screenshot grid

1. Top row: image (3/4) + teal accent block (1/4)
2. Bottom row: gold accent block (1/4) + image (3/4)
3. Much larger screenshots with captions inside frames
4. Commit and push

---

### [x] Step 14: Full-width screenshots, no rounding, dark accent

1. Removed all padding, rounding, borders, shadows from screenshots
2. Images span full viewport width edge-to-edge
3. Changed teal accent to dark (`var(--dark)`)
4. Commit and push

