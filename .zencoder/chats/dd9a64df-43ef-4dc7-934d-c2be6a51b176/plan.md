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

Assess the task's difficulty, as underestimating it leads to poor outcomes.

- easy: Straightforward implementation, trivial bug fix or feature
- medium: Moderate complexity, some edge cases or caveats to consider
- hard: Complex logic, many caveats, architectural considerations, or high-risk changes

Create a technical specification for the task that is appropriate for the complexity level:

- Review the existing codebase architecture and identify reusable components.
- Define the implementation approach based on established patterns in the project.
- Identify all source code files that will be created or modified.
- Define any necessary data model, API, or interface changes.
- Describe verification steps using the project's test and lint commands.

Save the output to `c:\Users\david\Desktop\HariWeb\.zencoder\chats\dd9a64df-43ef-4dc7-934d-c2be6a51b176/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach
- Source code structure changes
- Data model / API / interface changes
- Verification approach

If the task is complex enough, create a detailed implementation plan based on `c:\Users\david\Desktop\HariWeb\.zencoder\chats\dd9a64df-43ef-4dc7-934d-c2be6a51b176/spec.md`:

- Break down the work into concrete tasks (incrementable, testable milestones)
- Each task should reference relevant contracts and include verification steps
- Replace the Implementation step below with the planned tasks

Rule of thumb for step size: each step should represent a coherent unit of work (e.g., implement a component, add an API endpoint, write tests for a module). Avoid steps that are too granular (single function).

Save to `c:\Users\david\Desktop\HariWeb\.zencoder\chats\dd9a64df-43ef-4dc7-934d-c2be6a51b176/plan.md`. If the feature is trivial and doesn't warrant this breakdown, keep the Implementation step below as is.

**Stop here.** Present the specification (and plan, if created) to the user and wait for their confirmation before proceeding.

---

### [x] Step 1: Minimal Top Nav Redesign (index.html + styles.css)

Rebuild the `<header>` to match the reference's minimal bar: logo icon + "Hari" wordmark on the left, "Add to Chrome" pill button on the right, hamburger for mobile. Remove the desktop nav link list from the header (those links move to the bottom tab nav).

**Files:** `index.html`, `styles.css`

**Changes:**
- `index.html`: Remove `<ul class="nav-links">` from desktop view (keep the full mobile menu overlay — just hide it from the header flex row on ≥1024px). Add the hamburger toggle back as the sole mobile control.
- `styles.css`: Rewrite `.nav-container` to `justify-content: space-between`; logo left, single `.btn--nav-cta` right; hide `.nav-links` on desktop; preserve mobile menu overlay styles.

**Verify:** Header renders with just logo + CTA on desktop; hamburger appears on mobile; clicking CTA links to `./go/chrome/`.

---

### [x] Step 2: Hero Section HTML Restructure (index.html)

Replace the current hero internals (background image, hero-content div, hero-headline, hero-subtext, hero-actions) with the new editorial grid structure.

**Files:** `index.html`

**New hero internal structure:**
```html
<section class="scene scene--hero" id="scene-hero">
  <div class="hero-grid">
    <div class="hero-col hero-col--letter">
      <div class="hero-letter" aria-hidden="true">H</div>
    </div>
    <div class="hero-col hero-col--eagle">
      <div class="hero-eagle-wrap">
        <img src="./assets/haribon-eagle.png" alt="Philippine Eagle — Haribon" class="hero-eagle-img">
        <div class="hero-counter" aria-hidden="true">
          <button class="hero-counter-arrow" data-counter-prev>&#8592;</button>
          <span class="hero-counter-num">01</span>
          <button class="hero-counter-arrow" data-counter-next>&#8594;</button>
        </div>
      </div>
    </div>
  </div>
  <div class="hero-bottom">
    <div class="hero-bottom-label">
      <span class="hero-eagle-name">LEARN TAGALOG</span>
      <span class="hero-eagle-sci">While You Browse</span>
    </div>
    <a href="./go/chrome/" class="btn btn--primary hero-cta" target="_blank" rel="noopener noreferrer" data-track-btn="hero-primary">
      Add to Chrome — it's free
    </a>
  </div>
</section>
```

**Remove:** `<div class="hero-bg">`, `<div class="hero-content">`, `<div class="hero-scroll-hint">` from the old hero.

**Verify:** HTML validates; section renders (unstyled is fine at this step); old background image no longer referenced.

---

### [x] Step 3: Hero CSS (styles.css)

Write all CSS for the new hero. This is the most visually critical step.

**Files:** `styles.css`

**Rules to add/replace:**

1. **`:root` additions:**
   ```css
   --hero-letter-size: clamp(7rem, 18vw, 16rem);
   --bottom-nav-h: 56px;
   ```

2. **`.scene--hero`** — Full viewport, dark canvas, no background image, CSS grid container:
   ```
   display: grid;
   grid-template-rows: 1fr auto; /* main area + bottom bar */
   height: calc(100vh - 64px - var(--bottom-nav-h));
   margin-top: 64px;
   padding: 0;
   background: var(--bg);
   ```

3. **`.hero-grid`** — Two-column grid inside the hero main area:
   ```
   display: grid;
   grid-template-columns: 280px 1fr; /* letter col + eagle col */
   height: 100%;
   ```

4. **`.hero-letter`** — Giant decorative "H":
   ```
   font-size: var(--hero-letter-size);
   font-weight: 800;
   color: var(--teal);
   line-height: 1;
   position: relative;
   background-image: radial-gradient(circle, rgba(0,0,0,0.4) 1.5px, transparent 1.5px);
   background-size: 14px 14px;
   -webkit-background-clip: text; /* dot-mask effect — subtle */
   display: flex; align-items: center; justify-content: center;
   ```
   Note: The dot mask on text is CSS-only and progressive enhancement. Fallback is solid teal.

5. **`.hero-eagle-wrap`** — Relative container for image + counter:
   ```
   position: relative; overflow: hidden; height: 100%;
   ```

6. **`.hero-eagle-img`** — Crop to bird face only:
   ```
   width: 100%; height: 100%;
   object-fit: cover; object-position: center 15%;
   filter: contrast(1.05) saturate(0.9);
   mask-image: linear-gradient(to bottom, black 60%, transparent 95%);
   -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 95%);
   ```

7. **`.hero-counter`** — Editorial pagination, positioned top-right of eagle col:
   ```
   position: absolute; top: 2rem; right: 2rem;
   font-size: 0.75rem; letter-spacing: 0.15em; color: var(--text-muted);
   display: flex; align-items: center; gap: 1rem;
   ```

8. **`.hero-bottom`** — Full-width bar at bottom of hero:
   ```
   display: flex; align-items: center; justify-content: space-between;
   padding: 1.25rem 2.5rem;
   border-top: 1px solid rgba(255,255,255,0.08);
   background: rgba(10,10,10,0.7);
   backdrop-filter: blur(8px);
   ```

9. **`.hero-eagle-name`** — All-caps label (HARIBON EAGLE):
   ```
   font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase;
   color: var(--text-muted);
   ```

10. **`.hero-eagle-sci`** — Italic scientific name:
    ```
    font-size: 0.8rem; font-style: italic; color: var(--text-dim);
    ```

11. **Mobile (≤768px):** Stack grid to single column; letter moves to top-left corner overlay (position:absolute, smaller size); eagle fills full width; hero height `calc(100svh - 56px - var(--bottom-nav-h))`.

**Verify:** Hero matches editorial layout. Eagle image shows bird face. Letter "H" visible and teal. Bottom bar shows label + CTA. Responsive on mobile.

---

### [x] Step 4: Bottom Tab Navigation (index.html + styles.css)

Add the fixed bottom nav before `</body>`. This is always visible across all scroll positions.

**Files:** `index.html`, `styles.css`

**HTML (before `</body>`):**
```html
<nav class="bottom-tab-nav" aria-label="Page sections">
  <a href="#scene-hero" class="tab-link is-active" data-tab="hero">
    <svg ...><!-- feather icon --></svg>
    <span>Our Philosophy</span>
  </a>
  <a href="#scene-how-it-works" class="tab-link" data-tab="how">
    <svg ...><!-- steps icon --></svg>
    <span>How It Works</span>
  </a>
  <a href="./go/chrome/" class="tab-link tab-link--cta" data-tab="download" target="_blank" rel="noopener noreferrer" data-track-btn="bottom-tab-download">
    <svg ...><!-- download icon --></svg>
    <span>Download</span>
  </a>
  <a href="#scene-faq" class="tab-link" data-tab="faq">
    <svg ...><!-- question mark icon --></svg>
    <span>FAQ</span>
  </a>
</nav>
```

**CSS:**
```css
.bottom-tab-nav {
  position: fixed; bottom: 0; left: 0; right: 0;
  height: var(--bottom-nav-h);
  display: flex; align-items: stretch;
  background: rgba(10,10,10,0.92);
  backdrop-filter: blur(16px);
  border-top: 1px solid rgba(255,255,255,0.07);
  z-index: 900;
}
.tab-link {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 3px; text-decoration: none;
  color: var(--text-muted); font-size: 0.65rem;
  letter-spacing: 0.08em; text-transform: uppercase;
  border-top: 2px solid transparent;
  transition: color 0.2s, border-color 0.2s;
}
.tab-link.is-active, .tab-link:hover {
  color: var(--teal); border-top-color: var(--teal);
}
.tab-link svg { width: 18px; height: 18px; }
```

**Body padding:** Add `padding-bottom: var(--bottom-nav-h)` to `body` so content doesn't hide behind the nav.

**Verify:** Tab nav visible at bottom on all scroll positions. Clicking "How It Works" smoothly scrolls to `#scene-how-it-works`. The "Download" tab opens `./go/chrome/` in a new tab and is visually highlighted as the primary conversion CTA (teal fill / pill style). Active state highlights correct tab.

**User decisions (applied):**
- Counter `01 / 02 / 03` is INTERACTIVE — clicking arrows cycles through 3 hero feature tag-lines/slides (see Step 6a below). Also auto-rotates every 6s.
- Hero bottom label: `LEARN TAGALOG` / `While You Browse` (brand copy, not scientific name).
- Bottom tabs: `Our Philosophy | How It Works | Download | FAQ` (Download is the prominent CTA tab styled in teal).
- Eagle asset: `./assets/haribon-eagle.png` (AI-generated transparent PNG).

---

### [x] Step 5: Scroll Animation System (styles.css + script.js)

Add the entrance animation infrastructure for all scroll sections.

**Files:** `styles.css`, `script.js`

**CSS:**
```css
[data-animate] {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.65s var(--ease-out), transform 0.65s var(--ease-out);
}
[data-animate].is-visible {
  opacity: 1;
  transform: translateY(0);
}
[data-animate]:nth-child(2) { transition-delay: 80ms; }
[data-animate]:nth-child(3) { transition-delay: 160ms; }
[data-animate]:nth-child(4) { transition-delay: 240ms; }
@media (prefers-reduced-motion: reduce) {
  [data-animate] { opacity: 1; transform: none; transition: none; }
}
```

**JS (`script.js`) — add `initScrollAnimations()` function:**
```js
function initScrollAnimations() {
  var els = document.querySelectorAll('[data-animate]');
  if (!els.length || !('IntersectionObserver' in window)) {
    els.forEach(function(el) { el.classList.add('is-visible'); });
    return;
  }
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(function(el) { obs.observe(el); });
}
```

**Add `data-animate` attributes** to key elements in index.html:
- `.persona-card` elements
- `.hiw-step` elements  
- `.pricing-card` elements
- `.faq-item` elements
- `.word-cards` children
- `.demo-callout` elements

**Also add `initBottomTabNav()` JS** to track scroll position and update `.is-active` on tab links:
```js
function initBottomTabNav() {
  var sections = [
    { id: 'scene-hero', tab: 'hero' },
    { id: 'scene-how', tab: 'hero' },
    { id: 'scene-how-it-works', tab: 'how' },
    { id: 'scene-faq', tab: 'faq' },
    { id: 'scene-pricing', tab: 'pricing' }
  ];
  var tabs = document.querySelectorAll('.tab-link');
  window.addEventListener('scroll', function() {
    var current = 'hero';
    sections.forEach(function(s) {
      var el = document.getElementById(s.id);
      if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
        current = s.tab;
      }
    });
    tabs.forEach(function(t) {
      t.classList.toggle('is-active', t.dataset.tab === current);
    });
  }, { passive: true });
}
```

**Verify:** Scroll down — sections reveal with fade-up. Bottom tab highlights as sections enter view. Reduced motion: no animations, elements visible immediately.

---

### [x] Step 6: Hero Entrance Animations (styles.css + script.js)

Add staggered entrance animation when the page first loads (hero elements animate in on DOMContentLoaded).

**Files:** `styles.css`, `script.js`

**CSS:**
```css
.hero-letter,
.hero-eagle-wrap,
.hero-counter,
.hero-bottom {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
}
.hero-letter.hero-in { opacity: 1; transform: none; }
.hero-eagle-wrap.hero-in { opacity: 1; transform: none; transition-delay: 200ms; }
.hero-counter.hero-in { opacity: 1; transform: none; transition-delay: 400ms; }
.hero-bottom.hero-in { opacity: 1; transform: none; transition-delay: 550ms; }
@media (prefers-reduced-motion: reduce) {
  .hero-letter, .hero-eagle-wrap, .hero-counter, .hero-bottom {
    opacity: 1; transform: none; transition: none;
  }
}
```

**JS:**
```js
function initHeroAnimation() {
  var els = document.querySelectorAll('.hero-letter, .hero-eagle-wrap, .hero-counter, .hero-bottom');
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      els.forEach(function(el) { el.classList.add('hero-in'); });
    });
  });
}
```

**Verify:** Refresh page — hero elements animate in sequentially. No flash of unstyled content. `prefers-reduced-motion` skips animation.

---

### [x] Step 7: Pricing De-emphasis + Section Polish (index.html + styles.css)

De-emphasize pricing visually and clean up all scroll sections.

**Files:** `index.html`, `styles.css`

**Pricing changes:**
- Remove the `.plan-badge--loved` and `.plan-badge--value` from `index.html` (or keep but reduce visual weight)
- In `.scene--pricing`, reduce section title prominence — smaller eyebrow, lighter weight heading
- Free plan CTA button remains `.btn--primary`; Premium/PAYG get `.btn--secondary` (outline style)
- Add `.btn--secondary` CSS: `background: transparent; border: 1.5px solid var(--teal); color: var(--teal);`

**Section spacing polish (styles.css):**
- Increase padding on `.scene` from `8rem 2rem` to `10rem 2rem` for breathing room
- Ensure `.who-header`, `.hiw-header`, `.words-header` have consistent bottom margin

**Demo section:** Ensure video autoplay/muted attributes preserved; no layout changes needed.

**Verify:** Pricing section loads; free plan CTA is visually dominant; premium/PAYG are secondary. All sections have consistent generous whitespace.

---

### [x] Step 8: Mobile Responsive Polish (styles.css)

Ensure all new components are fully responsive at 375px and 768px breakpoints.

**Files:** `styles.css`

**Key breakpoints:**
- `≤1024px`: Hero grid transitions (letter col shrinks)
- `≤768px`: Hero stacks to single column; letter overlays top-left corner; eagle is full-width tall rectangle; bottom bar stacks CTA under label
- `≤480px`: Bottom tab text hidden (icons only); hero letter size reduces further

**Bottom nav mobile:** At `≤480px`:
```css
.tab-link span { display: none; }
.tab-link svg { width: 22px; height: 22px; }
.bottom-tab-nav { height: 52px; }
```

**Mobile menu:** Preserve existing hamburger + full-screen overlay menu behavior for `nav-links`.

**Verify:** Chrome DevTools at 375px — hero looks designed, not broken. Bottom tabs show icons only. CTA is tappable size (≥44px height).

---

### [ ] Step 9: Final Polish, QA, and Git Push

Perform a full manual QA pass and push to GitHub.

**Checklist:**
- [ ] All `data-track-btn` attributes present on CTAs
- [ ] Analytics scripts (GTM, GA4, Reddit Pixel) untouched in `<head>`
- [ ] `privacy.html` and `terms.html` footer links work
- [ ] No console errors in Chrome DevTools
- [ ] Lighthouse performance check (ensure hero image not massive — consider adding `loading="eager"` to eagle, `loading="lazy"` to below-fold images)
- [ ] `<title>`, `<meta description>`, OG tags preserved
- [ ] All `.btn` CTAs link to `./go/chrome/` (in new tab)
- [ ] Discord button links to correct URL

**Git:**
```
git add -A
git commit -m "redesign: editorial hero layout with eagle, bottom tab nav, scroll animations"
git push origin main
```

**Verify:** Site live at https://fusion20k.github.io/hariweb (or similar). Hero visible immediately. Animations play. Mobile layout correct.
