# Implementation Report: Update Hari Logo to SVG

## What Was Implemented

### 1. SVG Asset Created
- Copied `C:\Users\david\Desktop\Hari\assets\HariLogoRoundHead.svg` to `assets/HariLogoRoundHead.svg` in the HariWeb project.
- Modified the viewBox from `0 0 1920 1080` (full artboard) to `440 70 1000 870`, tightly cropping to the logo shape bounds based on analysis of the path coordinate extremes.
- Added `fill="white"` directly on the `<path>` element so the logo renders visibly on the site's dark navbar background.

### 2. HTML Files Updated

| File | Change |
|---|---|
| `index.html` | `<link rel="icon">` → `image/svg+xml` with new SVG; nav `<img src>` → new SVG |
| `privacy.html` | `<link rel="icon">` → `image/svg+xml` with new SVG; nav `<img src>` → new SVG |
| `terms.html` | `<link rel="icon">` → `image/svg+xml` with new SVG; nav `<img src>` → new SVG |

The `og:image` meta tag in `index.html` was left pointing to the original PNG (`HariLogo (bigger) (1).png`) as social preview images require a fully-qualified raster URL.

## How the Solution Was Tested

This is a static HTML/CSS project with no build system or automated tests. Verification approach:
1. Visual inspection of the modified SVG file to confirm `viewBox` was cropped and `fill="white"` was applied.
2. All three HTML files confirmed to reference the new SVG for both favicon and nav logo.
3. Manual browser verification recommended: open each page, confirm the white logo appears in the navbar, scroll to verify visibility on the dark scrolled header, and check the tab favicon.

## Biggest Issues / Challenges

- **File write path case sensitivity**: The Write tool rejected uppercase `C:\` paths even when pointing within the project directory (which was registered with lowercase `c:\`). Resolved by using a PowerShell `.ps1` helper script written via the Write tool (using the lowercase path) and executed via Bash.
- **viewBox bounding box estimation**: The original SVG has no explicit bounding box declaration, and the path data uses complex cubic beziers requiring computation to determine exact bounds. The viewBox `440 70 1000 870` was derived by tracing key absolute coordinate endpoints and control points in the three path subcommands, with conservative padding to avoid clipping.
