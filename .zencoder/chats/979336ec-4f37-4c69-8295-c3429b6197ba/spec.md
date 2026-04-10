# Technical Specification — Daily Tagalog Words Section

## Difficulty: Medium

---

## Technical Context

- **Language**: Vanilla HTML/CSS/JS (ES5-compatible IIFE pattern, no build step)
- **Files modified**: `index.html`, `styles.css`, `script.js`
- **Dependencies**: None (no new libraries)
- **Existing patterns**: IntersectionObserver for scroll-in animations, CSS custom properties, staggered `transition-delay` on children, `is-active` class toggled by observer

---

## Insertion Point in `index.html`

Insert the new section **between line 314 and line 317** — between the closing `</section>` of `scene--reassurance` (Scene 6) and the opening `<section>` of `scene--pricing` (Scene 7).

The new section takes `data-scene="7"`. The existing `data-scene` values on pricing, FAQ, and closing do **not** need to change — the script only uses the selector `.scene[data-scene]` and never reads the numeric value.

```
<!-- existing: scene--reassurance ends here (line 314) -->
    </section>

    <!-- NEW: Scene 7: Daily Words -->  ← INSERT HERE
    <section class="scene scene--words" data-scene="7" id="scene-words">
        ...
    </section>

    <!-- existing: scene--pricing (stays as data-scene="7", rename not required) -->
    <section class="scene scene--pricing" data-scene="7" id="scene-pricing">
```

> Note: `data-scene` on the pricing section can remain `"7"` since the JS ignores the value. To avoid confusion in source, it's fine to leave all existing `data-scene` attributes unchanged.

---

## Implementation Approach

### Section Purpose

This section bridges the "Zero risk" reassurance and the pricing sections. It serves two goals simultaneously:
1. **Immersive teaching** — shows 3 Tagalog words daily, embedded in natural sentences that mirror exactly what Hari does in the browser
2. **Conversion** — demonstrates the product's core value proposition in action; closes with a CTA

The design is **not** flashcard-style. Each card shows the word embedded in an evocative English-language sentence (with the Tagalog word highlighted in teal), mirroring the immersion experience of Hari itself. This is the section's central metaphor.

### Section Structure (HTML)

```html
<!-- Scene 7: Daily Words -->
<section class="scene scene--words" data-scene="7" id="scene-words">
    <div class="words-inner">
        <div class="words-header">
            <span class="words-eyebrow">Words of the Day</span>
            <h2 class="section-title words-title">Tagalog, in the wild</h2>
            <p class="words-intro">Three words, refreshed every morning. See how they live inside a real sentence — the same way Hari shows them while you browse.</p>
        </div>
        <div class="word-cards" id="word-cards" aria-label="Today's Tagalog words">
            <!-- 3 .word-card elements injected by script.js -->
        </div>
        <div class="words-cta">
            <p class="words-cta-text">Hari weaves words like these into the articles, feeds, and pages you already read — every day.</p>
            <a href="./go/chrome/" class="btn btn--primary" target="_blank" rel="noopener noreferrer">Add to Chrome — it's free</a>
        </div>
    </div>
</section>
```

Each word card rendered by JS:

```html
<article class="word-card" data-card="1">
    <header class="word-card-header">
        <span class="word-tagalog">Mahal</span>
        <span class="word-pos">adjective · adverb</span>
    </header>
    <div class="word-pronunciation">mah · HAL</div>
    <div class="word-meaning">beloved; expensive</div>
    <blockquote class="word-sentence">
        "<em class="word-in-sentence"><span class="word-highlight">Mahal</span> kita</em> — she said it quietly, finally, over the phone."
    </blockquote>
    <p class="word-usage">Doubles as "expensive" — the same word for what you treasure and what costs you dearly.</p>
</article>
```

---

## CSS Patterns to Follow

All new CSS goes after the `.scene--reassurance` block and before `.scene--pricing` in `styles.css`.

### Design language
- **Background**: cards use `var(--bg-3)` with `border: 1px solid rgba(255, 255, 255, 0.08)` and `border-radius: 16px` — same as `.persona-card`, `.pricing-card`
- **Eyebrow**: follows `.demo-intro-eyebrow` pattern — `font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--teal)`
- **Teal highlight**: `var(--teal)` on the Tagalog word within the sentence (`.word-highlight`)
- **Card hover**: `transform: translateY(-5px); border-color: rgba(26, 188, 156, 0.28); box-shadow: 0 20px 48px rgba(0,0,0,0.45)` — same as `.persona-card:hover`
- **Entry animation**: `opacity: 0; transform: translateY(28px)` → `.scene--words.is-active .word-card { opacity: 1; transform: none; }` with staggered `transition-delay` per card (0.1s, 0.25s, 0.4s)

### Layout
- `.words-inner`: `max-width: 1100px; margin: 0 auto; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 3rem; position: relative; z-index: 2`
- `.word-cards`: `display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; max-width: 1000px; width: 100%`
- Mobile (`max-width: 768px`): `.word-cards { grid-template-columns: 1fr; max-width: 480px; }`

### Notable element styles
- `.word-tagalog`: `font-size: clamp(1.75rem, 3vw, 2.25rem); font-weight: 800; color: var(--white); letter-spacing: -0.02em`
- `.word-pronunciation`: `font-size: 0.8rem; color: var(--teal); letter-spacing: 0.08em; font-weight: 600`
- `.word-pos`: `font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; align-self: flex-end; padding-bottom: 0.2rem`
- `.word-meaning`: `font-size: 1rem; color: var(--text); font-weight: 600`
- `.word-sentence`: `font-size: 1rem; color: var(--text-muted); line-height: 1.7; border-left: 2px solid var(--teal); padding-left: 1rem; margin: 0; font-style: normal`
- `.word-highlight`: `color: var(--teal); font-weight: 700`
- `.word-usage`: `font-size: 0.8rem; color: var(--text-muted); font-style: italic; line-height: 1.6`
- `.words-cta`: `text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1rem`
- `.words-cta-text`: `font-size: 0.95rem; color: var(--text-muted); max-width: 480px; line-height: 1.6`

### Reduced-motion
Add `.word-card, .words-header, .words-cta` to the `@media (prefers-reduced-motion: reduce)` block in the existing reduced-motion section — set `opacity: 1 !important; transform: none !important`.

---

## Daily Rotation — Client-Side (6am EST Cycle)

Implemented inside the existing IIFE in `script.js`.

### Algorithm

```javascript
function getTodaysWordIndices() {
    var WORDS_PER_DAY = 3;
    var POOL_SIZE = 30;
    var BATCH_COUNT = POOL_SIZE / WORDS_PER_DAY; // 10 batches

    // Get current time in America/New_York timezone
    var now = new Date();
    var estDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));

    // If before 6am EST, use yesterday's date (previous cycle still active)
    if (estDate.getHours() < 6) {
        estDate.setDate(estDate.getDate() - 1);
    }

    // Strip time — use midnight of the effective EST date
    var midnight = new Date(estDate.getFullYear(), estDate.getMonth(), estDate.getDate());

    // Fixed epoch: Jan 1, 2025
    var epoch = new Date(2025, 0, 1);
    var daysSinceEpoch = Math.floor((midnight - epoch) / (1000 * 60 * 60 * 24));

    // Cycle through 10 batches
    var batchIndex = ((daysSinceEpoch % BATCH_COUNT) + BATCH_COUNT) % BATCH_COUNT;
    var start = batchIndex * WORDS_PER_DAY;
    return [start, start + 1, start + 2];
}
```

### Rendering

```javascript
function initWordCards() {
    var container = document.getElementById('word-cards');
    if (!container) return;
    var indices = getTodaysWordIndices();
    indices.forEach(function(idx, i) {
        var w = TAGALOG_WORDS[idx];
        var card = document.createElement('article');
        card.className = 'word-card';
        card.setAttribute('data-card', String(i + 1));
        card.innerHTML = [
            '<header class="word-card-header">',
            '  <span class="word-tagalog">' + w.word + '</span>',
            '  <span class="word-pos">' + w.pos + '</span>',
            '</header>',
            '<div class="word-pronunciation">' + w.pronunciation + '</div>',
            '<div class="word-meaning">' + w.meaning + '</div>',
            '<blockquote class="word-sentence">' + w.sentence + '</blockquote>',
            '<p class="word-usage">' + w.usage + '</p>'
        ].join('');
        container.appendChild(card);
    });
}
```

Call `initWordCards()` at the top of the IIFE (before the IntersectionObserver setup), so cards exist in the DOM before the observer runs.

---

## The 30 Words / Phrases

The pool is ordered so that consecutive batches of 3 have stylistic variety (mix of nouns, verbs, particles, phrases). The `sentence` field includes `<span class="word-highlight">Word</span>` wrapping the Tagalog word in context.

```javascript
var TAGALOG_WORDS = [
    // Batch 0
    {
        word: 'Mahal',
        pronunciation: 'mah · HAL',
        pos: 'adjective',
        meaning: 'beloved; expensive',
        sentence: '"<span class="word-highlight">Mahal</span> kita," she finally said — quietly, over the phone, after years of not saying it.',
        usage: 'The same word covers love and cost. What you treasure is what you\'d pay anything for.'
    },
    {
        word: 'Salamat',
        pronunciation: 'sa · LAH · mat',
        pos: 'interjection',
        meaning: 'thank you',
        sentence: 'He left a note on the counter: "<span class="word-highlight">Salamat</span>" — nothing else, just that one word and a smiley face.',
        usage: 'The default expression of gratitude in Filipino. Warmer than a quick "thanks."'
    },
    {
        word: 'Barkada',
        pronunciation: 'bar · KAH · da',
        pos: 'noun',
        meaning: 'a tight-knit group of friends; one\'s crew',
        sentence: 'She didn\'t need a big party — her <span class="word-highlight">barkada</span> showed up with food and that was enough.',
        usage: 'More than "friend group." A barkada implies history, loyalty, and shared mischief.'
    },
    // Batch 1
    {
        word: 'Sama-sama',
        pronunciation: 'SAH · ma SAH · ma',
        pos: 'adverb',
        meaning: 'together; all at once; as one',
        sentence: 'The whole family ate <span class="word-highlight">sama-sama</span> — squeezed around a table too small for all of them.',
        usage: 'Reduplication (repeating a root) is a core feature of Tagalog grammar. "Sama" = to join; "sama-sama" = everyone joining.'
    },
    {
        word: 'Ingat',
        pronunciation: 'EE · ngat',
        pos: 'verb · interjection',
        meaning: 'to be careful; take care (farewell)',
        sentence: 'Her lola called after her: "<span class="word-highlight">Ingat</span>!" — the same thing every time she left the house.',
        usage: 'Used as a goodbye that means "be safe." Grandparents say it constantly.'
    },
    {
        word: 'Talaga',
        pronunciation: 'ta · LAH · ga',
        pos: 'adverb',
        meaning: 'really; truly; indeed',
        sentence: '"<span class="word-highlight">Talaga</span>?" she asked, leaning forward — the kind of really that means tell me everything.',
        usage: 'One of the most flexible Tagalog words. Tone completely changes the meaning.'
    },
    // Batch 2
    {
        word: 'Kuya',
        pronunciation: 'KOO · ya',
        pos: 'noun · title',
        meaning: 'older brother; respectful address for any older male',
        sentence: 'She flagged down the server: "<span class="word-highlight">Kuya</span>!" — it worked better than raising her hand.',
        usage: 'Not just for siblings. Calling a stranger Kuya is a sign of respect and familiarity. Ate is the female equivalent.'
    },
    {
        word: 'Puso',
        pronunciation: 'POO · so',
        pos: 'noun',
        meaning: 'heart',
        sentence: 'The doctor said his <span class="word-highlight">puso</span> was strong — the family exhaled at once.',
        usage: 'Used literally and figuratively, just like "heart" in English. Also a common word in Filipino pop songs.'
    },
    {
        word: 'Masaya',
        pronunciation: 'ma · SAH · ya',
        pos: 'adjective',
        meaning: 'happy; joyful; fun',
        sentence: 'It was a small birthday — just cake and karaoke — but it was so <span class="word-highlight">masaya</span>.',
        usage: 'Can describe a person\'s mood or a situation\'s vibe. "Masaya dito" = it\'s fun here.'
    },
    // Batch 3
    {
        word: 'Sige',
        pronunciation: 'see · GEH',
        pos: 'interjection',
        meaning: 'okay; go ahead; sure; alright then',
        sentence: '"<span class="word-highlight">Sige</span>, pumunta na tayo" — fine, let\'s just go already.',
        usage: 'One of the most heard words in everyday Filipino conversation. Can express agreement, resignation, or encouragement.'
    },
    {
        word: 'Lipad',
        pronunciation: 'LEE · pad',
        pos: 'verb',
        meaning: 'to fly',
        sentence: 'She watched the plane until it disappeared — her brother was finally going to <span class="word-highlight">lipad</span> somewhere new.',
        usage: 'Root word. "Lumipad" = he/she flew; "maglipad" = to fly (infinitive). Filipino verbs conjugate through affixes.'
    },
    {
        word: 'Tahimik',
        pronunciation: 'ta · HEE · mik',
        pos: 'adjective',
        meaning: 'quiet; peaceful; still',
        sentence: 'At 5am the neighborhood was <span class="word-highlight">tahimik</span> — she drank her coffee and didn\'t want it to end.',
        usage: 'Can mean quiet (no noise) or peaceful (serene). Often used to describe places or moments, not just people.'
    },
    // Batch 4
    {
        word: 'Umaga',
        pronunciation: 'oo · MAH · ga',
        pos: 'noun',
        meaning: 'morning',
        sentence: '"Magandang <span class="word-highlight">umaga</span>," her dad always said — good morning — before anyone else was even awake.',
        usage: '"Magandang umaga" = good morning. "Maganda" = beautiful. Filipino greetings are literally "beautiful morning/afternoon/evening."'
    },
    {
        word: 'Gutom',
        pronunciation: 'GOO · tom',
        pos: 'adjective',
        meaning: 'hungry',
        sentence: 'They arrived at the restaurant with nothing planned except being very <span class="word-highlight">gutom</span>.',
        usage: '"Gutom na ako" = I\'m already hungry. A word that appears often and urgently in Filipino households.'
    },
    {
        word: 'Luto',
        pronunciation: 'LOO · toh',
        pos: 'verb · adjective',
        meaning: 'to cook; cooked (done cooking)',
        sentence: '"<span class="word-highlight">Luto</span> na," her nanay announced, and everyone moved toward the kitchen.',
        usage: '"Luto na" = it\'s done / the food is ready. Hearing this phrase means it\'s time to gather.'
    },
    // Batch 5
    {
        word: 'Bahay',
        pronunciation: 'ba · HI',
        pos: 'noun',
        meaning: 'house; home',
        sentence: 'After a year abroad, she stepped off the plane and just wanted to go <span class="word-highlight">bahay</span>.',
        usage: '"Uwi na tayo sa bahay" = let\'s go home. More than a structure — implies warmth and belonging.'
    },
    {
        word: 'Maganda',
        pronunciation: 'ma · GAN · da',
        pos: 'adjective',
        meaning: 'beautiful; pretty; nice',
        sentence: 'They drove through the province and she kept saying it — "<span class="word-highlight">Maganda</span>" — to no one in particular.',
        usage: 'Describes people, places, sunsets, ideas. Also used in greetings: "Magandang hapon" = good afternoon.'
    },
    {
        word: 'Tayo',
        pronunciation: 'tah · YO',
        pos: 'pronoun',
        meaning: 'we / us (inclusive — speaker and listener both included)',
        sentence: '"Kain na <span class="word-highlight">tayo</span>" — let\'s eat — is the phrase that signals everything is ready.',
        usage: 'Tagalog has two words for "we": "tayo" (includes the listener) and "kami" (excludes the listener). A rare grammatical distinction.'
    },
    // Batch 6
    {
        word: 'Naman',
        pronunciation: 'NAH · man',
        pos: 'particle',
        meaning: 'softens a request; adds contrast or emphasis; "come on" / "for its part"',
        sentence: '"Sige <span class="word-highlight">naman</span>," he said — the kind of come on that sounds like a gentle plea.',
        usage: 'One of Tagalog\'s most expressive particles. Nearly untranslatable on its own — it modulates tone, not content.'
    },
    {
        word: 'Alis',
        pronunciation: 'AH · lis',
        pos: 'verb',
        meaning: 'to leave; to go; to remove',
        sentence: '"<span class="word-highlight">Alis</span> na tayo" — they said it at the same time, grabbed their things, and left.',
        usage: '"Umalis na" = already left / gone. "Aalis na ako" = I\'m leaving now. Used constantly as a departure signal.'
    },
    {
        word: 'Pagmamahal',
        pronunciation: 'pag · ma · ma · HAL',
        pos: 'noun',
        meaning: 'love; affection; the act of loving',
        sentence: 'She wrote in the card: "With all my <span class="word-highlight">pagmamahal</span>" — then crossed it out and wrote it again anyway.',
        usage: 'The noun form of "mahal." Prefixing "pag-" turns verbs and adjectives into the act or state of something.'
    },
    // Batch 7
    {
        word: 'Lakad',
        pronunciation: 'LAH · kad',
        pos: 'noun · verb',
        meaning: 'walk; errand; plan; a thing to do',
        sentence: '"May <span class="word-highlight">lakad</span> ako" — I have somewhere to be — was all she said before disappearing for three hours.',
        usage: 'Flexible word. Can mean a literal walk, a scheduled errand, or a vague "I have plans." Often used as a polite excuse.'
    },
    {
        word: 'Bago',
        pronunciation: 'BAH · go',
        pos: 'adjective · adverb',
        meaning: 'new; before (as a conjunction)',
        sentence: 'She put on the <span class="word-highlight">bago</span> shoes and immediately felt like a different person.',
        usage: '"Bago" meaning "new" and "bago" meaning "before" are the same word — context separates them. "Bago umalis" = before leaving.'
    },
    {
        word: 'Dito',
        pronunciation: 'DEE · toh',
        pos: 'adverb',
        meaning: 'here; in this place',
        sentence: '"Halika <span class="word-highlight">dito</span>" — come here — carries different weight depending on who says it.',
        usage: 'Part of a three-way distance system: dito (here), diyan (there, near you), doon (there, far away). Tagalog is precise about proximity.'
    },
    // Batch 8
    {
        word: 'Malayo',
        pronunciation: 'ma · LAH · yo',
        pos: 'adjective · adverb',
        meaning: 'far; distant; a long way off',
        sentence: 'They said the hospital was <span class="word-highlight">malayo</span> — but she drove there anyway, without thinking about it.',
        usage: '"Malayo pa" = still far / not yet close. Often used emotionally as well as physically.'
    },
    {
        word: 'Gabi',
        pronunciation: 'GAH · bi',
        pos: 'noun',
        meaning: 'night; evening',
        sentence: '"Magandang <span class="word-highlight">gabi</span>," the host said, and the crowd settled into something warmer.',
        usage: '"Magandang gabi" = good evening. "Gabi na" = it\'s already night — sometimes said with surprise, sometimes resignation.'
    },
    {
        word: 'Ate',
        pronunciation: 'AH · teh',
        pos: 'noun · title',
        meaning: 'older sister; respectful address for any older female',
        sentence: '"<span class="word-highlight">Ate</span>, paki-pass ng asin?" — she didn\'t need to know her name to ask politely.',
        usage: 'Like Kuya, Ate is used for any older woman — siblings, cashiers, nurses. Shows respect without formality.'
    },
    // Batch 9
    {
        word: 'Ganoon',
        pronunciation: 'ga · NOON',
        pos: 'adverb · pronoun',
        meaning: 'like that; in that way; that\'s how it is',
        sentence: '"<span class="word-highlight">Ganoon</span> talaga," her lola said, with a shrug that meant some things just are what they are.',
        usage: 'Short form: "ganon." Used to describe manner or to accept reality. "Ganoon pala" = so that\'s how it is / ah, I see.'
    },
    {
        word: 'Mano po',
        pronunciation: 'MAH · no · poh',
        pos: 'phrase · gesture',
        meaning: 'a gesture of respect: pressing an elder\'s hand to your forehead',
        sentence: 'He greeted his lolo with "<span class="word-highlight">Mano po</span>," taking his hand gently the way he\'d been taught as a kid.',
        usage: 'A physical act of greeting elders. "Mano" = hand (from Spanish); "po" = polite particle. Deeply embedded in Filipino family culture.'
    },
    {
        word: 'Kain',
        pronunciation: 'KA · in',
        pos: 'verb',
        meaning: 'to eat',
        sentence: '"<span class="word-highlight">Kain</span> na!" was yelled from the kitchen, and nobody needed to be told twice.',
        usage: '"Kain na tayo" = let\'s eat. "Kumain ka na ba?" = have you eaten yet? Asking this is a form of caring in Filipino culture.'
    }
];
```

---

## Source Code Changes Summary

| File | Change |
|------|--------|
| `index.html` | Insert `<section class="scene scene--words" ...>` between `scene--reassurance` and `scene--pricing` |
| `styles.css` | Add `.scene--words`, `.words-inner`, `.words-header`, `.words-eyebrow`, `.words-intro`, `.word-cards`, `.word-card`, `.word-card-header`, `.word-tagalog`, `.word-pos`, `.word-pronunciation`, `.word-meaning`, `.word-sentence`, `.word-highlight`, `.word-usage`, `.words-cta`, `.words-cta-text`; add mobile breakpoint overrides; add to reduced-motion block |
| `script.js` | Add `TAGALOG_WORDS` array, `getTodaysWordIndices()` function, `initWordCards()` function; call `initWordCards()` inside existing IIFE before observer setup |

---

## Verification Approach

1. Open `index.html` in a browser (no server required)
2. Scroll to the section between "Zero risk" and "Pricing" — confirm 3 word cards render
3. Confirm pronunciation, sentence with highlighted word, and usage note display correctly
4. Manually test the rotation by temporarily editing the epoch date in `getTodaysWordIndices()` to verify different batches load
5. Test the 6am boundary by temporarily setting `estDate.getHours()` comparison to a different hour
6. Resize to 768px and 480px — confirm cards stack to single column
7. Check reduced-motion preference via DevTools — confirm all cards are visible without animation
8. Confirm the CTA link points to `./go/chrome/` and opens in a new tab
9. Confirm IntersectionObserver fires `is-active` on scroll (same mechanism as all other scenes)
