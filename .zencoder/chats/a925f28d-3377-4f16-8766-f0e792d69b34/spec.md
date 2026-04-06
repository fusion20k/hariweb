# Technical Specification: Hari Landing Page Overhaul

## Difficulty: Medium-Hard
Many visual/content changes across a static site (HTML, CSS, JS). No backend or architecture changes.

## Technical Context
- **Stack**: Static HTML/CSS/JS site (no framework, no build tool)
- **Dependencies**: Google Fonts (Inter), Google Analytics
- **Files to modify**: `index.html`, `styles.css`, `script.js`
- **No new files needed**

## Implementation Approach

### Phase 1: Above the Fold / Hero
- Change primary CTA text → "Add to Chrome free"
- Make secondary "See how it works" ghost-style (already is, just ensure it's de-emphasized)
- Add subheadline under H1: "Turn doomscrolling into passive Tagalog exposure in under 60 seconds."
- Add trial reassurance text directly under hero CTA ("Card required to start. No charge until your 30-day trial ends.")
- Turn hero bullets into card-style blocks with small platform icons (Twitter/X, Facebook, News)

### Phase 2: Visual Hierarchy & Readability
- Increase section padding/whitespace (sections like example, features, how-it-works, pricing)
- Bump line-height on dense paragraphs (especially mobile)
- Make "Get started in 3 steps" horizontally aligned with icons + shorter copy (1-2 lines each)
- Reduce step copy to scan-friendly length

### Phase 3: Social Proof & Trust
- Add "What Fil-Ams are saying" testimonials section (2-4 placeholder testimonials)
- Surface Discord as social proof near bottom: "Join 100+ Fil-Ams learning Tagalog together" + button
- Add trust markers near pricing: "Powered by Stripe", "Cancel anytime", "No spam"

### Phase 4: Pricing Clarity
- Make current price ($20) visually dominant, de-emphasize old price
- Change label to "Founding Fil-Am discount: $20/month"
- Add simple Starter vs Pro comparison table (Free trial row vs Unlimited row)

### Phase 5: Message Sharpening
- Remove duplicate "start at 10%" references — keep in hero bullets + "You control" section only
- Tighten FAQ answers to 3-4 lines, bold one keyword per answer
- Add "Who Hari is for" micro-section with 3 bullets

### Phase 6: Conversion & UX
- Make CTA button text consistent across page ("Add to Chrome free" for primary actions)
- Add sticky mobile footer CTA bar
- Ensure all CTA links open Chrome Web Store in new tab

### Phase 7: Technical / SEO
- Update `<title>` and `<meta description>` to include "Tagalog", "Filipino American", "Chrome extension"
- Add descriptive alt texts for before/after images
- Ensure smooth scroll for anchor links (already exists in script.js)

## Verification
- Visual inspection in browser at desktop and mobile widths
- Check all links open correctly
- Verify meta tags in page source
- Verify no broken images or missing styles
