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

**Difficulty**: Medium

Technical specification created at `spec.md`:
- Plain HTML/CSS/JS stack
- Conversion-focused copy updates across all sections
- UI layout improvements following SaaS best practices
- New sections: How It Works (3-step), Pricing, FAQ
- Responsive behavior enhancements

---

### [x] Phase 1: Core Copy & Structure Updates

#### [x] Task 1.1: Update Hero Section
- Add eyebrow text "Chrome Extension for Tagalog Learners"
- Update headline to "Learn Tagalog Faster While You Browse"
- Update subheadline with new messaging
- Update CTA buttons text
- Add reassurance line about pricing

#### [x] Task 1.2: Update Navbar
- Add "Pricing" link to navigation

#### [x] Task 1.3: Update "See It In Action" Section
- Change heading to "See Hari on a Real Page"
- Update subcopy
- Add note under After card

#### [x] Task 1.4: Update "Powered by YOU" Section
- Change heading to "Hari Gets Smarter With Every Reader"
- Replace copy with community-focused messaging

#### [x] Task 1.5: Update "Learn Your Way" Section
- Change heading to "Choose Your Immersion Level"
- Update copy about slider functionality

---

### [x] Phase 2: Add New Sections

#### [x] Task 2.1: Add "How It Works" Section
- Create 3-step process section
- Add step structure (numbered circles + text)
- Add content: Install, Visit any website, Hari translates

#### [x] Task 2.2: Add Pricing Section
- Create centered pricing card
- Add plan name, price ($20/month), bullets
- Add reassurance text below card
- Add CTA button

#### [x] Task 2.3: Add FAQ Section
- Create FAQ layout (constrained width)
- Add 4 questions with answers:
  - Why isn't Hari free?
  - Can I try before paying?
  - Can I cancel anytime?
  - Which sites does it work on?

---

### [x] Phase 3: CSS/Layout Improvements

#### [x] Task 3.1: Implement Container & Spacing System
- Add max-width containers (1140-1200px)
- Standardize section spacing (5rem between sections)
- Update heading-to-content spacing (3rem)

#### [x] Task 3.2: Update Hero Layout
- Add eyebrow text styling (uppercase, gold, letter-spacing)
- Add reassurance text styling
- Ensure mobile responsive stacking

#### [x] Task 3.3: Style New Sections
- Style 3-step How It Works (grid layout, numbered circles)
- Style pricing card with border, shadow/emphasis
- Style FAQ blocks (clean, readable, hover effect)
- Add bullet list styling with checkmarks for pricing features

#### [x] Task 3.4: Enhance CTA Interactions
- Add hover state color changes
- Add shadow transitions
- Add active/click animations

#### [x] Task 3.5: Update Footer
- Add Pricing to Quick Links
- Support email already correct (support@haritagalog.com)

---

### [x] Phase 4: Testing & Verification

#### [x] Task 4.1: Code Validation
- All HTML sections properly structured
- CSS classes properly defined
- No syntax errors

#### [x] Task 4.2: Responsive Design Check
- Mobile responsive styles added (480px breakpoint)
- Tablet responsive styles exist (768px breakpoint)
- Full-width CTAs on mobile (min-height 44px)

#### [x] Task 4.3: Navigation Verification
- All navigation links present (#features, #how-it-works, #pricing)
- Smooth scroll enabled in script.js
- Mobile menu toggle functional

#### [x] Task 4.4: Final Review
- All new sections added successfully
- All copy updated per requirements
- CSS styling complete
- Ready for user testing

---

### [x] Phase 5: Finalize & Deploy

#### [x] Task 5.1: Final Review
- Compared implementation against spec.md
- Verified all copy matches conversion-focused requirements
- Confirmed all new sections and updates present

#### [x] Task 5.2: Git Commit & Push
- Staged index.html and styles.css changes
- Committed with message: "Landing-page-redesign-with-conversion-copy"
- Successfully pushed to https://github.com/fusion20k/hariweb (commit d773ea4)

#### [x] Task 5.3: Write Report
- Comprehensive report written to report.md
- Documented all implementations across 5 phases
- Noted testing approach and challenges encountered
- Included recommendations for future iterations

---

### [x] Phase 6: Fix Formatting Issues

#### [x] Task 6.1: Fix How It Works Steps Spacing
- Increased step number size to 70px with larger font
- Added 2rem margin below step numbers
- Increased heading margin to 1.25rem
- Set paragraph line-height to 1.8 with larger font (1.05rem)
- Added padding to step containers
- Enhanced steps note with background, border, and better spacing

#### [x] Task 6.2: Fix Pricing Section Formatting
- Increased pricing intro line-height to 2 and margins
- Enlarged pricing card padding (3.5rem 2.5rem)
- Increased plan name size and margin (1.65rem, 1.5rem margin)
- Enlarged price display (3.5rem) with better spacing
- Added 1.25rem padding to feature list items with separators
- Added border-bottom between features for clarity
- Made CTA button full-width with proper margins
- Improved reassurance text spacing and size

#### [x] Task 6.3: Fix FAQ Section Formatting
- Increased FAQ item padding to 2.5rem
- Enlarged question font size to 1.35rem with 1.5rem margin
- Increased answer line-height to 1.9 with 1.05rem font
- Added 2rem margin between FAQ items
- Improved border-radius to 12px for softer look

#### [x] Task 6.4: General Text Formatting
- Increased section title size to 2.75rem with better margins
- Improved section subtitle line-height to 1.8
- Enhanced features text line-height to 2
- Improved how-text line-height to 2
- Consistent spacing and readability across all sections

#### [x] Task 6.5: Deploy Formatting Fixes
- Committed changes to git
- Pushed to GitHub (commit 3439b90)
- All formatting improvements now live

---

### [x] Phase 7: Add Subtle Dot Pattern Background

#### [x] Task 7.1: Design Dot Pattern
- Created CSS radial-gradient dot pattern
- Used rgba(255, 255, 255, 0.025) for subtle visibility on dark theme
- 1px circle dots with 30px spacing
- Pattern complements existing dark aesthetic

#### [x] Task 7.2: Apply Pattern to Sections
- Added dot pattern to: example-section, features, how-it-works, how-it-works-steps, pricing-section, faq-section
- Maintained dark theme aesthetic
- Readability fully preserved
- Professional, subtle texture added

#### [x] Task 7.3: Test and Refine
- Pattern works consistently across all sections
- 30px spacing provides good visual balance
- Opacity at 0.025 ensures subtlety
- Professional appearance achieved

#### [x] Task 7.4: Deploy Background Updates
- Committed changes to git
- Pushed to GitHub (commit f265d53)
- Dot pattern background now live on all sections

---

### [ ] Phase 8: Lighten Background Colors for Better Dot Visibility

#### [ ] Task 8.1: Update Color Variables
- Change --dark from #0a0f14 to lighter gray-blue
- Change --dark-secondary to complementary lighter shade
- Ensure proper contrast for text readability
- Avoid navy tones per user request

#### [ ] Task 8.2: Test Dot Pattern Visibility
- Verify dots are more visible with new background
- Ensure text contrast remains good
- Check all sections for visual consistency

#### [ ] Task 8.3: Deploy Background Color Updates
- Commit changes
- Push to GitHub
