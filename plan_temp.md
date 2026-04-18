# Spec and build

## Agent Instructions

Ask the user questions when anything is unclear or needs their input. This includes:

- Ambiguous or incomplete requirements
- Technical decisions that affect architecture or user experience
- Trade-offs that require business context

Do not make assumptions on important decisions — get clarification first.

---

## Workflow Steps

### [ ] Step: Technical Specification

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

Save the output to `c:\Users\david\Desktop\HariWeb\.zencoder\chats\f6ce67cc-3d67-4cac-94d8-62f5f7b77cdb/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach
- Source code structure changes
- Data model / API / interface changes
- Verification approach

If the task is complex enough, create a detailed implementation plan based on `c:\Users\david\Desktop\HariWeb\.zencoder\chats\f6ce67cc-3d67-4cac-94d8-62f5f7b77cdb/spec.md`:

- Break down the work into concrete tasks (incrementable, testable milestones)
- Each task should reference relevant contracts and include verification steps
- Replace the Implementation step below with the planned tasks

Rule of thumb for step size: each step should represent a coherent unit of work (e.g., implement a component, add an API endpoint, write tests for a module). Avoid steps that are too granular (single function).

Save to `c:\Users\david\Desktop\HariWeb\.zencoder\chats\f6ce67cc-3d67-4cac-94d8-62f5f7b77cdb/plan.md`. If the feature is trivial and doesn't warrant this breakdown, keep the Implementation step below as is.

**Stop here.** Present the specification (and plan, if created) to the user and wait for their confirmation before proceeding.

---

### [ ] Step: Copy assets into project

Copy the three external files into `./assets/`:
1. `C:\Users\david\Videos\YoutubeVideos\HariVidDemo.mp4` → `.\assets\HariVidDemo.mp4`
2. `C:\Users\david\Downloads\beforehari.png` → `.\assets\beforehari.png`
3. `C:\Users\david\Downloads\withhari.png` → `.\assets\withhari.png`

Verify each file exists in `./assets/` before continuing.

---

### [ ] Step: Replace demo video and improve demo section layout

Files: `index.html`, `styles.css`

- Update `<source src="./assets/HariDemo.mp4">` → `<source src="./assets/HariVidDemo.mp4">`
- Rewrite the three `.demo-callout` items with stronger outcome/benefit copy
- Add a `.demo-trust` trust line below the video frame
- Add a `.demo-bottom-cta` CTA block below `.demo-layout`
- Add corresponding CSS for `.demo-trust` and `.demo-bottom-cta`

Verify: open `index.html` in browser, confirm video plays and new CTA renders.

---

### [ ] Step: Implement drag-to-compare slider (replace before/after tabs)

Files: `index.html`, `styles.css`, `script.js`

- Replace `.comparison-toggle-wrap` HTML with `.ba-slider` structure (see spec.md)
- Add `.ba-slider`, `.ba-before`, `.ba-after`, `.ba-handle`, `.ba-label` CSS
- Remove old `.comparison-tabs`, `.comparison-tab`, `.comparison-panel`, `.comparison-display` CSS
- Add `initBaSlider()` JS function using Pointer Events API (see spec.md)
- Remove old `querySelectorAll('.comparison-tabs')` JS handler block

Verify: drag slider responds to mouse drag; handle moves; before/after images visible; works on mobile viewport.

---

### [ ] Step: Replace "Who It's For" section with "Philosophy" section

Files: `index.html`, `styles.css`

- Replace `.scene--who` content with "The Hari Method" immersion philosophy section
- Rename class to `scene--philosophy`, id to `scene-philosophy`
- Three philosophy cards with immersion content (see spec.md for copy)
- Add `.philosophy-body` intro paragraph and `.philosophy-note` bottom note
- Rename/replace CSS selectors from `who`/`persona` to `philosophy` equivalents
- Update footer link `href="#scene-who"` → `href="#scene-philosophy"` and link text

Verify: section animates in on scroll; cards have teal hover; footer link scrolls correctly.

---

### [ ] Step: Write implementation report

Write a report to `c:\Users\david\Desktop\HariWeb\.zencoder\chats\f6ce67cc-3d67-4cac-94d8-62f5f7b77cdb/report.md` describing:
- What was implemented
- How the solution was tested
- The biggest issues or challenges encountered
