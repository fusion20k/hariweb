/*
 * Hari Tagalog - motion and behavior for every page.
 * Home page: the poster arrives word by word, the sampaguita opens, flares follow the mouse, and the
 * five episodes zoom into one another as you scroll, each mockup playing only while its episode is on.
 * Sampaguita petals drift across the page. Every page: header, menus, FAQ, plan tabs and reveals.
 */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('p-js');

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function smooth(t) { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  /* ---------------------------------------------------- header + menus */
  var header = $('#site-header');
  var toggle = $('#menu-toggle');
  var stickyCta = $('.sticky-mobile-cta');
  var lockScrolled = header && header.classList.contains('is-scrolled');

  function onScrollUi() {
    var y = window.scrollY;
    if (header && !lockScrolled) header.classList.toggle('is-scrolled', y > 30);
    if (stickyCta) stickyCta.classList.toggle('is-visible', y > 600);
  }

  window.addEventListener('scroll', onScrollUi, { passive: true });
  onScrollUi();

  var bigMenu = $('#p-menu');
  if (toggle && bigMenu) {
    // home page: a full screen menu that opens from the button
    var setMenu = function (open) {
      root.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      bigMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
    };
    toggle.addEventListener('click', function () { setMenu(!root.classList.contains('menu-open')); });
    $$('a', bigMenu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  } else if (toggle && header) {
    // inner pages: the drop-down list
    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    $$('.nav-links a', header).forEach(function (a) {
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

  /* ------------------------------------------------------- pricing tabs */
  var table = $('.p-table');
  if (table) {
    $$('.p-tabs [data-filter]').forEach(function (btn, _, all) {
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
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ====================================================== home page only */
  var hero = $('.p-hero');
  if (!hero) return;

  // each bloom gets its own copy of the flower, so its rings can open and sway
  var flower = $('#pg-flower');
  $$('svg.p-bloom').forEach(function (svg) {
    var use = $('use', svg);
    if (!flower || !use) return;
    var g = flower.cloneNode(true);
    g.removeAttribute('id');
    svg.replaceChild(g, use);
  });

  requestAnimationFrame(function () { setTimeout(function () { hero.classList.add('is-ready'); }, 60); });

  // flares and the bloom lean toward the mouse
  if (!reduce && window.matchMedia('(hover: hover)').matches) {
    $$('.p-hero, .p-final').forEach(function (sec) {
      sec.addEventListener('mousemove', function (e) {
        var r = sec.getBoundingClientRect();
        sec.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
        sec.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
      });
    });
  }

  /* --------------------------------------------- mockups that play */
  function swapEngine(box) {
    var words = $$('.ui-w', box);
    words.forEach(function (w) {
      var en = w.textContent;
      w.textContent = '';
      var a = document.createElement('span'); a.className = 'ui-en'; a.textContent = en;
      var b = document.createElement('span'); b.className = 'ui-tl'; b.textContent = w.getAttribute('data-tl');
      w.appendChild(a); w.appendChild(b);
    });
    var timer = 0, n = 0;
    function step() {
      if (n < words.length) { words[n++].classList.add('is-tl'); timer = setTimeout(step, 700); return; }
      timer = setTimeout(function () {
        words.forEach(function (w) { w.classList.remove('is-tl'); });
        n = 0;
        timer = setTimeout(step, 1300);
      }, 3400);
    }
    return {
      start: function () { if (reduce) { words.forEach(function (w) { w.classList.add('is-tl'); }); return; } if (!timer) timer = setTimeout(step, 400); },
      stop: function () { clearTimeout(timer); timer = 0; }
    };
  }

  function chatEngine(box) {
    var msgs = $$('.ui-msg', box);
    var timers = [];
    function clear() { timers.forEach(clearTimeout); timers = []; }
    function play() {
      clear();
      msgs.forEach(function (m) { m.classList.remove('is-shown', 'is-gone'); });
      var t = 250;
      msgs.forEach(function (m) {
        timers.push(setTimeout(function () { m.classList.add('is-shown'); }, t));
        if (m.classList.contains('ui-msg--typing')) {
          t += 1300;
          timers.push(setTimeout(function () { m.classList.add('is-gone'); }, t));
        } else {
          t += m.classList.contains('ui-msg--me') ? 1100 : 2000;
        }
      });
      timers.push(setTimeout(play, t + 4000));
    }
    return {
      start: function () { if (reduce) { msgs.forEach(function (m) { m.classList.add('is-shown'); }); return; } if (!timers.length) play(); },
      stop: clear
    };
  }

  function subsEngine(box) {
    var subs = $$('.ui-sub', box);
    var i = 0, timer = 0;
    function next() {
      subs[i].classList.remove('is-on');
      i = (i + 1) % subs.length;
      subs[i].classList.add('is-on');
      timer = setTimeout(next, 3600);
    }
    return {
      start: function () { if (!reduce && !timer) timer = setTimeout(next, 3600); },
      stop: function () { clearTimeout(timer); timer = 0; }
    };
  }

  var section = $('.p-eps');
  var eps = $$('.p-ep');
  var engines = eps.map(function (ep) {
    var s = $('[data-swap]', ep), c = $('[data-chat]', ep), u = $('[data-subs]', ep);
    return s ? swapEngine(s) : c ? chatEngine(c) : u ? subsEngine(u) : null;
  });

  var countNum = $('.p-ep-count b');
  var countBar = $('.p-ep-count span');
  var current = -1;

  function setCurrent(i) {
    if (i === current) return;
    engines.forEach(function (en, k) { if (en && k !== i) en.stop(); });
    current = i;
    if (engines[i]) engines[i].start();
    if (countNum) countNum.textContent = pad(i + 1);
  }

  function pinned() { return window.innerWidth > 760 && !reduce; }

  // scrolling through the pinned stage: hold each episode, then zoom through it into the next
  function epFrame() {
    if (!section || !eps.length) return;
    if (!pinned()) {
      eps.forEach(function (ep) {
        ep.classList.add('is-live');
        ep.style.opacity = '';
        $$('.p-ep-sun, .p-ep-halo, .p-ep-subject, .p-ep-text, .p-ep-side, .p-ep-glint', ep).forEach(function (el) { el.style.transform = ''; el.style.opacity = ''; });
      });
      return;
    }
    var vh = window.innerHeight, vw = window.innerWidth;
    var n = eps.length;
    var raw = clamp(-section.getBoundingClientRect().top / vh, 0, n - 1);
    var i0 = Math.floor(raw);
    var pos = i0 + smooth((raw - i0 - 0.3) / 0.7);

    eps.forEach(function (ep, i) {
      var d = pos - i;
      if (d <= -1 || d >= 1) { ep.classList.remove('is-live'); ep.style.opacity = '0'; return; }
      ep.classList.add('is-live');
      ep.style.zIndex = String(n - i);
      var sun = $('.p-ep-sun', ep), halo = $('.p-ep-halo', ep), glint = $('.p-ep-glint', ep);
      var subj = $('.p-ep-subject', ep), text = $('.p-ep-text', ep), side = $('.p-ep-side', ep);
      var op, k, e;
      if (d >= 0) {
        // leaving: the camera flies into the scene
        // leaving: the camera flies into the scene; the subject rushes past first, then the sun
        k = d; e = k * k;
        op = 1 - smooth((k - 0.25) / 0.5);
        sun.style.transform = 'scale(' + (1 + e * 5).toFixed(3) + ')';
        halo.style.transform = 'scale(' + (1 + e * 7).toFixed(3) + ')';
        glint.style.transform = 'scale(' + (1 + e * 4).toFixed(3) + ', ' + (1 + e * 2).toFixed(3) + ')';
        subj.style.transform = 'scale(' + (1 + e * 5).toFixed(3) + ') translateY(' + (e * vh * 0.25).toFixed(1) + 'px)';
        subj.style.opacity = String(1 - smooth((k - 0.05) / 0.35));
        text.style.transform = 'translateX(' + (-k * vw * 0.3).toFixed(1) + 'px)';
        text.style.opacity = String(clamp(1 - k * 2.6, 0, 1));
        if (side) { side.style.transform = 'translateX(' + (k * vw * 0.22).toFixed(1) + 'px)'; side.style.opacity = String(clamp(1 - k * 2.6, 0, 1)); }
      } else {
        // arriving: the next scene waits small and dim beneath, then settles
        k = -d;
        op = 1 - smooth((k - 0.15) / 0.85);
        sun.style.transform = 'scale(' + (1 - k * 0.5).toFixed(3) + ')';
        halo.style.transform = 'scale(' + (1 - k * 0.35).toFixed(3) + ')';
        glint.style.transform = 'scale(' + (1 - k * 0.5).toFixed(3) + ', 1)';
        subj.style.transform = 'scale(' + (1 - k * 0.55).toFixed(3) + ')';
        subj.style.opacity = '1';
        text.style.transform = 'translateX(' + (k * vw * 0.08).toFixed(1) + 'px)';
        text.style.opacity = String(clamp(1 - k * 2.4, 0, 1));
        if (side) { side.style.transform = 'translateX(' + (-k * vw * 0.06).toFixed(1) + 'px)'; side.style.opacity = String(clamp(1 - k * 2.4, 0, 1)); }
      }
      ep.style.opacity = op.toFixed(3);
    });

    if (countBar) countBar.style.height = (pos / (n - 1) * 100).toFixed(1) + '%';
    var r = section.getBoundingClientRect();
    if (r.bottom > 0 && r.top < vh) setCurrent(Math.round(pos)); else setCurrent(-1);
  }

  // on phones the episodes stack, so each mockup plays while it is on screen
  if (!pinned() && 'IntersectionObserver' in window) {
    var mio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var en = engines[eps.indexOf(e.target)];
        if (!en) return;
        if (e.isIntersecting) en.start(); else en.stop();
      });
    }, { threshold: 0.4 });
    eps.forEach(function (ep) { mio.observe(ep); });
  }

  /* the SALAMAT lines behind the creator drift apart as you pass */
  var drifters = $$('[data-drift]');
  function driftFrame() {
    var vh = window.innerHeight, vw = window.innerWidth;
    drifters.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -300 || r.top > vh + 300) return;
      var p = (r.top + r.height / 2 - vh / 2) / vh;
      el.style.transform = 'translateX(' + (p * vw * 0.12 * parseFloat(el.getAttribute('data-drift'))).toFixed(1) + 'px)';
    });
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; epFrame(); if (!reduce) driftFrame(); });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  epFrame();
  if (!pinned() && eps.length) { /* engines start through the observer */ } else setCurrent(0);
  driftFrame();

  /* --------------------------------------- sampaguita petals drifting */
  var canvas = $('.p-petals');
  if (canvas && !reduce) {
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    var W = 0, H = 0, petals = [];
    var size = function () {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    window.addEventListener('resize', size);
    var count = W < 760 ? 7 : 14;
    var spawn = function (anywhere) {
      return {
        x: Math.random() * W * 1.2 - W * 0.1,
        y: anywhere ? Math.random() * H : -30,
        s: 6 + Math.random() * 7,
        vx: 0.15 + Math.random() * 0.35,
        vy: 0.25 + Math.random() * 0.45,
        a: Math.random() * 6.28,
        va: (Math.random() - 0.5) * 0.02,
        f: Math.random() * 6.28,
        o: 0.75 + Math.random() * 0.25
      };
    };
    for (var pi = 0; pi < count; pi++) petals.push(spawn(true));
    var lastY = window.scrollY;
    var running = true;
    document.addEventListener('visibilitychange', function () { running = !document.hidden; if (running) requestAnimationFrame(frame); });
    var frame = function () {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      var dy = window.scrollY - lastY;
      lastY = window.scrollY;
      petals.forEach(function (p, i) {
        p.f += 0.02;
        p.x += p.vx + Math.sin(p.f) * 0.4;
        p.y += p.vy - dy * 0.15;
        p.a += p.va;
        if (p.y > H + 40 || p.x > W + 40 || p.y < -80) petals[i] = spawn(false);
        // a petal: a soft white teardrop that turns as it falls
        var flip = Math.abs(Math.cos(p.f * 0.7));
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.a);
        ctx.scale(1, 0.35 + flip * 0.65);
        // white petals with a warm glow, like the bloom they fell from
        var g = ctx.createLinearGradient(0, p.s, 0, -p.s);
        g.addColorStop(0, 'rgba(255,232,190,' + (p.o * 0.85).toFixed(2) + ')');
        g.addColorStop(0.5, 'rgba(255,252,246,' + p.o.toFixed(2) + ')');
        g.addColorStop(1, 'rgba(255,248,236,' + (p.o * 0.9).toFixed(2) + ')');
        ctx.shadowColor = 'rgba(255,240,215,0.75)';
        ctx.shadowBlur = 10;
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(0, p.s);
        ctx.bezierCurveTo(p.s * 0.9, p.s * 0.4, p.s * 0.7, -p.s * 0.8, 0, -p.s);
        ctx.bezierCurveTo(-p.s * 0.7, -p.s * 0.8, -p.s * 0.9, p.s * 0.4, 0, p.s);
        ctx.fill();
        ctx.restore();
      });
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }
})();
