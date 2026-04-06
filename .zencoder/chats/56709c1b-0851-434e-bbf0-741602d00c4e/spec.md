# Technical Specification: Replace Lara API References with Azure Equivalents

## Difficulty Assessment

**Easy** — All "Lara API" references are purely textual mentions in two static HTML legal/policy pages. There is no actual API integration code, no environment variables, no config files, and no backend calls to update in this repository. The website is a plain HTML/CSS/JS marketing and policy site.

---

## Technical Context

- **Language / Stack:** Plain HTML (no build toolchain, no framework)
- **Files affected:** `privacy.html`, `terms.html`
- **No code changes required** to `script.js`, `styles.css`, or `index.html`

---

## All Occurrences of "Lara API" (8 total)

### `terms.html`

| Line | Context |
|------|---------|
| 157  | `"including Stripe, Supabase, Lara API, and browser platforms."` |

### `privacy.html`

| Line | Context |
|------|---------|
| 124  | Table cell: `"Our backend server ... and Lara API (translation processing)."` |
| 184  | Paragraph: `"transmitted to our backend server and to Lara API solely to generate Tagalog translations."` |
| 206  | Paragraph: `"transmitted to our backend and to Lara API solely to produce Tagalog translations."` |
| 280  | Section heading: `<h3>c. Lara API</h3>` |
| 284  | Two mentions in one paragraph: `"Lara API is contractually prohibited..."` and `"not retained by Lara after the translation response is delivered."` |
| 308  | Paragraph: `"uses the Lara API to generate Tagalog translations."` |
| 403  | Paragraph: `"communicates with the Lara API."` |

---

## Implementation Approach

1. In **`terms.html` line 157**, replace `Lara API` → `[Azure service name]`.
2. In **`privacy.html` lines 124, 184, 206, 308, 403**, replace `Lara API` → `[Azure service name]`.
3. In **`privacy.html` line 280**, replace section heading `c. Lara API` → `c. [Azure service name]`.
4. In **`privacy.html` line 284**, replace both:
   - `Lara API is contractually prohibited...` → `[Azure service name] is contractually prohibited...`
   - `not retained by Lara after the translation response is delivered` → `not retained by [Azure / Microsoft] after the translation response is delivered`

All changes are simple string replacements — no structural HTML changes needed.

---

## Data Model / API / Interface Changes

None. This repository contains no backend integration code. The actual API switch lives in the backend server (haribackend-mitj.onrender.com), which is a separate codebase.

---

## Source Code Structure Changes

| File | Change Type |
|------|-------------|
| `privacy.html` | Text replacement (7 occurrences) |
| `terms.html` | Text replacement (1 occurrence) |

---

## Verification Approach

1. Search for `lara` (case-insensitive) across the repository after changes — expect zero results.
2. Visually review the updated Section 7c ("Data Sharing") in `privacy.html` to confirm the Azure service description reads correctly.
3. Visually review `terms.html` Section 8 to confirm the third-party list reads correctly.

No build step or test runner required.

---

## Open Questions (requires user input before implementation)

See main response.
