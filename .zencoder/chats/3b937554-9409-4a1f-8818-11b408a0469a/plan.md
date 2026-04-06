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

Save the output to `c:\Users\david\Desktop\HariWeb\.zencoder\chats\3b937554-9409-4a1f-8818-11b408a0469a/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach
- Source code structure changes
- Data model / API / interface changes
- Verification approach

If the task is complex enough, create a detailed implementation plan based on `c:\Users\david\Desktop\HariWeb\.zencoder\chats\3b937554-9409-4a1f-8818-11b408a0469a/spec.md`:

- Break down the work into concrete tasks (incrementable, testable milestones)
- Each task should reference relevant contracts and include verification steps
- Replace the Implementation step below with the planned tasks

Rule of thumb for step size: each step should represent a coherent unit of work (e.g., implement a component, add an API endpoint, write tests for a module). Avoid steps that are too granular (single function).

Save to `c:\Users\david\Desktop\HariWeb\.zencoder\chats\3b937554-9409-4a1f-8818-11b408a0469a/plan.md`. If the feature is trivial and doesn't warrant this breakdown, keep the Implementation step below as is.

**Stop here.** Present the specification (and plan, if created) to the user and wait for their confirmation before proceeding.

---

### [x] Step: Hero copy rewrite + CTA label update

Update `index.html`:
- New `h1`: "Turn the sites you already browse into Tagalog practice"
- New `p.hero-subheadline`: lead with differentiation vs flashcards/streaks
- Update all CTA button labels to "Add to Chrome — it's free" (hero, trial section, pricing card, bottom CTA, sticky mobile button — all instances)
- Update `.hero-trial-note` reassurance line: "No credit card · Pause anytime · Uninstall in one click"

Verify: hero renders at 1280px and 375px; all CTAs read "Add to Chrome — it's free" and link to `./go/chrome/`.

---

### [x] Step: Add placeholder comments for future sections

After `.hero-demo` in `index.html`, insert three HTML comment blocks marking where trust bar, user count, and testimonials sections should go once real data is available.

Verify: comments present in source, no visible change to rendered page.

---

### [x] Step: Enhance product demo section (before/after layout)

In `index.html` `#in-action`:
- Replace single `eagless2.png` with a two-row layout: before/after grid (`compareenglish.png` + `comparetagalog.png`) + full-width feed example (`feedexample.png`)
- Add "Before" / "After Hari" label overlays in markup
- Update section subtitle copy

In `styles.css`, append new classes:
- `.before-after-grid` (two-column grid, stacks on ≤768px)
- `.before-after-item` (position: relative wrapper)
- `.before-after-label` (absolute-positioned pill overlay)
- `.feed-example-row` (full-width row with caption)

In `script.js`, add `.before-after-item` to IntersectionObserver targets.

Verify: images load correctly; labels are legible; layout stacks to single column on mobile; no horizontal overflow.

---

### [x] Step: Reorder page sections

Reorder sections in `index.html` to match the spec sequence:
1. Hero → Hero demo → (placeholder comments) → How It Works → Before/After demo → Who It's For → Emotional reconnect → Objection reassurance strip → Trial explainer → Pricing → FAQ → Discord → CTA

Update nav `href` anchors if any section IDs changed.

Verify: all five nav anchor links (`#who-its-for`, `#how-it-works`, `#in-action`, `#pricing`, `#faq`) resolve to the correct sections; smooth scroll works.

---

### [x] Step: Add objection reassurance strip

In `index.html`, insert a new `.reassurance-strip` section between the Emotional section and the Trial section.
Pill content: "No credit card required", "You control how much Tagalog you see", "Works on your existing tabs", "Doesn't replace full pages", "Uninstall in one click".

In `styles.css`, append:
- `.reassurance-strip` (centered flex row, `flex-wrap: wrap`, dark background)
- `.reassurance-pill` (border, rounded, small text, teal accent color)

In `script.js`, add `.reassurance-pill` to IntersectionObserver targets.

Verify: strip visible at all viewports; wraps correctly on 375px; no overflow.

---

### [x] Step: Strengthen pricing copy and FAQ

In `index.html`:
- Add value comparison line to pricing section: "Less than a single tutoring session ($50–80/hr). Tagalog in your life every single day."
- Add 2 new FAQ items: "Does Hari read or store what I browse?" and "Which sites does Hari work on?"

No new CSS required (FAQ items reuse `.faq-item` styles).

Verify: new FAQ items render consistently with existing ones; pricing copy visible on all viewports.

---

### [x] Step: Add "See It" nav link

In `index.html` `.nav-links`, add a `"See It"` `<li>` anchor pointing to `#in-action`, positioned between "How It Works" and "Pricing".

Verify: link visible in desktop nav and mobile menu; scrolls to the demo section.

---

### [x] Step: Final QA pass

Full visual and functional review of `index.html` in a browser:
- Desktop (1280px+), tablet (768px), mobile (375px)
- All CTAs read "Add to Chrome — it's free" and link to `./go/chrome/`
- Video autoplays and loops
- All anchor nav links scroll to correct sections
- Reassurance strip and before/after layout render correctly
- Sticky mobile CTA visible on mobile viewport
- No horizontal scrollbar on any viewport width
