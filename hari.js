/*
 * Hari Tagalog - motion and behavior for every page.
 * Headlines rise letter by letter, blocks blur up into place, giant lines slide with the scroll,
 * and three canvases paint light: dust in the hero beam, a silk sheet under the demo, and a turning
 * ribbon in the Premium section. Canvases only draw while on screen; reduced motion turns it all off.
 */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('hx-js');

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  /* ------------------------------------------------------------ header */
  var header = $('#site-header');
  var toggle = $('#menu-toggle');
  var backTop = $('#back-to-top');
  var stickyCta = $('.sticky-mobile-cta');
  var lockScrolled = header && header.classList.contains('is-scrolled');

  function onScrollUi() {
    var y = window.scrollY;
    if (header && !lockScrolled) header.classList.toggle('is-scrolled', y > 30);
    if (backTop) backTop.classList.toggle('is-visible', y > 900);
    if (stickyCta) stickyCta.classList.toggle('is-visible', y > 600);
  }

  window.addEventListener('scroll', onScrollUi, { passive: true });
  onScrollUi();

  if (toggle && header) {
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

  if (backTop) backTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });

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

  /* ------------------------------------------------ split headline text */
  function splitText(el) {
    var i = 0;
    function walk(node, out) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          child.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { out.appendChild(document.createTextNode(' ')); return; }
            var w = document.createElement('span');
            w.className = 'hx-w';
            Array.prototype.forEach.call(part, function (ch) {
              var c = document.createElement('span');
              c.className = 'hx-c';
              c.textContent = ch;
              c.style.setProperty('--i', i++);
              w.appendChild(c);
            });
            out.appendChild(w);
          });
        } else if (child.nodeType === 1) {
          var copy = child.cloneNode(false);
          walk(child, copy);
          out.appendChild(copy);
        }
      });
    }
    var frag = document.createDocumentFragment();
    walk(el, frag);
    if (!el.getAttribute('aria-label')) {
      var label = el.cloneNode(true);
      $$('br', label).forEach(function (br) { br.replaceWith(' '); });
      el.setAttribute('aria-label', label.textContent.replace(/\s+/g, ' ').trim());
    }
    el.textContent = '';
    el.appendChild(frag);
    $$('.hx-w', el).forEach(function (w) { w.setAttribute('aria-hidden', 'true'); });
  }

  // gradient words: each letter shows its own slice of one gradient across the whole word group
  function paintGradients() {
    // measure with the letters standing up, not mid-animation
    root.classList.add('hx-measure');
    $$('[data-split] em').forEach(function (em) {
      var box = em.getBoundingClientRect();
      $$('.hx-c', em).forEach(function (c) {
        var b = c.getBoundingClientRect();
        c.style.backgroundImage = 'linear-gradient(100deg, #FFE2B0 0%, #F4BA4F 40%, #E58B3A 100%)';
        c.style.backgroundSize = (box.width + 20) + 'px 100%';
        c.style.backgroundPosition = (box.left - b.left).toFixed(1) + 'px 0';
      });
    });
    root.classList.remove('hx-measure');
  }

  var splits = $$('[data-split]');
  splits.forEach(splitText);
  if (splits.length) {
    var gStyle = document.createElement('style');
    gStyle.textContent = '.hx-measure [data-split] .hx-c{transform:none!important;transition:none!important}[data-split] em{background:none!important}[data-split] em .hx-c{-webkit-background-clip:text;background-clip:text;color:transparent;background-repeat:no-repeat;padding:0 .09em .06em;margin:0 -.09em -.06em}';
    document.head.appendChild(gStyle);
    paintGradients();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(paintGradients);
    var rT;
    window.addEventListener('resize', function () { clearTimeout(rT); rT = setTimeout(paintGradients, 150); });
  }

  /* ----------------------------------------------------- reveal on view */
  var revealEls = $$('[data-rv], [data-split], [data-frame]');
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

  /* ------------------------------------------------------------ counters */
  function runCount(el) {
    var to = parseFloat(el.getAttribute('data-count')) || 0;
    if (reduce || to === 0) { el.textContent = to.toLocaleString(); return; }
    var start = performance.now();
    var dur = 1800;
    (function step(now) {
      var p = clamp((now - start) / dur, 0, 1);
      var eased = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(to * eased).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    })(start);
  }

  var counts = $$('[data-count]');
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        runCount(e.target);
        cio.unobserve(e.target);
      });
    }, { threshold: 0.6 });
    counts.forEach(function (el) { cio.observe(el); });
  } else {
    counts.forEach(runCount);
  }

  /* ------------------------------------------------- scroll-driven lines */
  var drifters = $$('[data-scroll-x]');
  var ticking = false;

  function drift() {
    ticking = false;
    var vh = window.innerHeight;
    var vw = window.innerWidth;
    drifters.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      var p = (r.top + r.height / 2 - vh / 2) / vh;
      var speed = parseFloat(el.getAttribute('data-scroll-x')) || 0;
      el.style.transform = 'translate3d(' + (p * speed * vw).toFixed(1) + 'px,0,0)';
    });
  }

  if (!reduce && drifters.length) {
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(drift); }
    }, { passive: true });
    window.addEventListener('resize', drift);
    drift();
  }

  /* -------------------------------------------------------------- tilt */
  if (!reduce && window.matchMedia('(hover: hover)').matches) {
    $$('[data-tilt]').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'rotateY(' + (x * 8).toFixed(2) + 'deg) rotateX(' + (-y * 8).toFixed(2) + 'deg)';
      });
      card.addEventListener('mouseleave', function () { card.style.transform = ''; });
    });
  }

  /* ------------------------------------------------------- pricing tabs */
  var table = $('.plan-table');
  if (table) {
    var group = '';
    $$('tbody tr', table).forEach(function (tr) {
      if (tr.classList.contains('cmp-group')) group = tr.textContent.trim().split(/\s/)[0];
      tr.setAttribute('data-g', group);
    });
    $$('.hx-tabs [data-filter]').forEach(function (btn, _, all) {
      btn.addEventListener('click', function () {
        var f = btn.getAttribute('data-filter');
        all.forEach(function (b) { b.setAttribute('aria-selected', b === btn ? 'true' : 'false'); });
        $$('tbody tr', table).forEach(function (tr) {
          tr.classList.toggle('is-hidden', f !== 'all' && tr.getAttribute('data-g') !== f);
        });
      });
    });
  }

  /* -------------------------------------------------------- demo video */
  var vFrame = $('#demo-video-frame');
  var video = $('#demo-video');
  var playBtn = $('#demo-video-play');
  if (vFrame && video) {
    var tryPlay = function () {
      var p = video.play();
      if (p && p.catch) p.catch(function () { vFrame.classList.add('needs-tap'); });
    };
    if (playBtn) playBtn.addEventListener('click', function () { video.muted = true; tryPlay(); });
    video.addEventListener('play', function () { vFrame.classList.remove('needs-tap'); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { if (!reduce) tryPlay(); }
          else video.pause();
        });
      }, { threshold: 0.25 }).observe(vFrame);
    }
  }

  /* --------------------------------------------------- canvas plumbing */
  // a canvas loop that only runs while its canvas is on screen
  function painter(canvas, draw, opts) {
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0, on = false, raf = 0, t0 = performance.now();
    var state = {};

    function size() {
      var r = canvas.getBoundingClientRect();
      w = Math.max(1, r.width);
      h = Math.max(1, r.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (opts && opts.init) opts.init(state, w, h);
    }

    function frame(now) {
      raf = 0;
      if (!on) return;
      ctx.clearRect(0, 0, w, h);
      draw(ctx, w, h, (now - t0) / 1000, state);
      if (!reduce) raf = requestAnimationFrame(frame);
    }

    size();
    window.addEventListener('resize', function () { size(); if (reduce) frame(performance.now()); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        on = entries[0].isIntersecting;
        if (on && !raf) raf = requestAnimationFrame(frame);
      }).observe(canvas);
    } else {
      on = true;
      raf = requestAnimationFrame(frame);
    }
  }

  /* -------------------------------------------- hero: beam, dust, words */
  var hero = $('.hx-hero');
  if (hero) {
    requestAnimationFrame(function () { hero.classList.add('is-lit'); });
    $$('.hx-hero [data-rv], .hx-hero [data-split]').forEach(function (el) {
      setTimeout(function () { el.classList.add('is-in'); }, 250);
    });

    var floaters = $('.hx-floaters');
    if (floaters && !reduce && window.matchMedia('(hover: hover)').matches) {
      hero.addEventListener('mousemove', function (e) {
        var r = hero.getBoundingClientRect();
        floaters.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
        floaters.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
      });
      $$('span', floaters).forEach(function (s) { s.style.transform = ''; });
    }
  }

  painter($('.hx-dust'), function (ctx, w, h, t, s) {
    s.dots.forEach(function (d) {
      d.y -= d.v;
      d.x += Math.sin(t * d.f + d.p) * 0.15;
      if (d.y < -10) { d.y = h + 10; d.x = Math.random() * w; }
      // brighter inside the beam, near the centre
      var beam = 1 - clamp(Math.abs(d.x - w / 2) / (w * 0.32), 0, 1);
      var tw = 0.5 + 0.5 * Math.sin(t * d.f * 3 + d.p);
      var a = (0.08 + beam * 0.55) * tw;
      ctx.beginPath();
      ctx.fillStyle = d.warm ? 'rgba(244,186,79,' + a.toFixed(3) + ')' : 'rgba(255,236,205,' + a.toFixed(3) + ')';
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }, {
    init: function (s, w, h) {
      var n = Math.round(clamp(w * h / 9000, 40, 140));
      s.dots = [];
      for (var i = 0; i < n; i++) {
        s.dots.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.4 + 0.3, v: Math.random() * 0.25 + 0.05, f: Math.random() * 0.8 + 0.2, p: Math.random() * 6.28, warm: Math.random() < 0.4 });
      }
    }
  });

  /* ------------------------------------------- demo: a sheet of silk light */
  painter($('.hx-silk'), function (ctx, w, h, t) {
    var lines = w < 700 ? 26 : 44;
    var midY = h * 0.55;
    for (var i = 0; i < lines; i++) {
      var k = i / (lines - 1);
      ctx.beginPath();
      for (var x = 0; x <= w; x += 8) {
        var u = x / w;
        var env = Math.sin(u * Math.PI);
        var y = midY
          + Math.sin(u * 5.2 + t * 0.35 + k * 1.6) * h * 0.16 * env
          + Math.sin(u * 2.1 - t * 0.22 + k * 0.9) * h * 0.1
          + (k - 0.5) * h * 0.22 * (0.6 + 0.4 * Math.sin(u * 3 + t * 0.2));
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      var g = ctx.createLinearGradient(0, 0, w, 0);
      var a = 0.05 + 0.22 * Math.pow(Math.sin(k * Math.PI), 2);
      g.addColorStop(0, 'rgba(229,139,58,0)');
      g.addColorStop(0.3, 'rgba(244,186,79,' + a.toFixed(3) + ')');
      g.addColorStop(0.6, 'rgba(255,226,176,' + (a * 1.2).toFixed(3) + ')');
      g.addColorStop(1, 'rgba(229,139,58,0)');
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.1;
      ctx.stroke();
    }
  });

  /* ------------------------------------------ premium: a turning ribbon */
  painter($('.hx-helix'), function (ctx, w, h, t) {
    var cx = w / 2;
    var amp = w * 0.3;
    var turns = 1.6;
    var step = 3;
    var segs = [];
    for (var y = -20; y <= h + 20; y += step) {
      var a = (y / h) * Math.PI * 2 * turns + t * 0.7;
      for (var s = 0; s < 2; s++) {
        var ang = a + s * Math.PI;
        segs.push({ s: s, y: y, x: cx + Math.sin(ang) * amp, z: Math.cos(ang), tw: Math.abs(Math.cos(a * 1 + s)) });
      }
    }
    // back half first, then the front, so the ribbon passes in front of itself
    segs.sort(function (p, q) { return p.z - q.z; });
    segs.forEach(function (p) {
      var depth = (p.z + 1) / 2;
      var width = 16 + depth * 60 * (0.4 + 0.6 * p.tw);
      var light = 0.3 + depth * 0.7;
      var g = ctx.createLinearGradient(p.x - width / 2, 0, p.x + width / 2, 0);
      // a dark rim first, so the front of the ribbon cuts cleanly across the words behind it
      g.addColorStop(0, 'rgba(13,16,17,' + (0.9 * depth).toFixed(3) + ')');
      g.addColorStop(0.12, 'rgba(201,99,47,' + (0.55 * light).toFixed(3) + ')');
      g.addColorStop(0.42, 'rgba(255,236,205,' + light.toFixed(3) + ')');
      g.addColorStop(0.62, 'rgba(244,186,79,' + (0.95 * light).toFixed(3) + ')');
      g.addColorStop(0.88, 'rgba(160,80,35,' + (0.6 * light).toFixed(3) + ')');
      g.addColorStop(1, 'rgba(13,16,17,' + (0.9 * depth).toFixed(3) + ')');
      ctx.fillStyle = g;
      ctx.fillRect(p.x - width / 2, p.y, width, step + 1);
    });
    // a soft glow where the strands cross
    var glow = ctx.createRadialGradient(cx, h / 2, 0, cx, h / 2, w * 0.5);
    glow.addColorStop(0, 'rgba(244,186,79,0.18)');
    glow.addColorStop(1, 'rgba(244,186,79,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);
  });
})();
