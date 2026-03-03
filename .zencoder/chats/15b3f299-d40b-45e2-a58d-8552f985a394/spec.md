# Technical Specification: Privacy Policy and Terms of Service Pages

## Task Complexity: EASY
Straightforward implementation - creating standard legal pages with existing design patterns.

## Technical Context
- **Language**: HTML5, CSS3
- **Dependencies**: None (static pages using existing styles)
- **Current Architecture**: Single-page website (index.html)
- **Target Files**: Create privacy.html, terms.html; modify index.html footer

## Feature Overview

Create two separate legal documentation pages for the Hari website:
1. **Privacy Policy Page** - Explains data collection, usage, and user rights
2. **Terms of Service Page** - Outlines usage terms, user responsibilities, and legal agreements

Both pages should:
- Match existing website design and branding
- Be responsive (mobile, tablet, desktop)
- Include proper navigation back to main site
- Be linked from the footer
- Follow web accessibility standards

## Implementation Approach

### 1. Content Structure

#### Privacy Policy (privacy.html)
Key sections to include:
- Introduction
- Information We Collect
- How We Use Your Information
- Translation API Usage
- Data Storage and Security
- Cookies and Tracking
- Third-Party Services (Google Translate API, etc.)
- Your Rights (GDPR compliance if applicable)
- Contact Information
- Last Updated Date

#### Terms of Service (terms.html)
Key sections to include:
- Acceptance of Terms
- Description of Service
- User Responsibilities
- Subscription and Payment Terms ($20/month)
- Cancellation and Refunds
- Intellectual Property Rights
- Limitation of Liability
- Disclaimer of Warranties
- Changes to Terms
- Governing Law
- Contact Information
- Last Updated Date

### 2. Page Design

Both pages will share the same layout:
- **Header**: Same navigation as main site (logo, links)
- **Content Area**: 
  - Centered max-width container (800px)
  - Clean typography with proper hierarchy
  - White/light background for readability
  - Table of contents (jump links) for easy navigation
- **Footer**: Same footer as main site with legal links

### 3. HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Same meta tags as index.html -->
    <title>Privacy Policy - Hari</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <!-- Same navigation as index.html -->
    </header>
    
    <main class="legal-page">
        <div class="legal-container">
            <h1>Privacy Policy</h1>
            <p class="last-updated">Last Updated: February 7, 2026</p>
            
            <nav class="legal-toc">
                <!-- Table of contents with jump links -->
            </nav>
            
            <section id="introduction">
                <h2>1. Introduction</h2>
                <p>Content...</p>
            </section>
            
            <!-- More sections... -->
        </div>
    </main>
    
    <footer>
        <!-- Same footer as index.html -->
    </footer>
</body>
</html>
```

### 4. CSS Styling

Add new styles to `styles.css`:
- `.legal-page` - Main container styling
- `.legal-container` - Content wrapper (max-width, padding)
- `.legal-toc` - Table of contents styling
- Section typography (h1, h2, h3, p spacing)
- Responsive breakpoints for mobile
- Link styling within content

### 5. Footer Updates

Modify `index.html`, `privacy.html`, and `terms.html` footers to include:
```html
<div class="footer-section">
    <h3>Legal</h3>
    <a href="privacy.html">Privacy Policy</a>
    <a href="terms.html">Terms of Service</a>
</div>
```

## Source Code Structure Changes

### Files to Create:
1. **privacy.html** - Privacy Policy page
2. **terms.html** - Terms of Service page

### Files to Modify:
1. **index.html** - Add legal links to footer
2. **styles.css** - Add legal page styles (~50-100 lines)

### Files Not Modified:
- script.js (no JavaScript needed for static pages)

## Content Considerations

### Important Legal Points for Hari:
- Chrome extension that translates web content
- Collects browsing data (URLs) to provide translation
- Uses third-party translation APIs
- $20/month subscription model
- Payment processing (needs to mention payment provider)
- User data retention policies
- GDPR/CCPA compliance (if targeting EU/California users)
- Age restrictions (13+ for Chrome Web Store)

### Disclaimers Needed:
- Translation accuracy disclaimer
- No guarantee of service uptime
- Right to modify or terminate service
- API cost changes may affect pricing
- Not responsible for third-party website content

## Verification Approach

### Manual Verification:
1. **Visual Check**:
   - Open privacy.html and terms.html in browser
   - Verify header and footer match main site
   - Check typography and spacing
   - Verify all jump links work
   - Test back navigation to main site

2. **Content Check**:
   - All required sections present
   - Contact information accurate
   - Dates are current
   - No placeholder text remains

3. **Responsive Testing**:
   - Test on desktop (1920px, 1440px, 1024px)
   - Test on tablet (768px)
   - Test on mobile (375px, 414px)
   - Verify readability at all sizes

4. **Link Testing**:
   - Footer links work from all pages
   - Jump links within pages work
   - Back to homepage works

5. **Accessibility**:
   - Proper heading hierarchy (h1 → h2 → h3)
   - Sufficient color contrast
   - Links are distinguishable
   - Semantic HTML structure

### Automated Testing:
- No automated tests needed for static content
- Browser DevTools for responsive testing

## Implementation Order

1. **Create HTML structure** for privacy.html
2. **Create HTML structure** for terms.html
3. **Add CSS styles** for legal pages to styles.css
4. **Write Privacy Policy content**
5. **Write Terms of Service content**
6. **Update footer** in all three pages (index.html, privacy.html, terms.html)
7. **Test all links and navigation**
8. **Verify responsive design**
9. **Review content for accuracy and completeness**

## Questions for User (Before Implementation)

Before I proceed with implementation, I need some clarifications:

1. **Company/Service Information**:
   - What is the official company name behind Hari?
   - Physical address for legal correspondence?
   - Is there a registered business entity?

2. **Data Collection Details**:
   - What specific data does the extension collect?
   - Do you store user browsing history?
   - Which translation API are you using? (Google Translate, DeepL, custom?)
   - Are there any analytics tools? (Google Analytics, etc.)

3. **Payment Processing**:
   - Which payment processor? (Stripe, PayPal, etc.)
   - Refund policy details?
   - Are there any free trial periods?

4. **Geographic Scope**:
   - Are you targeting EU users? (GDPR compliance needed)
   - California users? (CCPA compliance needed)
   - Any age restrictions?

5. **Content Tone**:
   - Should these be formal legal documents or more user-friendly?
   - Do you want a lawyer to review these, or are standard templates acceptable?

6. **Contact Information**:
   - Legal contact email address?
   - Support contact (already have: support@haritagalog.com)

## Risk Considerations

- **Legal Compliance**: Privacy policies and terms of service are legal documents. Consider having them reviewed by a lawyer, especially if handling EU/California users' data
- **Accuracy**: Information must be accurate and up-to-date
- **Completeness**: Missing required disclosures could cause legal issues
- **Updates**: These documents should be reviewed and updated regularly as service changes

## Recommendation

I can create standard, user-friendly versions of these documents based on common practices for Chrome extensions and SaaS products. However, I strongly recommend having them reviewed by a legal professional before making them live, especially regarding:
- GDPR compliance (if serving EU users)
- CCPA compliance (if serving California users)
- Payment processing terms
- Data retention policies
