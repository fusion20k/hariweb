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

Assess the task's difficulty, as underestimating it leads to poor outcomes.

- easy: Straightforward implementation, trivial bug fix or feature
- medium: Moderate complexity, some edge cases or caveats to consider
- hard: Complex logic, many caveats, architectural considerations, or high-risk changes

Create a technical specification for the task that is appropriate for the complexity level:

- Review the existing codebase architecture and identify reusable components.
- Define the implementation approach based on established patterns in the project.
- Identify all source code files that will be created or modified.
- Define any necessary data model, API, or interface changes.
- Describe verification steps using the project's test and lint commands.

Save the output to `c:\Users\david\Desktop\HariWeb\.zencoder\chats\34253fb2-5d67-459a-b8f3-218d027ccb90/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach
- Source code structure changes
- Data model / API / interface changes
- Verification approach

If the task is complex enough, create a detailed implementation plan based on `c:\Users\david\Desktop\HariWeb\.zencoder\chats\34253fb2-5d67-459a-b8f3-218d027ccb90/spec.md`:

- Break down the work into concrete tasks (incrementable, testable milestones)
- Each task should reference relevant contracts and include verification steps
- Replace the Implementation step below with the planned tasks

Rule of thumb for step size: each step should represent a coherent unit of work (e.g., implement a component, add an API endpoint, write tests for a module). Avoid steps that are too granular (single function).

Save to `c:\Users\david\Desktop\HariWeb\.zencoder\chats\34253fb2-5d67-459a-b8f3-218d027ccb90/plan.md`. If the feature is trivial and doesn't warrant this breakdown, keep the Implementation step below as is.

**Stop here.** Present the specification (and plan, if created) to the user and wait for their confirmation before proceeding.

---

### [x] Step: Fix Favicon (Issue 2 — easiest, isolated change)

Edit `assets/favicon.svg`: remove any background circle/shapes entirely. The favicon should be ONLY the Hari logo mark, filled white (`#ffffff`), with a transparent background. No circle, no background fill.

**Verify**: Open `index.html` in Chrome. The favicon tab should show the white Hari logo mark on a transparent background, clearly visible on dark browser tabs.

---

### [x] Step: Generate Transparent-Background Eagle Image (prerequisite for Issue 1 + 3)

Use the `generate_image` tool to create `assets/haribon-eagle-nobg.png`:
- Front-facing Philippine Eagle (Haribon), same majestic upright posture as `haribon-eagle.png`
- Transparent background (PNG)
- Use `assets/haribon-eagle.png` as reference image

This asset is required before the hero layout changes can be completed.

---

### [x] Step: Rebuild Hero Layout — GROW-Style "HARI" + Eagle Layering (Issues 1 + 3)

**HTML (`index.html`)**:
- Replace `<div class="hero-letter" aria-hidden="true">H</div>` with:
  ```html
  <div class="hero-letters" aria-hidden="true">
      <span>H</span><span>A</span><span>R</span><span>I</span>
  </div>
  ```
- Update `<img src="./assets/haribon-eagle.png" ...>` → `src="./assets/haribon-eagle-nobg.png"`

**CSS (`styles.css`)**:
- Rename `.hero-letter` rules to `.hero-letters`
- Replace dotted `background-clip: text` style with solid `color: #ffffff; font-weight: 900` (white letters like GROW reference)
- Reduce font-size from `clamp(18rem, 75vh, 55rem)` to ~`clamp(8rem, 20vw, 20rem)` for 4-letter single-row fit; tight `letter-spacing`
- Eagle wrap: increase height to `100%`, change `object-position` to `bottom center`
- Eagle wrap: z-index to 2 (above letters at z-index 1) so the eagle physically overlaps text
- Update all responsive breakpoints (1024px, 768px, 480px, 375px) with adjusted letter sizes
- Update animation classes: `.hero-letter.hero-in` → `.hero-letters.hero-in`

**Verify**: In Chrome DevTools, check at 1440px, 1024px, 768px, 375px widths that: (a) "HARI" is fully readable, (b) eagle head/crest not cut off, (c) eagle visually overlaps the letters.

---

### [x] Step: Write Report

Write a report to `c:\Users\david\Desktop\HariWeb\.zencoder\chats\34253fb2-5d67-459a-b8f3-218d027ccb90/report.md` describing:
- What was implemented
- How the solution was tested
- The biggest issues or challenges encountered

---

## Rework Steps (post-review fixes)

### [x] Step: Fix Favicon Centering

The current `assets/favicon.svg` logo is not centered in the 512×512 viewBox — it renders off-center and looks bad in browser tabs. Fix the SVG so the Haribon logo path is properly centered within the viewBox. The favicon should be ONLY the white logo mark (`#ffffff` fill) on a transparent background — no circles, no background shapes. Keep the existing path data but fix the `transform` (currently `translate(76, 86) scale(0.38)`) so the logo is visually centered.

**Verify**: The favicon should look properly centered when viewed in a browser tab.

---

### [x] Step: Fix Hero GROW-Style Layout (text layering + eagle background)

Two problems to fix:

**Problem 1 — Eagle background not transparent**: The generated `haribon-eagle-nobg.png` still has visible background remnants. Instead of regenerating, use CSS `mix-blend-mode: multiply` on the eagle image element. This makes light/white/cream pixels effectively transparent against the hero background (`#e9e6de`). Switch the image source back to the original `./assets/haribon-eagle.png` which has a clean cream background that will blend perfectly with multiply mode.

**Problem 2 — GROW-style interleaved text**: The HARI text must appear both BEHIND and IN FRONT of the eagle, creating an interleaved depth effect like the "GROW" reference image (where tree branches poke through between letters). Current implementation has text only behind the eagle (z-index 1 for text, z-index 2 for eagle).

**Implementation approach for the GROW effect:**
1. In `index.html`, add a SECOND copy of the `.hero-letters` div, with class `.hero-letters--front`, placed AFTER the eagle wrap div. Keep the existing one as `.hero-letters--back`.
2. In `styles.css`:
   - `.hero-letters--back`: z-index 1 (behind eagle)
   - `.hero-eagle-wrap`: z-index 2 (middle)
   - `.hero-letters--front`: z-index 3 (in front of eagle), with `clip-path: inset(50% 0 0 0)` to only show the BOTTOM half of the letters — this creates the illusion that the eagle's body is behind the lower letters while the eagle's head pokes above
3. Both text layers must have IDENTICAL positioning, font-size, and styling so they align perfectly
4. The text should be CENTERED horizontally (not left-aligned as it currently is — `left: 50%; transform: translate(-50%, -50%)`)
5. The text font-size should be large enough to be the visual centerpiece — approximately `clamp(10rem, 25vw, 22rem)` so it dominates
6. Add `mix-blend-mode: multiply` to `.hero-eagle-img`
7. Adjust eagle sizing so the eagle's head/crest extends above the text while the body overlaps with the letters

**Also update all responsive breakpoints** (1024px, 768px, 480px, 375px) for the new text sizing and both text layers.

**Verify**: Letters should visually interleave with the eagle — some parts of "HARI" in front, some behind, similar to the GROW reference.

---

### [x] Step: Update Report

Update `c:\Users\david\Desktop\HariWeb\.zencoder\chats\34253fb2-5d67-459a-b8f3-218d027ccb90/report.md` with the rework changes.

---

## Rework 2 — Simplify Hero Layout

### [x] Step: Simplify Hero — Text Above Eagle, No Layering

User feedback: drop the GROW-style layering entirely. New design:

1. **"HARI" text above the eagle** — large, centered, positioned in the upper portion of the hero stage. No overlapping with the eagle. Make the text bigger than before.
2. **Eagle shows chest up only** — crop the eagle so only the head/crest/chest is visible. The bottom of the eagle image should be flush with the bottom UI bar (hero-bottom). Use `object-fit: cover` and `object-position: top center` to achieve this crop.
3. **Background colors must match** — use the transparent-background eagle image (`haribon-eagle-nobg.png`) so the hero background shows through. Remove `mix-blend-mode: multiply`.
4. **Remove layering HTML** — remove the `.hero-letters--front` duplicate div, remove `hero-letters--back` class from the remaining letters div.
5. **Fix favicon** — the white SVG logo is invisible in the URL bar on light backgrounds. Make the favicon path fill `#1a1a1a` (dark) so it's visible on both light and dark browser UI. Keep no background/circle — just the dark logo mark on transparent bg.

**Files**: `index.html`, `styles.css`, `assets/favicon.svg`

**Update all responsive breakpoints** (1024px, 768px, 480px, 375px) for the new layout.
**Update animation styles** for the simplified structure.
