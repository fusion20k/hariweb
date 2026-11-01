/*
 * Hari Tagalog - motion and behavior for every page.
 * Every page: a dusk landscape of dune grass that moves with the wind, drawn live on a canvas behind
 * the glass, plus the header, FAQ, plan tabs and reveals.
 * Home page: an opening title sequence that zooms through three cards, then Thea introduces Hari.
 * Her voice is the extension's premium voice, recorded ahead of time into assets/thea/, and the
 * subtitles light up word by word with it; before anyone presses play they run on their own, silently.
 */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('g-js');

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function smooth(t) { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); }
  function lerp(a, b, t) { return a + (b - a) * t; }

  var isHome = !!$('.g-home');

  /* ---------------------------------------------------- header + menu */
  var header = $('#site-header');
  var toggle = $('#menu-toggle');
  var stickyCta = $('.sticky-mobile-cta');

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
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.1 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ================================================== the dune landscape */
  var land = $('.g-land');
  if (!land) {
    // inner pages get the same landscape, a little calmer, under a touch of evening
    land = document.createElement('canvas');
    land.className = 'g-land';
    land.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(land, document.body.firstChild);
    var dusk0 = document.createElement('div');
    dusk0.className = 'g-dusk';
    dusk0.setAttribute('aria-hidden', 'true');
    dusk0.style.setProperty('--dusk', '0.35');
    document.body.insertBefore(dusk0, land.nextSibling);
  }

  var L = (function () {
    var ctx = land.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    var W = 0, H = 0, blades = [], bands = [], clouds = [];
    var BANDS = 7;
    var GREENS = [
      ['#8E9E8C', '#A3AF97', '#B7B38F'],
      ['#7C9180', '#93A48D', '#AFA985'],
      ['#6A8270', '#82987F', '#A49B76'],
      ['#587260', '#6E8770', '#968C68'],
      ['#47614F', '#5C7761', '#857A59'],
      ['#3A5243', '#4C6653', '#6F664A'],
      ['#2E4537', '#3D5646', '#5C553E']
    ];

    function horizon() { return H * 0.43; }

    function build() {
      W = window.innerWidth;
      H = window.innerHeight;
      land.width = Math.round(W * dpr);
      land.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.round(clamp(W * H / (isHome ? 520 : 800), 700, isHome ? 3600 : 2200));
      blades = [];
      var hz = horizon();
      for (var i = 0; i < count; i++) {
        // more blades toward the front, where each one is also taller and bolder
        var depth = Math.pow(Math.random(), 0.7);
        var y = hz + 12 + depth * (H * 1.08 - hz);
        var band = Math.min(BANDS - 1, Math.floor(depth * BANDS));
        blades.push({
          x: Math.random() * (W + 80) - 40,
          y: y,
          h: (12 + depth * depth * 150) * (0.7 + Math.random() * 0.6),
          lean: (Math.random() - 0.35) * 0.5,
          ph: Math.random() * 6.28,
          band: band,
          tone: Math.random() < 0.62 ? 0 : (Math.random() < 0.72 ? 1 : 2)
        });
      }
      blades.sort(function (a, b) { return a.y - b.y; });
      bands = [];
      for (var b = 0; b < BANDS; b++) bands.push([[], [], []]);
      blades.forEach(function (bl) { bands[bl.band][bl.tone].push(bl); });
      clouds = [];
      for (var c = 0; c < 5; c++) clouds.push({ x: Math.random() * W, y: H * (0.08 + Math.random() * 0.22), w: W * (0.3 + Math.random() * 0.35), h: 14 + Math.random() * 26, v: 4 + Math.random() * 8 });
    }

    function hills(t, hz, lift) {
      // three soft dune lines in haze, the farthest palest
      var layers = [
        { c: 'rgba(150,160,150,0.55)', a: 10, f: 0.004, o: 0, y: -2 },
        { c: 'rgba(118,136,120,0.7)', a: 18, f: 0.0026, o: 2.1, y: 10 },
        { c: 'rgba(96,116,100,0.85)', a: 26, f: 0.0018, o: 4.3, y: 24 }
      ];
      layers.forEach(function (l) {
        ctx.fillStyle = l.c;
        ctx.beginPath();
        ctx.moveTo(0, H);
        for (var x = 0; x <= W + 20; x += 20) {
          var y = hz + l.y + lift - Math.sin(x * l.f + l.o) * l.a - Math.sin(x * l.f * 2.7 + l.o * 1.3) * l.a * 0.35;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(W, H);
        ctx.closePath();
        ctx.fill();
      });
    }

    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      var lift = isHome ? -Math.min(window.scrollY * 0.06, H * 0.1) : 0;
      var hz = horizon() + lift;

      // sun low on the horizon, and the glow it leaves in the sky
      var sx = W * 0.72, sy = hz - 6;
      var sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, W * 0.45);
      sg.addColorStop(0, 'rgba(255,226,190,0.55)');
      sg.addColorStop(0.3, 'rgba(250,206,180,0.18)');
      sg.addColorStop(1, 'rgba(250,206,180,0)');
      ctx.fillStyle = sg;
      ctx.fillRect(0, 0, W, hz + 40);

      // clouds drifting in thin bands
      clouds.forEach(function (c) {
        var x = ((c.x + t * c.v) % (W + c.w * 2)) - c.w;
        var g = ctx.createRadialGradient(x, c.y, 0, x, c.y, c.w * 0.5);
        g.addColorStop(0, 'rgba(255,240,236,0.28)');
        g.addColorStop(1, 'rgba(255,240,236,0)');
        ctx.save();
        ctx.translate(x, c.y);
        ctx.scale(1, c.h / (c.w * 0.5));
        ctx.translate(-x, -c.y);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, c.y, c.w * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // a strip of sea on the left, catching a little light
      var sea = ctx.createLinearGradient(0, 0, W * 0.4, 0);
      sea.addColorStop(0, 'rgba(176,186,196,0.9)');
      sea.addColorStop(1, 'rgba(176,186,196,0)');
      ctx.fillStyle = sea;
      ctx.fillRect(0, hz - 8, W * 0.4, 9);

      hills(t, hz, 0);

      // the ground under the grass
      var gr = ctx.createLinearGradient(0, hz + 10, 0, H);
      gr.addColorStop(0, '#6E8672');
      gr.addColorStop(0.4, '#4A6352');
      gr.addColorStop(1, '#22342A');
      ctx.fillStyle = gr;
      ctx.beginPath();
      ctx.moveTo(0, H);
      for (var x = 0; x <= W + 20; x += 20) ctx.lineTo(x, hz + 30 - Math.sin(x * 0.0018 + 4.3) * 20);
      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.fill();

      // the grass, band by band from the back, each band in three tones
      var gustT = t * 0.55;
      for (var b = 0; b < BANDS; b++) {
        ctx.lineWidth = 0.6 + b * 0.32;
        for (var tone = 0; tone < 3; tone++) {
          var set = bands[b][tone];
          if (!set.length) continue;
          ctx.strokeStyle = GREENS[b][tone];
          ctx.beginPath();
          for (var i = 0; i < set.length; i++) {
            var bl = set[i];
            var by = bl.y + lift * (1 - b / BANDS);
            // a gust rolls across the field from left to right
            var gust = Math.sin(gustT - bl.x * 0.0035 + bl.y * 0.002) * 0.42;
            var sway = Math.sin(t * 1.6 + bl.ph + bl.x * 0.01) * 0.12;
            var a = bl.lean + 0.25 + gust * (0.5 + b * 0.08) + sway;
            var tx = bl.x + Math.sin(a) * bl.h;
            var ty = by - Math.cos(a) * bl.h;
            ctx.moveTo(bl.x, by);
            ctx.quadraticCurveTo(bl.x + Math.sin(a * 0.4) * bl.h * 0.4, by - bl.h * 0.6, tx, ty);
          }
          ctx.stroke();
        }
      }
    }

    build();
    var rT;
    window.addEventListener('resize', function () { clearTimeout(rT); rT = setTimeout(function () { build(); if (reduce) draw(0); }, 150); });

    var running = !document.hidden;
    var t0 = performance.now();
    function frame(now) {
      if (!running) return;
      draw((now - t0) / 1000);
      if (!reduce) requestAnimationFrame(frame);
    }
    document.addEventListener('visibilitychange', function () {
      running = !document.hidden;
      if (running && !reduce) requestAnimationFrame(frame);
    });
    requestAnimationFrame(frame);
    return { draw: draw };
  })();

  // evening falls as you scroll down the home page
  if (isHome) {
    var duskEl = $('.g-dusk');
    var onDusk = function () {
      var vh = window.innerHeight;
      if (duskEl) duskEl.style.setProperty('--dusk', clamp((window.scrollY - vh * 0.5) / (vh * 1.1), 0, 1).toFixed(3));
      if (stickyCta) stickyCta.classList.toggle('is-visible', window.scrollY > vh * 0.7);
    };
    window.addEventListener('scroll', onDusk, { passive: true });
    onDusk();
  }

  if (!isHome) return;

  /* ======================================================= the widgets */
  function whileVisible(el, start, stop) {
    if (!el) return;
    if (reduce || !('IntersectionObserver' in window)) { start(); return; }
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) start(); else stop();
    }, { threshold: 0.3 }).observe(el);
  }

  $$('[data-swap]').forEach(function (box) {
    var words = $$('.g-word', box);
    words.forEach(function (w) {
      var en = w.textContent;
      w.textContent = '';
      var a = document.createElement('span'); a.className = 'g-en'; a.textContent = en;
      var b = document.createElement('span'); b.className = 'g-tl'; b.textContent = w.getAttribute('data-tl');
      w.appendChild(a); w.appendChild(b);
    });
    if (reduce) { words.forEach(function (w) { w.classList.add('is-tl'); }); return; }
    var timer = 0, n = 0;
    function step() {
      if (n < words.length) { words[n++].classList.add('is-tl'); timer = setTimeout(step, 750); return; }
      timer = setTimeout(function () {
        words.forEach(function (w) { w.classList.remove('is-tl'); });
        n = 0;
        timer = setTimeout(step, 1300);
      }, 3600);
    }
    whileVisible(box, function () { if (!timer) timer = setTimeout(step, 500); }, function () { clearTimeout(timer); timer = 0; });
  });

  $$('[data-subs]').forEach(function (box) {
    var subs = $$('p', box);
    var i = 0, timer = 0;
    function next() {
      subs[i].classList.remove('is-on');
      i = (i + 1) % subs.length;
      subs[i].classList.add('is-on');
      timer = setTimeout(next, 3200);
    }
    if (reduce) return;
    whileVisible(box, function () { if (!timer) timer = setTimeout(next, 3200); }, function () { clearTimeout(timer); timer = 0; });
  });

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
  function follow() {
    if (mode !== 'voice' || !audio) return;
    var d = voiceData.lines[line];
    var t = audio.currentTime;
    var k = -1;
    for (var c = 0; c < d.starts.length; c++) { if (d.starts[c] <= t) k = c; else break; }
    lightTo(k);
    showTime(elapsedBefore + t);
    raf = requestAnimationFrame(follow);
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

  function setPlaying(on) {
    playBtn.classList.toggle('is-playing', on);
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

  /* ===================================================== opening titles */
  var intro = $('#g-intro');
  var cards = $$('.g-card', intro || document);
  var bar = $('.g-intro-bar i');
  var HOLD = 1.7, ZOOM = 0.95, SEG = HOLD + ZOOM;
  var introDone = false;

  function endIntro() {
    if (introDone) return;
    introDone = true;
    if (intro) intro.classList.add('is-done');
    document.body.classList.remove('intro-on');
    try { sessionStorage.setItem('hari:introSeen', '1'); } catch (_) {}
    setTimeout(startSilent, 700);
  }

  function cardFrame(card, d) {
    // d < 0: waiting beneath, d = 0: on screen, d > 0: the camera flying through it
    var sun = $('.g-card-sun', card), halo = $('.g-card-halo', card), glint = $('.g-card-glint', card);
    var subj = $('.g-card-subject', card), title = $('.g-card-title', card), note = $('.g-card-note', card);
    if (d <= -1 || d >= 1) { card.style.opacity = '0'; return; }
    var k, e, op;
    if (d >= 0) {
      k = d; e = k * k;
      op = 1 - smooth((k - 0.3) / 0.55);
      sun.style.transform = 'scale(' + (1 + e * 5) + ')';
      halo.style.transform = 'scale(' + (1 + e * 7) + ')';
      glint.style.transform = 'scale(' + (1 + e * 4) + ',' + (1 + e * 2) + ')';
      subj.style.transform = 'scale(' + (1 + e * 5) + ') translateY(' + (e * 160) + 'px)';
      subj.style.opacity = String(1 - smooth((k - 0.05) / 0.4));
      title.style.transform = 'translateX(' + (-k * 30) + 'vw)';
      title.style.opacity = String(clamp(1 - k * 2.4, 0, 1));
      note.style.opacity = String(clamp(1 - k * 2.4, 0, 1));
    } else {
      k = -d;
      op = 1 - smooth((k - 0.15) / 0.85);
      sun.style.transform = 'scale(' + (1 - k * 0.5) + ')';
      halo.style.transform = 'scale(' + (1 - k * 0.35) + ')';
      glint.style.transform = 'scale(' + (1 - k * 0.5) + ',1)';
      subj.style.transform = 'scale(' + (1 - k * 0.55) + ')';
      subj.style.opacity = '1';
      title.style.transform = 'translateY(' + (k * 60) + 'px)';
      title.style.opacity = String(clamp(1 - k * 2.2, 0, 1));
      note.style.opacity = String(clamp(1 - k * 2.2, 0, 1));
    }
    card.style.opacity = op.toFixed(3);
  }

  var seen = false;
  try { seen = sessionStorage.getItem('hari:introSeen') === '1'; } catch (_) {}

  if (!intro || reduce || seen) {
    if (intro) intro.classList.add('is-done');
    introDone = true;
    setTimeout(startSilent, 400);
  } else {
    document.body.classList.add('intro-on');
    var skip = $('#g-intro-skip');
    if (skip) skip.addEventListener('click', endIntro);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' || e.key === 'Enter') endIntro(); }, { once: true });
    var start = performance.now() + 250;
    var total = SEG * cards.length;
    cards.forEach(function (c, i) { cardFrame(c, i === 0 ? -0.6 : -1); });
    var run = function (now) {
      if (introDone) return;
      var t = Math.max(0, (now - start) / 1000);
      if (t >= total) { endIntro(); return; }
      var seg = Math.floor(t / SEG);
      var local = t - seg * SEG;
      // the first card settles in from far away, then each holds before the camera flies on
      var pos = seg + smooth((local - HOLD) / ZOOM);
      if (seg === 0 && local < 0.8) pos = -0.6 + smooth(local / 0.8) * 0.6;
      cards.forEach(function (c, i) { cardFrame(c, pos - i); });
      if (bar) bar.style.width = (t / total * 100).toFixed(1) + '%';
      requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  }
})();
