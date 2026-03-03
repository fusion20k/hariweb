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

Save the output to `c:\Users\david\Desktop\HariWeb\.zencoder\chats\d105c5f9-7f28-4e48-bae6-ab092b1d7694/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach
- Source code structure changes
- Data model / API / interface changes
- Verification approach

If the task is complex enough, create a detailed implementation plan based on `c:\Users\david\Desktop\HariWeb\.zencoder\chats\d105c5f9-7f28-4e48-bae6-ab092b1d7694/spec.md`:

- Break down the work into concrete tasks (incrementable, testable milestones)
- Each task should reference relevant contracts and include verification steps
- Replace the Implementation step below with the planned tasks

Rule of thumb for step size: each step should represent a coherent unit of work (e.g., implement a component, add an API endpoint, write tests for a module). Avoid steps that are too granular (single function).

Save to `c:\Users\david\Desktop\HariWeb\.zencoder\chats\d105c5f9-7f28-4e48-bae6-ab092b1d7694/plan.md`. If the feature is trivial and doesn't warrant this breakdown, keep the Implementation step below as is.

---

### [x] Step: Implementation

Implement the task according to the technical specification and general engineering best practices.

1. Break the task into steps where possible.
2. Implement the required changes in the codebase.
3. Add and run relevant tests and linters.
4. Perform basic manual verification if applicable.
5. After completion, write a report to `c:\Users\david\Desktop\HariWeb\.zencoder\chats\d105c5f9-7f28-4e48-bae6-ab092b1d7694/report.md` describing:
   - What was implemented
   - How the solution was tested
   - The biggest issues or challenges encountered

---

### [x] Step: Pricing Section Redesign

Redesign the pricing card on index.html to:
- Remove any mention of "ads" or "spending on API costs" from feature bullets and intro text
- Visually improve the pricing card from a plain white card to a dark gradient card with teal glow accents
- Update text colors within the card to work on the dark background
- Commit and push changes
