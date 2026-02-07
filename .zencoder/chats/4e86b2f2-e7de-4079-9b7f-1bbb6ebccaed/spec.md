# Technical Specification: Landing Page Redesign

## Difficulty Assessment
**Medium** - Requires significant HTML restructuring, CSS updates, and copy changes across multiple sections while maintaining existing functionality.

## Technical Context
- **Stack**: Plain HTML, CSS, JavaScript
- **Current State**: Single-page landing site with hero, example, features, how-it-works, CTA, and footer sections
- **Dependencies**: Google Fonts (Inter), local assets
- **Browser Target**: Modern browsers with Chrome extension focus

## Implementation Approach

### 1. Copy Updates (index.html)
Update all text content to match conversion-focused copy from the provided guidelines:

- **Hero Section**
  - Headline: "Learn Tagalog Faster While You Browse"
  - Subheadline: New messaging about automatic translation
  - Add eyebrow text: "Chrome Extension for Tagalog Learners"
  - Update CTAs: "Add Hari to Chrome – Free to install" and "See Hari in Action"
  - New reassurance line: "Free to install. Full immersion for $20/month to cover translation API costs. Cancel anytime."

- **Example Section ("See It In Action")**
  - Update heading to "See Hari on a Real Page"
  - Update subcopy with new messaging
  - Add note under After card about favorite news sites

- **Features Section ("Powered by YOU")**
  - Update heading to "Hari Gets Smarter With Every Reader"
  - Replace copy with community-focused messaging

- **How It Works Section ("Learn Your Way")**
  - Update heading to "Choose Your Immersion Level"
  - Update copy about slider and immersion levels

- **New Sections to Add**
  - "How It Works" (3-step process)
  - "Pricing" section with single card layout
  - FAQ section with 4 key questions

- **Navigation**
  - Add "Pricing" link to navbar

### 2. UI Layout Updates (styles.css)

Based on best practices guidelines:

- **Container & Spacing**
  - Implement max-width 1140-1200px container
  - 80-100px between major sections
  - 32-40px between section heading and content

- **Hero Layout**
  - Convert to two-column layout on desktop (text left 50-55%, image right 45-50%)
  - Add eyebrow text styling
  - Ensure full-width on mobile with proper stacking

- **Example Section**
  - Keep two-card grid
  - Add note text under After card
  - Improve card borders/shadows

- **Powered by YOU & Learn Your Way**
  - Implement alternating image/text sections
  - Add placeholder for images (chart graphic, slider UI screenshot)
  - Add 3-bullet list styling

- **How It Works (new)**
  - 3-step horizontal layout on desktop
  - Icon placeholders above text
  - Stack vertically on mobile

- **Pricing Section (new)**
  - Single centered card with larger shadow
  - Contains: plan name, price, 3-5 bullets, CTA button
  - Reassurance text below card

- **FAQ Section (new)**
  - Simple stacked Q&A blocks
  - Constrain to 700-800px width, centered

- **Footer Updates**
  - Ensure 3-column layout (brand, links including pricing, support)
  - Update email to support@haritagalog.com

- **CTA Interactions**
  - Add hover state changes (color/shadow)
  - Subtle click animations

### 3. Responsive Behavior
- Hero: single column on mobile
- Before/After cards: stack on mobile
- How It Works steps: stack on mobile
- Footer: stack on mobile
- All CTAs: full-width on mobile (44px+ height)

## Source Code Structure Changes

### Files to Modify
1. `index.html` - Restructure sections, update all copy
2. `styles.css` - Add new section styles, update layout patterns, improve spacing
3. `script.js` - No changes needed (existing smooth scroll and menu toggle work)

### Files to Create
None - all changes within existing files

## Data Model / API / Interface Changes
None - purely frontend presentation updates

## Verification Approach

### Manual Verification
1. Visual inspection at desktop (1920px, 1440px, 1200px)
2. Visual inspection at tablet (768px)
3. Visual inspection at mobile (375px, 414px)
4. Test all navigation links (including new #pricing)
5. Test CTA hover states
6. Test mobile menu toggle
7. Verify smooth scroll behavior

### Automated Testing
- No test framework present in codebase
- Will rely on manual verification and browser DevTools

### Browser Testing
- Chrome (primary target for extension users)
- Firefox, Safari (secondary)

## Implementation Notes
- User requested code snippets for index.html due to file truncation issues when using Edit tool
- Will provide exact insertion points for HTML changes
- Can directly edit styles.css and script.js
