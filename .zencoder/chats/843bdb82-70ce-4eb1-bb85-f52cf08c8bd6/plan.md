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

**Complexity:** easy

**Task:** Add a second pricing card ($20/month) alongside the existing Free Trial card in the pricing section of index.html.

**Files to modify:**
- `index.html` — Replace single pricing card with a two-card grid layout
- `styles.css` — Add `.pricing-grid`, update `.pricing-card` sizing, add `.pricing-card.featured` variant

**Approach:**
- Wrap both cards in a `.pricing-grid` flex container
- Free Trial card: existing content, remove the "After trial: $20/month" bullet (covered by second card)
- Pro card ($20/month): badge "Pro", price $20/mo, features for full subscription, same CWS link
- Both buttons link to the Chrome Web Store
- Grid stacks vertically on mobile

---

### [x] Step: Implementation

- [x] Update styles.css with pricing grid layout and featured card styles
- [x] Provide HTML snippet for index.html pricing section replacement
