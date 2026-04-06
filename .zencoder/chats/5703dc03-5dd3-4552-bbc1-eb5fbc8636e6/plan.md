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

Save the output to `c:\Users\david\Desktop\HariWeb\.zencoder\chats\5703dc03-5dd3-4552-bbc1-eb5fbc8636e6/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach
- Source code structure changes
- Data model / API / interface changes
- Verification approach

If the task is complex enough, create a detailed implementation plan based on `c:\Users\david\Desktop\HariWeb\.zencoder\chats\5703dc03-5dd3-4552-bbc1-eb5fbc8636e6/spec.md`:

- Break down the work into concrete tasks (incrementable, testable milestones)
- Each task should reference relevant contracts and include verification steps
- Replace the Implementation step below with the planned tasks

Rule of thumb for step size: each step should represent a coherent unit of work (e.g., implement a component, add an API endpoint, write tests for a module). Avoid steps that are too granular (single function).

Save to `c:\Users\david\Desktop\HariWeb\.zencoder\chats\5703dc03-5dd3-4552-bbc1-eb5fbc8636e6/plan.md`. If the feature is trivial and doesn't warrant this breakdown, keep the Implementation step below as is.

**Stop here.** Present the specification (and plan, if created) to the user and wait for their confirmation before proceeding.

---

### [x] Step 1: Scaffold HTML structure and scroll engine

Rewrite `index.html` with the new scene-based section structure. Preserve all `<head>` content (analytics, meta, fonts) exactly. Build the semantic HTML for all 9 scenes + header + footer with `data-scene` attributes and appropriate class names. Content can use placeholder text initially but should reflect the final narrative flow.

Rewrite `script.js` with the core scroll engine:
- Per-scene scroll progress calculation (0→1) using `requestAnimationFrame`
- `IntersectionObserver` for scene activation
- CSS custom property injection (`--scene-progress` per scene)
- Header transparency toggle on scroll
- Mobile nav toggle
- FAQ accordion open/close
- Smooth scroll for anchor links
- `prefers-reduced-motion` detection

**Verification**: Open in browser. Scenes should stack correctly. Scrolling should update `--scene-progress` values (inspect via DevTools). Header should toggle transparency. Mobile nav should work. No JS errors in console.

---

### [x] Step 2: CSS foundation — layout, typography, color system

Rewrite `styles.css` with:
- New CSS custom property system (colors, spacing, easing curves, typography scale)
- Scene container layout system (sticky positioning, min-heights, viewport units)
- Header styles (transparent → solid transition)
- Base typography scale with dramatic contrast (hero ~5rem, body ~1rem)
- Responsive grid utilities for asymmetric layouts
- `prefers-reduced-motion` media query overrides
- Preserve legal page styles (`.legal-page`, `.legal-container`, etc.) — copy them from current CSS
- Mobile-first responsive breakpoints (768px, 480px)
- Sticky mobile CTA

**Verification**: Page should have correct layout structure with scenes stacking. Typography should look intentional. Responsive at all breakpoints. Legal pages (`privacy.html`, `terms.html`) should still render correctly.

---

### [x] Step 3: Hero scene (Scene 1)

Implement the full hero scene:
- Full-viewport cinematic layout with `phillipinesphoto.jpg` as immersive background
- Slow parallax on background image driven by scroll progress
- Bold headline with reveal animation (clip-path or opacity choreography)
- Subtext and single CTA that fade up with staggered timing
- As user scrolls, hero content fades/scales and background transitions into Scene 2
- Tighten hero copy for maximum impact

**Verification**: Hero fills viewport. Background has parallax feel. Content reveals on load. Scrolling creates smooth transition toward demo section. Works on mobile.

---

### [x] Step 4: Product Demo scene (Scene 2)

Implement the demo video scene:
- Demo video frame scales/reveals from hero context (continuity transition)
- Sticky video container that pins while scroll progress drives callout reveals
- Feature callouts appear around the video as user scrolls
- Video autoplays muted with loop

**Verification**: Video pins and plays. Callouts animate in based on scroll. Transition from hero feels continuous, not abrupt. Works on mobile (non-sticky fallback if needed).

---

### [x] Step 5: How It Works scene (Scene 3)

Implement the horizontal step progression:
- 4 steps revealed by scroll progress
- Shared progress line/bar connecting steps
- Each step slides or fades in as user scrolls through the scene
- Clean, editorial typography

**Verification**: Steps reveal one-by-one on scroll. Progress line animates. Layout is clean. Works on mobile (vertical stack).

---

### [x] Step 6: Immersion / Culture scene (Scene 4)

Implement the editorial split layout:
- Left: text about reconnecting with Tagalog, Filipino culture, identity
- Right: before/after screenshots with scroll-driven clip-path reveal or crossfade
- Asymmetric composition with generous whitespace
- Tighten emotional copy

**Verification**: Split layout renders correctly. Screenshot reveal feels premium. Text is readable and emotionally resonant. Mobile: stacks vertically.

---

### [x] Step 7: Who It's For + Reassurance scenes (Scenes 5-6)

Implement persona section and trust strip:
- Persona cards with parallax depth and staggered entrance
- Reassurance pills with staggered fade-in
- Clean, confident visual treatment

**Verification**: Cards enter with depth. Pills animate in. Content matches target audience. Mobile responsive.

---

### [x] Step 8: Pricing + FAQ scenes (Scenes 7-8)

Implement pricing and FAQ:
- Two pricing cards with subtle entrance animation
- Premium card with gentle glow/highlight distinction
- FAQ accordion with smooth expand/collapse transitions
- Preserve all pricing details and FAQ content from current site

**Verification**: Pricing cards animate in. Premium card is visually distinct. FAQ accordion opens/closes smoothly. All pricing info and FAQ answers are accurate. Mobile responsive.

---

### [x] Step 9: Closing CTA + Footer (Scene 9 + Footer)

Implement the closing experience:
- Discord section merges into final CTA as one connected moment
- Background transitions to teal gradient
- Strong closing copy with prominent CTA button
- Clean footer with all links preserved

**Verification**: Closing feels like natural end of scroll journey. All links work (Chrome Web Store, Discord, legal pages, email). Footer renders correctly.

---

### [x] Step 10: Polish, responsive QA, and final verification

- Fine-tune all easing curves and animation timing across scenes
- Ensure continuity between all scene transitions (no jarring breaks)
- Full responsive QA at 1440px, 1024px, 768px, 480px, 375px
- Test `prefers-reduced-motion` — page must be fully usable with no animation
- Verify all analytics code is present and unchanged (GTM, GA ×2, Reddit Pixel)
- Verify all external links work
- Check for JS console errors
- Performance check: no layout thrashing in scroll handler, smooth 60fps scrolling
- Write completion report to `c:\Users\david\Desktop\HariWeb\.zencoder\chats\5703dc03-5dd3-4552-bbc1-eb5fbc8636e6/report.md`
