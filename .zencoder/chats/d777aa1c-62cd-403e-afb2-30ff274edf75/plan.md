# Spec and build

## Agent Instructions

Ask the user questions when anything is unclear or needs their input. This includes:

- Ambiguous or incomplete requirements
- Technical decisions that affect architecture or user experience
- Trade-offs that require business context

Do not make assumptions on important decisions — get clarification first.

---

## Workflow Steps

### [x] Step: Technical Specification (Pricing Update)

### [x] Step: Implementation (Pricing Update)

### [x] Step: Commit and Push (Pricing Update)

---

### [x] Step: Technical Specification (Eagle Screenshots)

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

Save the output to `c:\Users\david\Desktop\HariWeb\.zencoder\chats\d777aa1c-62cd-403e-afb2-30ff274edf75/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach
- Source code structure changes
- Data model / API / interface changes
- Verification approach

If the task is complex enough, create a detailed implementation plan based on `c:\Users\david\Desktop\HariWeb\.zencoder\chats\d777aa1c-62cd-403e-afb2-30ff274edf75/spec.md`:

- Break down the work into concrete tasks (incrementable, testable milestones)
- Each task should reference relevant contracts and include verification steps
- Replace the Implementation step below with the planned tasks

Rule of thumb for step size: each step should represent a coherent unit of work (e.g., implement a component, add an API endpoint, write tests for a module). Avoid steps that are too granular (single function).

Save to `c:\Users\david\Desktop\HariWeb\.zencoder\chats\d777aa1c-62cd-403e-afb2-30ff274edf75/plan.md`. If the feature is trivial and doesn't warrant this breakdown, keep the Implementation step below as is.

---

### [x] Step: Implementation (Eagle Screenshots)

Implement the task according to the technical specification and general engineering best practices.

1. Copy images to assets folder.
2. Add two new screenshot-frame entries in the example-section of index.html.
3. Constrain image sizes with max-height CSS so they are easier to see and not too large.
4. After completion, write a report.

---

### [x] Step: Commit and Push (Eagle Screenshots)

Commit changes and push to GitHub repository.

---

### [x] Step: Fix Screenshot Sizing (Show Full Images)

1. Change `.screenshot-img` from `object-fit: cover` to `object-fit: contain` so images aren't cropped.
2. Constrain `.screenshot-showcase` max-width and center it so images aren't full-bleed.
3. Commit and push.

---

### [x] Step: Staggered Screenshot Layout

1. Change `.screenshot-showcase` to a 2-column grid with staggered/offset positioning so images are larger and nicely viewable.
2. Commit and push.

---

### [x] Step: Fix Wide Screenshots Layout

1. Make wide/landscape images (homeSS, eagless2) span full width across both columns so they are large and readable.
2. Keep portrait/tall images (penguinSS, eagless1) in the staggered 2-col layout.
3. Commit and push.
