# Technical Specification: Content Update for Hari Website

## Difficulty Assessment
**easy** - This is a straightforward content update requiring modification of existing HTML sections without architectural changes.

## Technical Context
- **Language**: HTML5
- **Dependencies**: None (static HTML page)
- **Files Affected**: `index.html`

## Implementation Approach

### Sections to Remove
1. **Features Section** (lines 84-90): Remove the "You already spend hours online every day" content
2. **How It Works Section** (lines 92-97): Remove the "Install it. Browse normally. Learn Tagalog" content

### Sections to Add
1. **"Hari is Powered by YOU" Section**: 
   - Explain the community-driven translation system
   - Highlight how user contributions improve the system
   - Emphasize that more users = faster and smarter translations
   
2. **"Customize Your Learning" Section**:
   - Explain the Taglish option for beginners
   - Explain the fully Tagalog option for advanced learners
   - Highlight the flexibility of adjustment between modes

### Design Consistency
- Maintain existing CSS classes (`section-title`, `section-subtitle`, etc.)
- Keep the same visual structure and spacing
- Use similar tone and messaging style as existing content

## Source Code Structure Changes
- **Modified Files**: `index.html` (lines 84-97 will be replaced)
- **Created Files**: None
- **Deleted Files**: None

## Data Model / API / Interface Changes
None - This is a pure content update.

## Verification Approach
1. Visual inspection of the updated page in browser
2. Verify sections are properly styled using existing CSS
3. Ensure responsive design still works
4. Commit and push to GitHub repository

## Implementation Steps
1. Remove the two specified sections from `index.html`
2. Add new "Hari is Powered by YOU" section with appropriate content
3. Add new "Customize Your Learning" section with Taglish/Tagalog information
4. Test locally to ensure proper rendering
5. Commit changes with descriptive message
6. Push to GitHub repository
