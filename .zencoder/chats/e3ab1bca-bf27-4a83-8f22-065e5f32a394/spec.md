# Technical Specification: Free Plan Messaging Update

## Difficulty Assessment

**Easy–Medium.** All changes are copy/text rewrites in `index.html` plus one structural HTML addition (a Free plan card in the pricing section) with companion CSS. No JavaScript logic changes are needed. No APIs, data models, or external services are touched.

---

## Technical Context

- **Language / stack:** Vanilla HTML, CSS, JavaScript. No build system, no framework.
- **Files in scope:**
  - `index.html` — all copy changes and structural pricing update
  - `styles.css` — new CSS for two-column pricing layout
- **Files NOT in scope:** `script.js`, `privacy.html`, `terms.html`, asset files.

---

## Implementation Approach

All changes follow the existing code conventions (no comments added, classes and patterns already in use). The pricing section restructure is the only layout change; everything else is targeted copy replacement.

### Change 1 — Hero subheadline (index.html)

**Current:**
> "No flashcards, no streaks, no study sessions. Hari quietly layers Tagalog into the sites you already read, with instant translations so you're never stuck."

**Replace with:**
> "No flashcards, no study sessions. Install Hari and get 25,000 free Tagalog characters every month while you browse."

### Change 2 — Hero trial note (index.html)

**Current:**
> "No credit card · Pause anytime · Uninstall in one click"

**Replace with:**
> "No credit card · 25,000 free characters/month · Uninstall in one click"

### Change 3 — Audience-fit line near first CTA (index.html)

Add a `<p class="hero-audience-note">` immediately after `.hero-trial-note` in the hero section:

> "Best for Filipino Americans and Tagalog beginners who want immersion without extra study time."

Add a CSS rule for `.hero-audience-note` (small, muted, centered, white/50%).

### Change 4 — Reassurance strip pill (index.html)

**Current pill:**
> "Pause anytime"

**Replace with:**
> "Start free, upgrade only if you want more"

### Change 5 — Free plan section (index.html + styles.css)

The `.trial-section` is reframed as the free plan explainer. Changes:

- Section heading: "Try Hari free — no card, no pressure" → "Start free. 25,000 characters every month."
- `.trial-intro`: Remove trial-mindset framing. New copy:
  > "Hari's free plan gives you 25,000 characters of Tagalog every month — enough for real browsing sessions, no timer, no card."
- `.trial-explainer` content:
  - Line 1: "You get **25,000 characters** of Tagalog every month, free forever."
  - Line 2: "For most people that covers several solid browsing sessions per month."
  - Line 3: "When you hit the monthly limit, Hari pauses until next month — or you can upgrade anytime for unlimited characters."
- `.trial-note`: "Install in seconds, uninstall in one click if it's not for you." *(unchanged — still accurate)*

### Change 6 — Pricing section (index.html + styles.css)

**Current:** A single `.pricing-card.featured` for Hari Premium inside a `.pricing-stack`.

**New:** Two side-by-side cards inside a `.pricing-grid`:

| Free | Premium |
|---|---|
| 25,000 characters/month | Unlimited characters |
| No credit card | All current features |
| Use Hari on real browsing | Priority support |
| — | $16.99/month |
| CTA: "Add to Chrome — it's free" | CTA: "Upgrade to Premium" (links to Chrome store) |

- Section heading update: "Love it? Keep the Tagalog coming." → "Simple, honest pricing."
- `.pricing-intro`: "Start free with 25,000 characters a month. Upgrade to Premium when you want unlimited browsing."
- `.pricing-reassurance`: Keep as-is (still accurate).

**CSS additions for `.pricing-grid`:**
```css
.pricing-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    max-width: 860px;
    margin: 0 auto;
}
@media (max-width: 768px) {
    .pricing-grid { grid-template-columns: 1fr; }
}
```

The Free card uses `.pricing-card` (no `.featured` modifier); Premium keeps `.pricing-card.featured`. The Free card has no `.price-original` strikethrough. Free card price display shows "Free" with a `/month` sub-label.

### Change 7 — FAQ section (index.html)

Rewrite three items; keep four others untouched.

**Item 1 — rewrite:**
- Q: "Do I really not need a credit card for the trial?" → "Do I need a credit card to get started?"
- A: "No card required. Install Hari and the free plan activates automatically — 25,000 characters every month, no payment needed."

**Item 2 — rewrite:**
- Q: "What happens when I hit 10,000 characters?" → "What do I get on the free plan?"
- A: "You get 25,000 Tagalog characters every month at no cost. That covers several real browsing sessions. Your free allocation resets automatically each month."

**Item 3 — add new (insert after item 2):**
- Q: "What happens when I use all 25,000 free characters?"
- A: "Hari simply pauses for the rest of the month. You'll see a message letting you know, with an option to upgrade to Premium for unlimited characters. No charges without your consent."

**Items 4–7:** "Will Hari break the sites I visit?", "I'm not Filipino American…", "Can I stop anytime?", "Does Hari read or store what I browse?", "Which sites does Hari work on?" — **no changes needed.**

---

## Data Model / API / Interface Changes

None. This is a static HTML/CSS site with no backend, APIs, or data models.

---

## Source Code Structure Changes

| File | Nature of change |
|---|---|
| `index.html` | Copy rewrites (hero, reassurance, trial/free section, pricing, FAQ); add Free pricing card; add audience-fit `<p>`; swap `pricing-stack` div for `pricing-grid` |
| `styles.css` | Add `.pricing-grid` two-column layout; add `.hero-audience-note` style |

No new files are created.

---

## Verification Approach

1. **Visual review** — Open `index.html` in Chrome and check each changed section matches the new copy exactly.
2. **Search for stale strings** — Confirm none of the following remain in `index.html`: `10,000`, `trial`, `Pause anytime`, `usage-based`.
3. **Pricing layout** — Verify two cards render side-by-side on desktop and stack vertically on mobile (resize or DevTools).
4. **CTA links** — Confirm all CTA buttons still link to `./go/chrome/`.
5. **No JS errors** — Open browser console; confirm zero errors on page load.
6. **Mobile sticky CTA** — Confirm sticky bar still appears correctly on narrow viewports.
