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

### [x] Step: Implementation

Implement the task according to the technical specification and general engineering best practices.

1. Break the task into steps where possible.
2. Implement the required changes in the codebase.
3. Add and run relevant tests and linters.
4. Perform basic manual verification if applicable.
5. After completion, write a report to `c:\Users\david\Desktop\HariWeb\.zencoder\chats\f6ce67cc-3d67-4cac-94d8-62f5f7b77cdb/report.md` describing:
   - What was implemented
   - How the solution was tested
   - The biggest issues or challenges encountered

---

### [x] Step: Demo Section Polish

Enhance the "See it in action" demo section (`#scene-demo`) on the landing page for better visual appeal and conversion:

- Make the demo video significantly larger and more prominent. Consider making the video the visual centerpiece (wider/taller, stronger framing, subtle glow/shadow, improved aspect handling) while keeping the 3 callouts readable on desktop.
- Improve the overall layout so the section feels more premium and engaging (spacing, typography hierarchy, background accents, callout styling). Keep it on-brand with the rest of the site (dark theme, teal accent).
- Reduce the size of the "Add to Chrome — it's free" CTA button in the demo section so it does not dominate the layout. Keep it clearly clickable and accessible, but closer to a standard primary button size (not `btn--large`-sized).
- Ensure the section remains fully responsive on tablet and mobile.
- Do not break other sections, nav, or the existing video source path (`./assets/HariVidDemo.mp4`).
- Commit and push all changes to `https://github.com/fusion20k/hariweb` on the `main` branch.

Files likely touched: `index.html`, `styles.css`.

---

### [x] Step: Full Site Polish

Polish the rest of the HariWeb landing page for a premium, cohesive, conversion-focused feel. The demo section (`#scene-demo`) was already polished in the previous step — use it as the visual quality bar and bring every other section up to that level, without breaking existing copy, IDs, nav anchors, or functionality.

Sections/areas to review and polish:

- Header / sticky nav (`header`, nav links, logo, mobile menu button)
- Hero (`#scene-hero`): headline, subtext, CTA, background imagery, scroll hint
- The Hari Method / philosophy (`#scene-how`): eyebrow, title, intro, 3 persona cards, compact "How it works" sub-section with numbered steps
- Culture / compare slider (`#scene-culture`): culture text, before/after drag-to-compare slider, handle, labels
- Pricing section (if present)
- FAQ / any remaining sections
- Footer: columns, links, tagline, legal line
- Global polish: typography rhythm, section spacing, button styles, card treatments, subtle background accents, hover/focus states, responsive behavior (tablet & mobile), reduced-motion respect.

Constraints:

- Keep the dark theme + teal accent brand.
- Do not change section IDs (`#scene-hero`, `#scene-demo`, `#scene-how`, `#scene-culture`, etc.) — nav relies on them.
- Do not change the before/after slider behavior or handle centering fix from an earlier round.
- Do not touch the demo video source path or break the demo section that was just polished (you may make minor tweaks only if needed for global consistency).
- Preserve all existing copy unless a tiny tweak clearly improves conversion.
- Ensure lint-clean HTML/CSS and no console errors.

Commit and push all changes to `https://github.com/fusion20k/hariweb` on the `main` branch with a descriptive commit message.

Files likely touched: `index.html`, `styles.css` (and `script.js` only if strictly needed).
