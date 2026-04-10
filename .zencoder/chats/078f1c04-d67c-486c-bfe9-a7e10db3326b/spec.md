# Technical Specification: Starfield Background + Unified Dark BG

## Difficulty: Easy

---

## Technical Context

- **Language**: CSS (single file: `styles.css`)
- **No build step** — changes are live immediately in browser
- **No dependencies** — pure CSS, no JS involved
- **File to modify**: `styles.css` only

---

## Problem Summary

Two issues to fix:

1. **`.scene::before` bubble ring pattern** — the current hollow-ellipse radial-gradient creates a visible repeating honeycomb/ring grid that is too obvious. Replace with scattered tiny solid dots resembling a starfield.
2. **Section background banding** — sections alternate between `var(--bg)` (#0a0a0a) and `var(--bg-2)` (#111111), creating visible color banding. Unify all to `var(--bg)`.

---

## Current State of Section Backgrounds

| Selector | Current base color |
|---|---|
| `.scene--demo` | `var(--bg-2)` (#111111) |
| `.scene--how` | `var(--bg)` (#0a0a0a) |
| `.scene--culture` | `var(--bg-2)` (#111111) |
| `.scene--who` | `var(--bg)` (#0a0a0a) |
| `.scene--reassurance` | `var(--bg-2)` (#111111) |
| `.scene--pricing` | `var(--bg)` (#0a0a0a) |
| `.scene--faq` | `var(--bg-2)` (#111111) |
| `.scene--closing` | `var(--bg)` (#0a0a0a) |

The subtle teal/gold radial-gradient accents layered on top of these bases are fine to keep — only the base color needs unifying.

---

## Implementation Approach

### Change 1: Replace `.scene::before` with a starfield dot pattern

Replace the current ring-style gradients (lines 241–259) with multiple `radial-gradient` layers that produce **solid tiny circles** at varying sizes and staggered positions. The key technique:

```css
radial-gradient(circle, rgba(255,255,255, opacity) dotSize, transparent dotSize)
```

Use **5–7 layers** with deliberately different `background-size` values (e.g., 97px 113px, 143px 79px, 211px 157px, 73px 199px, 167px 89px) so the tiling periods don't visually align, breaking up any obvious grid. Vary dot opacity (0.012–0.03), size (1px–2px), and position offsets per layer.

Example structure:
```css
.scene::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
        radial-gradient(circle, rgba(255,255,255,0.022) 1px, transparent 1px),
        radial-gradient(circle, rgba(255,255,255,0.016) 1.5px, transparent 1.5px),
        radial-gradient(circle, rgba(255,255,255,0.012) 1px, transparent 1px),
        radial-gradient(circle, rgba(255,255,255,0.018) 2px, transparent 2px),
        radial-gradient(circle, rgba(255,255,255,0.014) 1px, transparent 1px),
        radial-gradient(circle, rgba(26,188,156,0.015) 1px, transparent 1px);
    background-size:
        97px 113px,
        143px 79px,
        211px 157px,
        73px 199px,
        167px 89px,
        251px 131px;
    background-position:
        0 0,
        37px 53px,
        71px 23px,
        13px 89px,
        57px 41px,
        103px 67px;
    pointer-events: none;
    z-index: 0;
}
```

The prime-ish tile dimensions ensure the overlapping tiling pattern never creates visible repeating rings or grids at normal scroll distances.

### Change 2: Unify section base colors to `var(--bg)`

Update the background shorthand for the 4 sections that use `var(--bg-2)`:

- `.scene--demo` (line 441–443): change `var(--bg-2)` → `var(--bg)`
- `.scene--culture` (line 733–736): change `var(--bg-2)` → `var(--bg)`
- `.scene--reassurance` (line 1072–1074): change `var(--bg-2)` → `var(--bg)`
- `.scene--faq` (line 1164–1166): change `var(--bg-2)` → `var(--bg)`

Sections already using `var(--bg)` (`.scene--how`, `.scene--who`, `.scene--pricing`, `.scene--closing`) need no change.

The teal/gold accent radial-gradient layers on each section background are preserved — only the base color token changes.

---

## Files Modified

| File | Change |
|---|---|
| `styles.css` | Replace `.scene::before` gradient block (lines 241–259) with starfield dots |
| `styles.css` | Change `var(--bg-2)` → `var(--bg)` in `.scene--demo`, `.scene--culture`, `.scene--reassurance`, `.scene--faq` |

---

## What is NOT Changed

- `.scene--hero::before { display: none }` — stays, hero is unaffected
- `.hero-bg-overlay` gradient — stays, the deep navy fade at the bottom of the hero is preserved
- All teal/gold accent radial-gradients on individual section backgrounds — preserved, just base color changes
- All layout, animations, components — untouched

---

## Verification

1. Open `index.html` in a browser and scroll through all sections
2. Confirm no visible ring/honeycomb grid anywhere
3. Confirm subtle dot texture is present but barely noticeable (like faint stars)
4. Confirm no visible color banding/seam between sections — all sections should read as one unified dark canvas
5. Confirm hero section still shows full-bleed photo with deep navy fade at bottom
