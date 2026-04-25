# Plan: Optimize Hari Website for Cold Reddit Traffic (Serious Tagalog Immersion Learners)

## Context

**Target audience:** Cold traffic from Reddit (likely r/languagelearning, r/Tagalog, r/FilipinoAmerican, r/Philippines, r/AskReddit threads about heritage languages). These users are:
- **Skeptical** of marketing copy — they smell BS instantly and bounce
- **Serious** about learning — not casual gamified-app users (Duolingo fatigue is real on Reddit)
- **Research-oriented** — they know terms like "comprehensible input," "Krashen," "i+1," "immersion"
- **Heritage learners** — many are Fil-Ams reconnecting with Filipino culture, often with emotional weight (regret of not learning earlier, parents/grandparents who only spoke Tagalog)
- **Comparison shoppers** — they will mentally benchmark against Duolingo, Pimsleur, Rosetta Stone, Anki, italki, Language Reactor, Toucan, FluentU

**What stays:** Existing structure, sections, visuals, brand voice, color palette. We're optimizing copy, sharpening positioning, and adding credibility — not rebuilding.

**Files in scope:** `index.html` primarily. `styles.css` only if minor additions needed for new content. No JS changes expected.

**Out of scope:** Pricing changes, video/image regeneration, layout overhauls, new pages.

---

## Optimization Principles

1. **Lead with method credibility** — name-drop Krashen's Input Hypothesis / Comprehensible Input. Reddit learners respect this.
2. **Cut hype, add specifics** — replace soft adjectives ("comfortable," "gentle") with concrete claims where the audience needs proof.
3. **Speak to heritage emotion honestly** — the Fil-Am angle is the emotional differentiator; lean into it without being saccharine.
4. **Anticipate objections** — "Does this actually work?" "How long until I notice?" "What about Duolingo?" "Will I sound natural?"
5. **Lower friction at every CTA** — Reddit users install or bounce in seconds.

---

## Steps

- [x] **Step 1 — SEO + Hero optimization for cold Reddit intent**
  Update `<title>`, `<meta name="description">`, `<meta name="keywords">`, OG tags, and the hero section (`#scene-hero`) headline/subtext/note. Goal: in <5 seconds, a skeptical Reddit lurker understands (a) this is serious immersion-based Tagalog learning, (b) it works while they browse, (c) it's free + zero risk. Replace soft language with confident, specific copy. Keep Add-to-Chrome CTA prominent.

- [x] **Step 2 — Strengthen Philosophy section with research credibility**
  In `#scene-how` ("Our Philosophy"), explicitly reference Stephen Krashen's Input Hypothesis / Comprehensible Input ("i+1") by name in the intro, and tighten the three persona cards so each maps cleanly to a recognized SLA principle (Comprehensible Input, Spaced Exposure / incidental learning, Low Affective Filter / zero-friction immersion). Reddit language learners must instantly recognize this is methodologically serious, not another gamified flashcard app.

- [x] **Step 3 — Add "Why not Duolingo / Rosetta / Pimsleur" comparison**
  The existing `#scene-vs-pc` section compares Hari vs switching OS language, which is a weak straw man for Reddit users. Replace or augment it with a comparison addressing the apps Redditors will actually mentally benchmark against (Duolingo, Rosetta Stone, Pimsleur, Anki — none of which serve Tagalog well). Keep the existing visual/structural pattern of the vs comparison; only swap the content. Honest, specific, no trash-talking — explain the structural difference (study sessions vs ambient immersion).

- [x] **Step 4 — Sharpen heritage / Fil-Am cultural reconnection copy**
  In `#scene-culture` ("Made for Fil-Am lives"), tighten the emotional honesty: name the specific feelings (the family dinner you half-understood, the lola/lolo you wish you could talk to, the cousins in Manila you DM in English). Keep it grounded — not melodramatic. Also keep the "not Fil-Am? still works" inclusivity note. This is the emotional hook that differentiates Hari from generic language tools.

- [x] **Step 5 — Optimize FAQ for serious-learner objections**
  In `#scene-faq`, audit existing questions and add/replace 2–4 questions that serious Reddit learners actually ask: "How long until I notice progress?", "What proficiency level can immersion alone get me to?", "How is this different from Duolingo/Anki?", "Can I get to conversational fluency with just Hari?" Answer honestly — acknowledge limits (you'll still need speaking practice for output) while explaining the strong receptive-language gains immersion produces. Honesty builds Reddit trust.

- [x] **Step 6 — Optimize closing CTA + community proof**
  In `#scene-closing`, sharpen the final CTA copy for cold-traffic conversion (specific, low-friction, addresses the lingering "is this worth installing?" hesitation). Strengthen the Discord block as social proof — frame it as a community of serious heritage learners, not generic "join us." Keep all existing structure and visuals.

---

## Verification

After all steps complete:
- Visually scan `index.html` end-to-end to confirm tone is consistent, no duplicated claims, no broken markup.
- Spot-check that every CTA still points to `./go/chrome/` and tracking attributes are intact.
- Commit and push to `https://github.com/fusion20k/hariweb` on `main`.
