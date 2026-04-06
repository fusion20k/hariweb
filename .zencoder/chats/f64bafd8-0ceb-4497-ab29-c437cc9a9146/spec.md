# Spec: Copy Optimization for Conversions

## Difficulty: Easy

Pure text changes in a single HTML file. No architecture, logic, or styling involved.

---

## Technical Context

- **Language**: HTML (static site)
- **File to modify**: `index.html` (all user-facing copy lives here)
- **No JS, CSS, or dependency changes needed**

---

## Current Copy Audit — Issues Found

### 1. Step 4 in "How It Works" — uses the word "aggressive"
> *"Choose how aggressive Hari is — from 'just a few words' to 'more Tagalog, please' — so it never feels overwhelming."*

"Aggressive" is inconsistent with the warm/inviting tone.

**Fix:** Replace "aggressive" with a friendlier framing around control/comfort.

---

### 2. Emotional Section H2 — negative framing ("burning out")
> *"Reconnect with Tagalog without burning out"*

The headline leads with a pain word. A warmer, more inviting framing puts the positive outcome first.

**Fix:** Reframe to be aspirational rather than avoidance-based.

---

### 3. Pricing H2 — passive and low-energy
> *"Keep Hari going after your trial"*

Sounds like a chore. Should feel like a natural next step or an invitation.

**Fix:** Make it feel like a warm invitation to continue something good.

---

### 4. Pricing body copy — "actually" undermines confidence
> *"If Hari **actually** helps you stick with Tagalog, you can upgrade..."*

"Actually" reads as self-doubt. Drop it.

**Fix:** Remove "actually".

---

### 5. Final CTA H2 — uncertain/doubtful framing
> *"See if Tagalog can fit into your real life"*

"See if" implies it might not work. A conversion-optimized headline should be more confident while still being low-pressure.

**Fix:** Reframe as an inviting promise rather than an experiment.

---

### 6. Final CTA body — guilt-trip framing
> *"Instead of feeling guilty about never opening a textbook or app, let Tagalog show up on the sites you already read."*

Leading with guilt is a slightly harsh emotional lever that conflicts with the "warm, not pushy" directive.

**Fix:** Keep the empathy, drop the guilt; focus on the positive alternative.

---

### 7. FAQ H2 — flat and generic
> *"Questions you might have"*

Bland. A small warmth upgrade here goes a long way.

**Fix:** Something friendlier.

---

### 8. Trial Section H2 — functional but could be warmer
> *"Try Hari free — no card needed"*

Clear, which is good. Minor warmth opportunity.

**Fix:** Keep the clarity, add a touch more invitation.

---

## Proposed Changes (Before → After)

| Location | Current | Proposed |
|---|---|---|
| Step 4 (How It Works) | "Choose how aggressive Hari is — from 'just a few words' to 'more Tagalog, please' — so it never feels overwhelming." | "Choose how much Tagalog you see — from 'just a few words' to 'give me more' — so it always feels comfortable." |
| Emotional section H2 | "Reconnect with Tagalog without burning out" | "Reconnect with Tagalog, at your own pace" |
| Pricing H2 | "Keep Hari going after your trial" | "Love it? Keep the Tagalog coming." |
| Pricing intro | "If Hari actually helps you stick with Tagalog, you can upgrade to keep the Tagalog layer on all the time." | "If Hari helps you stick with Tagalog, you can upgrade to keep the Tagalog layer on all the time." |
| Pricing reassurance | "If Hari keeps you consistently seeing Tagalog every day, it's cheaper than a single tutoring session each month." | "At less than the cost of a single tutoring session, Hari keeps Tagalog in your life every single day." |
| Final CTA H2 | "See if Tagalog can fit into your real life" | "Bring Tagalog into your everyday life" |
| Final CTA body | "Instead of feeling guilty about never opening a textbook or app, let Tagalog show up on the sites you already read. Test Hari on your actual browsing and see if it clicks." | "No textbooks, no streaks, no pressure — just Tagalog quietly showing up on the sites you already read. Try it on your real browsing and see how it feels." |
| FAQ H2 | "Questions you might have" | "A few questions, answered" |
| Trial section H2 | "Try Hari free — no card needed" | "Try Hari free — no card, no pressure" |

---

## Files Modified

- `index.html` — 9 targeted text changes, no structural or styling changes

---

## Implementation Approach

Straightforward find-and-replace of specific strings. Each change is isolated to a single line or phrase, with no risk of breakage elsewhere.

---

## Verification

- Visual diff / review of `index.html` after changes
- Load the page in a browser and read through each section to confirm tone feels consistent: warm, inviting, low-pressure
- No build step or linting needed (static HTML)
