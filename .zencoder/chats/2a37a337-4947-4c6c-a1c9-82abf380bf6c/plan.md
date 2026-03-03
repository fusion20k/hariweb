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

Complexity: **medium** — content reframe across all sections, new bullet list UI, no architectural changes.

Spec saved to `spec.md`.

---

### [x] Step: Implementation

#### [x] Phase 1 – Hero + Meta tags
- [x] Update `<title>`, `<meta description>`, `<meta keywords>`, `<og:title>`, `<og:description>`
- [x] New eyebrow text
- [x] New H1: "Filipino American but never learned Tagalog?"
- [x] New subheadline
- [x] Add 3-bullet list to hero
- [x] Update primary button to "Add Hari to Chrome"
- [x] Remove reassurance text (move price to pricing)
- [x] Add bullet list styles to `styles.css`

#### [x] Phase 2 – Example Section
- [x] New title + subtitle
- [x] Restyle before/after to look like a social feed post
- [x] Update after-panel note
- [x] Add feed + highlight word styles to `styles.css`

#### [x] Phase 3 – Features, How It Works, Steps
- [x] Features: new title + Fil-Am focused copy
- [x] How It Works slider section: reword for low-pressure tone
- [x] Steps: reword for Fil-Am context, new section title

#### [x] Phase 4 – Pricing, FAQ, CTA, Footer
- [x] Pricing: add family/culture hook sentence + 4th feature bullet
- [x] FAQ: add 2 new questions (zero knowledge, burned out before), reorder for Fil-Am priority
- [x] CTA: new headline + body copy + button text
- [x] Footer tagline update

#### [x] Phase 5 – Commit & Push
- [x] Removed all ad mentions from index.html
- [x] git add, commit, push to https://github.com/fusion20k/hariweb (commit 583c8ed)
