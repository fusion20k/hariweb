# Technical Specification - Reddit Pixel Redirect and Link Update

This specification details the implementation of a redirect page to capture Reddit pixel "View Chrome Store" events and the update of all Chrome Web Store links across the site.

## Technical Context
- **Language**: HTML5, JavaScript
- **Dependencies**: Google Tag Manager (GTM), Google Analytics 4 (GA4), Reddit Pixel

## Implementation Approach

### 1. Create Redirect Page
- **Path**: `go/chrome/index.html`
- **Purpose**: Load tracking scripts, fire a `PageVisit` event, and redirect to the Chrome Web Store.
- **Redirect Mechanism**:
    - **Meta Refresh**: `<meta http-equiv="refresh" content="1;url=...">` for fallback.
    - **JavaScript Redirect**: `window.location.href` after a 1000ms `setTimeout`.
- **Tracking Scripts**: Copy GTM, GA4, and Reddit Pixel scripts from `index.html`. Ensure the Reddit pixel fires `rdt('track', 'PageVisit')`.

### 2. Update Website Links
- **Target Link**: `https://chromewebstore.google.com/detail/hari-tagalog/mheinmngfhebgbbaceolefnpmfepidae?authuser=0&hl=en`
- **Replacement Link**: `./go/chrome/` (relative to root)
- **Files to Modify**:
    - `index.html`
    - `privacy.html`
    - `terms.html`
- **Attribute**: Ensure `target="_blank"` is preserved for these links.

## Source Code Structure Changes
- **New Directory**: `go/chrome/`
- **New File**: `go/chrome/index.html`

## Data Model / API / Interface Changes
None.

## Verification Approach
1. **Manual Link Check**: Click all updated links in `index.html`, `privacy.html`, and `terms.html` to ensure they point to `/go/chrome/`.
2. **Redirect Verification**: Load `/go/chrome/` and verify:
    - The page displays a "Redirecting..." message.
    - The redirect to the Chrome Web Store happens after ~1 second.
    - Inspect the network tab to confirm tracking scripts (GTM, GA4, Reddit) are loaded.
