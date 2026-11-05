/*
 * Hari Tagalog - motion and behavior for every page.
 * Kept deliberately light: no canvas loops and no live blur. The hero's illustrated layers drift with
 * transform only while the hero is on screen, the cards and scenes switch with CSS transitions, and
 * Thea's introduction plays in the extension's premium voice (clips in assets/thea/), her subtitles
 * lighting up word by word. Every page: header, menu, FAQ, plan tabs and reveals.
 */
(function () {
  'use strict';

  // Premium's founding-member price ends with Black Friday (Nov 27, 2026, midnight Pacific). After
  // that the page shows the regular price, the moment checkout switches too (FOUNDING_ENDS in the
  // backend's index.js and the extension's newtab.js).
  if (Date.now() >= Date.parse('2026-11-28T08:00:00Z')) {
    var setText = function (sel, text) { document.querySelectorAll(sel).forEach(function (el) { el.textContent = text; }); };
    document.querySelectorAll('[data-founding]').forEach(function (el) { el.remove(); });
    setText('[data-price-month]', '$11.99');
    setText('[data-price-year]', '$89.99 a year');
    setText('[data-price-year-month]', '$7.50');
  }

  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('k-js');

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  var isHome = !!$('.k-home');

  /* ---------------------------------------------------- header + menu */
  var header = $('#site-header');
  var toggle = $('#menu-toggle');
  var stickyCta = $('.sticky-mobile-cta');
  var lockScrolled = header && header.classList.contains('is-scrolled');

  var scrollUi = function () {
    var y = window.scrollY;
    if (header && !lockScrolled) header.classList.toggle('is-scrolled', y > 40);
    if (stickyCta) stickyCta.classList.toggle('is-visible', y > window.innerHeight * 0.7);
  };
  window.addEventListener('scroll', scrollUi, { passive: true });
  scrollUi();

  if (toggle && header) {
    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    $$('a', header).forEach(function (a) {
      a.addEventListener('click', function () {
        header.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --------------------------------------------------------------- FAQ */
  $$('.faq-item').forEach(function (item) {
    var btn = $('.faq-question', item);
    var ans = $('.faq-answer', item);
    if (!btn || !ans) return;
    btn.addEventListener('click', function () {
      var open = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      ans.setAttribute('aria-hidden', open ? 'false' : 'true');
    });
  });

  /* ------------------------------------------------------- plan tabs */
  var table = $('.g-table');
  if (table) {
    $$('.g-tabs [data-filter]').forEach(function (btn, _, all) {
      btn.addEventListener('click', function () {
        var f = btn.getAttribute('data-filter');
        all.forEach(function (b) { b.setAttribute('aria-selected', b === btn ? 'true' : 'false'); });
        $$('tbody tr[data-g]', table).forEach(function (tr) {
          tr.classList.toggle('is-hidden', f !== 'all' && tr.getAttribute('data-g') !== f);
        });
      });
    });
  }

  /* ----------------------------------------------------- reveal on view */
  var revealEls = $$('[data-rv]');
  if (reduce || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  if (!isHome) return;

  function whileVisible(el, start, stop, threshold) {
    if (!el) return;
    if (!('IntersectionObserver' in window)) { start(); return; }
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) start(); else stop();
    }, { threshold: threshold || 0.25 }).observe(el);
  }

  /* ------------------------------------------------- hero parallax */
  var hero = $('.k-hero');
  var layers = $$('.k-layer');
  requestAnimationFrame(function () { setTimeout(function () { hero.classList.add('is-ready'); }, 60); });
  // the smoke over Mayon is an SVG animation, which reduced-motion CSS can't reach
  if (reduce) $$('.k-hero svg').forEach(function (s) { if (s.pauseAnimations) s.pauseAnimations(); });

  if (!reduce && hero) {
    var mx = 0, my = 0, ticking = false, heroOn = true;
    var paint = function () {
      ticking = false;
      if (!heroOn) return;
      // only the pointer shifts the layers; scrolling moves the scene as one piece so it never pulls apart
      layers.forEach(function (l) {
        var d = parseFloat(l.getAttribute('data-depth')) || 0;
        l.style.transform = 'translate3d(' + (mx * d * -40).toFixed(1) + 'px,' + (my * d * -24).toFixed(1) + 'px,0)';
      });
    };
    var ask = function () { if (!ticking) { ticking = true; requestAnimationFrame(paint); } };
    if (window.matchMedia('(hover: hover)').matches) {
      hero.addEventListener('mousemove', function (e) {
        mx = e.clientX / window.innerWidth - 0.5;
        my = e.clientY / window.innerHeight - 0.5;
        ask();
      });
    }
    whileVisible(hero, function () { heroOn = true; ask(); }, function () { heroOn = false; }, 0);
  }

  /* --------------------------------------------------------- carousel */
  $$('[data-carousel]').forEach(function (box) {
    var cards = $$('.k-card', box);
    var track = $('.k-track', box);
    var i = 1, timer = 0, hovering = false;
    function show(n) {
      i = (n + cards.length) % cards.length;
      cards.forEach(function (c, k) { c.classList.toggle('is-on', k === i); });
    }
    function next() { show(i + 1); }
    function auto() { clearInterval(timer); if (!reduce) timer = setInterval(function () { if (!hovering) next(); }, 4800); }
    $('.k-arrow--prev', box).addEventListener('click', function () { show(i - 1); auto(); });
    $('.k-arrow--next', box).addEventListener('click', function () { show(i + 1); auto(); });
    cards.forEach(function (c, k) { c.addEventListener('mouseenter', function () { hovering = true; show(k); }); c.addEventListener('mouseleave', function () { hovering = false; }); });
    show(1);
    // on phones the row scrolls; the card nearest the middle is the lit one
    if (track) {
      track.addEventListener('scroll', function () {
        var mid = track.scrollLeft + track.clientWidth / 2, best = 0, dist = Infinity;
        cards.forEach(function (c, k) { var d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid); if (d < dist) { dist = d; best = k; } });
        if (best !== i) show(best);
      }, { passive: true });
    }
    whileVisible(box, auto, function () { clearInterval(timer); });
  });

  /* --------------------------------------------------- the day gallery */
  function swapEngine(box) {
    var words = $$('.g-word', box);
    words.forEach(function (w) {
      var en = w.textContent;
      w.textContent = '';
      var a = document.createElement('span'); a.className = 'g-en'; a.textContent = en;
      var b = document.createElement('span'); b.className = 'g-tl'; b.textContent = w.getAttribute('data-tl');
      w.appendChild(a); w.appendChild(b);
    });
    var timer = 0, n = 0;
    function step() {
      if (n < words.length) { words[n++].classList.add('is-tl'); timer = setTimeout(step, 700); return; }
      timer = setTimeout(function () { words.forEach(function (w) { w.classList.remove('is-tl'); }); n = 0; timer = setTimeout(step, 1200); }, 3400);
    }
    return {
      start: function () { if (reduce) { words.forEach(function (w) { w.classList.add('is-tl'); }); return; } if (!timer) timer = setTimeout(step, 600); },
      stop: function () { clearTimeout(timer); timer = 0; }
    };
  }

  function subsEngine(box) {
    var subs = $$('p', box), k = 0, timer = 0;
    function next() { subs[k].classList.remove('is-on'); k = (k + 1) % subs.length; subs[k].classList.add('is-on'); timer = setTimeout(next, 3000); }
    return { start: function () { if (!reduce && !timer) timer = setTimeout(next, 3000); }, stop: function () { clearTimeout(timer); timer = 0; } };
  }

  var dayStage = $('.k-day-stage');
  if (dayStage) {
    var scenes = $$('.k-scene-card', dayStage);
    var count = $('.k-day-count b');
    var engines = scenes.map(function (s) {
      var sw = $('[data-swap]', s), su = $('[data-subs]', s);
      return sw ? swapEngine(sw) : su ? subsEngine(su) : null;
    });
    var cur = 0, visible = false;
    var showScene = function (n) {
      if (engines[cur]) engines[cur].stop();
      cur = (n + scenes.length) % scenes.length;
      scenes.forEach(function (s, k) { s.classList.toggle('is-on', k === cur); });
      if (count) count.textContent = (cur < 9 ? '0' : '') + (cur + 1);
      if (visible && engines[cur]) engines[cur].start();
    };
    $$('[data-day]').forEach(function (b) {
      b.addEventListener('click', function () { showScene(cur + parseInt(b.getAttribute('data-day'), 10)); });
    });
    whileVisible(dayStage, function () { visible = true; if (engines[cur]) engines[cur].start(); }, function () { visible = false; if (engines[cur]) engines[cur].stop(); });
  }

  /* ========================================================= Thea speaks */
  // Thea's lines, voiced ahead of time in the extension's premium voice (tools/make-thea-voice.py
  // writes assets/thea/). *words* are Tagalog and glow warm in the subtitles.
  var SCRIPT = [
    { text: "*Kumusta!* I'm Thea, and I'll be your Tagalog guide.", note: '<b>Kumusta</b> means hello, how are you' },
    { text: 'Hari is a free Chrome extension that brings Tagalog into the websites you already read.', topic: 'read' },
    { text: 'As you browse, a few English words quietly turn into Tagalog, at whatever level you choose.', topic: 'read', note: '"day" becomes <b>araw</b>, "home" becomes <b>bahay</b>' },
    { text: 'Not sure what a word means? Just point at it to see the meaning and hear how it sounds.', topic: 'hover', note: '<b>pagod</b> means tired, worn out' },
    { text: "Words you save come back for a quick review, right before you'd forget them.", topic: 'save' },
    { text: "And with Premium, you can talk with me out loud, practice real conversations, and I'll gently help with your mistakes.", topic: 'speak' },
    { text: 'No extra study time. Just a little more Tagalog, every day. *Tara*, let\'s start!', note: '<b>Tara</b> means come on, let\'s go' }
  ];

  var capEl = $('#g-caption');
  var noteEl = $('#g-caption-tl');
  var timeEl = $('#g-thea-time');
  var playBtn = $('#g-play');
  var tiles = $$('.g-tile');
  var noteHelp = $('.g-thea-note');

  var line = 0, mode = 'idle', timers = [], raf = 0;
  var voiceData = null;          // { lines: [{ file, duration, starts }] } once the clips are found
  var audio = null;
  var elapsedBefore = 0;         // seconds of finished lines, for the clock

  function clear() { timers.forEach(clearTimeout); timers = []; cancelAnimationFrame(raf); }

  function plain(s) { return s.replace(/\*/g, ''); }

  // the line as words, so each one can light up as it's said
  function setLine(i) {
    var item = SCRIPT[i];
    capEl.textContent = '';
    item.text.split(/(\s+)/).forEach(function (part) {
      if (!part) return;
      if (/^\s+$/.test(part)) { capEl.appendChild(document.createTextNode(' ')); return; }
      var s = document.createElement('span');
      var tl = /\*/.test(part);
      s.textContent = part.replace(/\*/g, '');
      if (tl) s.className = 'is-tl';
      capEl.appendChild(s);
    });
    noteEl.innerHTML = item.note || '';
    tiles.forEach(function (t) { t.classList.toggle('is-on', !!item.topic && t.getAttribute('data-topic') === item.topic); });
  }

  // light every word that starts at or before this character
  function lightTo(charIndex) {
    var pos = 0;
    $$('span', capEl).forEach(function (s) {
      s.classList.toggle('is-said', pos <= charIndex);
      pos += s.textContent.length + 1;
    });
  }

  function showTime(secs) {
    secs = Math.floor(secs);
    if (timeEl) timeEl.textContent = Math.floor(secs / 60) + ':' + (secs % 60 < 10 ? '0' : '') + (secs % 60);
  }

  /* silent subtitles, before anyone presses play */
  function silentLine(i) {
    if (mode !== 'silent') return;
    line = i;
    setLine(i);
    var text = plain(SCRIPT[i].text);
    var ms = Math.max(2600, text.split(/\s+/).length * 330);
    var steps = 24, t0 = performance.now();
    for (var k = 0; k <= steps; k++) {
      (function (k) { timers.push(setTimeout(function () { lightTo(Math.round(text.length * k / steps)); }, ms * 0.9 * k / steps)); })(k);
    }
    timers.push(setTimeout(function () {
      showTime((performance.now() - t0) / 1000 + elapsedBefore);
      elapsedBefore += ms / 1000;
      if (i + 1 < SCRIPT.length) silentLine(i + 1);
      else timers.push(setTimeout(startSilent, 4500));
    }, ms + 500));
  }

  function startSilent() {
    if (reduce) { setLine(0); lightTo(999); return; }
    clear();
    mode = 'silent';
    elapsedBefore = 0;
    silentLine(0);
  }

  /* Thea's voice: one clip per line, the subtitles following the clip's own timing */
  function update() {
    if (mode !== 'voice' || !audio) return;
    var d = voiceData.lines[line];
    var t = audio.currentTime;
    var k = -1;
    for (var c = 0; c < d.starts.length; c++) { if (d.starts[c] <= t) k = c; else break; }
    lightTo(k);
    showTime(elapsedBefore + t);
  }

  // smooth while the tab is in front; the clip's own time updates keep it going if frames are throttled
  function follow() {
    update();
    if (mode === 'voice') raf = requestAnimationFrame(follow);
  }

  function voiceLine(i) {
    if (mode !== 'voice') return;
    line = i;
    setLine(i);
    lightTo(-1);
    audio.src = voiceData.lines[i].file;
    var p = audio.play();
    if (p && p.catch) p.catch(function () { pause(); });
    raf = requestAnimationFrame(follow);
  }

  var theaWrap = $('.k-thea-wrap');

  function setPlaying(on) {
    playBtn.classList.toggle('is-playing', on);
    if (theaWrap) theaWrap.classList.toggle('is-talking', on);
    playBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    playBtn.setAttribute('aria-label', on ? 'Pause Thea' : (mode === 'done' ? 'Play Thea\'s introduction again' : 'Play Thea\'s introduction with sound'));
  }

  function play() {
    clear();
    if (!voiceData) {
      // the clips aren't published yet: Thea speaks through the subtitles instead
      if (noteHelp) noteHelp.textContent = 'Thea\'s voice is on its way. For now, her words appear as subtitles.';
      startSilent();
      return;
    }
    var resume = mode === 'paused' && audio && audio.src && !audio.ended;
    if (!resume) { line = 0; elapsedBefore = 0; }
    mode = 'voice';
    setPlaying(true);
    if (resume) {
      var p = audio.play();
      if (p && p.catch) p.catch(function () { pause(); });
      raf = requestAnimationFrame(follow);
    } else {
      voiceLine(0);
    }
  }

  function pause() {
    clear();
    if (audio) audio.pause();
    mode = 'paused';
    setPlaying(false);
  }

  if (playBtn && capEl) {
    audio = new Audio();
    audio.preload = 'auto';
    audio.addEventListener('timeupdate', update);
    audio.addEventListener('ended', function () {
      if (mode !== 'voice') return;
      cancelAnimationFrame(raf);
      lightTo(999);
      elapsedBefore += voiceData.lines[line].duration;
      if (line + 1 < SCRIPT.length) timers.push(setTimeout(function () { voiceLine(line + 1); }, 280));
      else { mode = 'done'; setPlaying(false); }
    });

    playBtn.addEventListener('click', function () {
      if (mode === 'voice') pause();
      else play();
    });

    // the clips and their timing, if they've been made
    fetch('./assets/thea/thea.json', { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : null; }).then(function (data) {
      if (data && data.lines && data.lines.length === SCRIPT.length) {
        voiceData = data;
        // warm the first clip so the first press starts right away
        var warm = new Audio();
        warm.preload = 'auto';
        warm.src = data.lines[0].file;
      }
    }).catch(function () {});

    setLine(0);
  }

  // the silent subtitles only run while Thea's card is on screen
  whileVisible($('#g-thea'), function () { if (mode === 'idle' || mode === 'stopped') startSilent(); }, function () {
    if (mode === 'silent') { clear(); mode = 'stopped'; }
  }, 0.3);
})();
