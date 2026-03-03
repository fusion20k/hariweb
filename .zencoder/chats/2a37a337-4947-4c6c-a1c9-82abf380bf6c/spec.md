# Technical Specification: Hari Landing Page Reframe

## Complexity: Medium

## Technical Context
- **Stack**: Static HTML/CSS/JS landing page
- **Files**: `index.html`, `styles.css`, `script.js`
- **Assets**: Logo PNG, Philippines background photo
- **No build step** – changes deploy directly

## Goal
Reframe Hari from "generic Tagalog immersion tool" to "the easiest way for burned-out Filipino Americans to finally see Tagalog every day." Every section must speak directly to Fil-Ams who grew up speaking English and feel guilt/disconnect around family Tagalog.

## Implementation Approach

### Files Modified
1. `index.html` – All copy changes (snippets provided to user per rule)
2. `styles.css` – Hero bullet list styles, minor visual tweaks
3. `script.js` – No changes needed

### Section-by-Section Changes

#### Meta / Head
- Title: "Hari – See Tagalog Every Day While You Browse"
- Description: "Filipino American who never learned Tagalog? Hari slips Tagalog into the browsing you already do, so you reconnect with the language without adding study time."
- Keywords: add "Filipino American, heritage language, Fil-Am, Tagalog for beginners"

#### Hero
- Eyebrow: "For Filipino Americans who grew up speaking English"
- H1: "Filipino American but never learned Tagalog?"
- Subheadline: "Hari slips Tagalog into the browsing you already do, so you reconnect with the language without adding more 'study' to your day."
- 3 bullet points:
  - "See Tagalog on Twitter, Facebook, and news sites you already use."
  - "Start small so you don't get overwhelmed or burned out."
  - "Made for Fil-Ams who grew up in English and want to understand family Tagalog."
- Primary button: "Add Hari to Chrome"
- Remove reassurance text about $20/month (move price context to pricing section)
- Caption below visual: "Tagalog layered on top of your usual sites."

#### Example Section
- Title: "Tagalog, layered on top of what you already read"
- Subtitle: "Hari quietly patches Tagalog onto the sites you already scroll through. No new app. No separate study session."
- Before panel: styled to look like a Twitter/Facebook feed post
- After panel: same post with Tagalog words highlighted/injected inline
- Label: "After – With Hari" note: "This is what Twitter looks like with Hari on."

#### Features Section
- Title: "Built for the Fil-Am who always meant to learn"
- Copy: speaks to guilt, family connection, not another app/class

#### How It Works (slider section)
- Title: "You control how much Tagalog you see"
- Tone: low-pressure, start-small

#### Steps Section
- Title: "Three steps to see Tagalog today"
- Steps keep the same structure, reworded for Fil-Am context

#### Pricing
- Keep $20/month
- Add context: "Less than one Filipino restaurant meal — and you'll actually understand what your lola is saying."

#### FAQ
- Update Q1: why not free – keep same answer
- Update Q2: cancel anytime – keep
- Update Q3: which sites – keep
- Add Q4: "Do I need to already know some Tagalog?" – "No. Hari is built for people starting from zero. You'll pick up words naturally over time."
- Add Q5: "I've tried apps before and burned out. Is this different?" – copy speaks to passive vs active learning

#### CTA Section
- H2: "Stop feeling like a stranger to your own family's language."
- Body: "Hari doesn't add study time. It just turns your normal browsing into slow, steady Tagalog exposure."
- Button: "Add Hari to Chrome – $20/month"

#### Footer
- Tagline: "Helping Filipino Americans reconnect with Tagalog, one page at a time."

## Verification
- Visual check in browser (open index.html locally)
- Confirm all anchor links still work
- Confirm mobile responsiveness unchanged
- Confirm CTA buttons link to correct Chrome Web Store URL
