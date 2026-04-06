# Implementation Report: Replace Lara API References with Microsoft Azure

## What Was Implemented

All 8 textual references to "Lara API" / "Lara" were replaced across two static HTML files:

### `terms.html` (1 change)
- **Line 157** — Third-Party Services section: `Lara API` → `Microsoft Azure`

### `privacy.html` (7 changes)
- **Line 124** — Chrome Web Store disclosure table (Who It Is Shared With): `Lara API (translation processing)` → `Microsoft Azure (translation processing)`
- **Line 184** — Section 3c (Web Browsing Activity Data): `to Lara API solely to generate Tagalog translations` → `to Microsoft Azure solely to generate Tagalog translations`
- **Line 206** — Section 4 (How We Handle Your Data): `to Lara API solely to produce Tagalog translations` → `to Microsoft Azure solely to produce Tagalog translations`
- **Line 280** — Section 7 heading: `c. Lara API` → `c. Microsoft Azure`
- **Line 284** — Section 7c restriction clause:
  - `Lara API is contractually prohibited from retaining, using, or sharing this data...` → `Microsoft Azure is bound by Microsoft's Data Processing Agreement, which prohibits using this data...`
  - `not retained by Lara after the translation response is delivered` → `not retained by Microsoft after the translation response is delivered`
- **Line 308** — Section 9 (Translation Data): `uses the Lara API to generate Tagalog translations` → `uses Microsoft Azure to generate Tagalog translations`
- **Line 403** — Section 16e (Host Permissions): `communicates with the Lara API` → `communicates with Microsoft Azure`

### Contractual language update
The Section 7c restriction clause was updated from generic "contractually prohibited" language to reference **Microsoft's Data Processing Agreement** specifically, per user instruction.

## How the Solution Was Tested

- Ran a case-insensitive `ripgrep` search for `lara` across all `.html` files in the repository — **zero results** confirmed no remaining references.
- Visually reviewed all edited passages in context to confirm grammatical correctness and legal coherence.

## Challenges Encountered

None. All changes were straightforward string replacements in static HTML. The most nuanced edit was the Section 7c restriction clause, which required rewriting the sentence structure (from "Lara API is contractually prohibited..." to "Microsoft Azure is bound by Microsoft's Data Processing Agreement...") to produce legally appropriate language per the user's instructions.
