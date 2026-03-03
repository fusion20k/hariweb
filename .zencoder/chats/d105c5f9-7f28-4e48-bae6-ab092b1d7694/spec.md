# Technical Specification: Google Analytics Integration

## Task Complexity
**Difficulty: Easy**

Straightforward implementation requiring adding a Google Analytics tracking code snippet to all HTML pages.

## Technical Context
- **Language**: HTML
- **Dependencies**: Google Analytics (gtag.js)
- **Files Affected**: 
  - index.html
  - terms.html
  - privacy.html

## Implementation Approach
Add the Google Analytics tracking code immediately after the `<head>` element in all HTML pages as per Google's instructions. The tracking code includes:
- Async script load for gtag.js
- DataLayer initialization
- Configuration with tracking ID: G-PDGY8VP5SH

## Source Code Structure Changes
**Modified Files:**
- `index.html` - Add GA code after line 3 (after `<head>`)
- `terms.html` - Add GA code after opening `<head>` tag
- `privacy.html` - Add GA code after opening `<head>` tag

**Code to Add:**
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-PDGY8VP5SH"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-PDGY8VP5SH');
</script>
```

## Data Model / API / Interface Changes
None - this is a client-side tracking implementation only.

## Verification Approach
1. Visually inspect each HTML file to confirm GA code is present after `<head>` element
2. Test the website locally or on production to ensure pages load correctly
3. Use Google Tag Assistant or browser DevTools to verify gtag.js loads properly
4. Commit and push changes to GitHub repository
