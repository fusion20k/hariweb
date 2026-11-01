/*
 * Hari Tagalog - motion and behavior for every page.
 * Home page: a wireframe mountain range drifts behind the chapters, a gold string-art figure morphs
 * into each chapter's shape and follows its frame, panels turn in 3D as they pass, the ruler at the
 * bottom tracks your place, and the mockups play themselves while they're on screen.
 * Every page: the header, phone menu, FAQ, and headlines that rise in letter by letter.
 */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('tl-js');

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }

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
    var label = el.cloneNode(true);
    $$('br', label).forEach(function (br) { br.replaceWith(' '); });
    el.setAttribute('aria-label', label.textContent.replace(/\s+/g, ' ').trim());

    function walk(node, out) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          child.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { out.appendChild(document.createTextNode(' ')); return; }
            var w = document.createElement('span');
            w.className = 'tl-w';
            w.setAttribute('aria-hidden', 'true');
            Array.prototype.forEach.call(part, function (ch) {
              var c = document.createElement('span');
              c.className = 'tl-c';
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
    el.textContent = '';
    el.appendChild(frag);
  }

  // gradient words: each letter shows its own slice of one gradient across the whole phrase
  function paintGradients() {
    root.classList.add('tl-measure');
    $$('[data-split] em').forEach(function (em) {
      var box = em.getBoundingClientRect();
      $$('.tl-c', em).forEach(function (c) {
        var b = c.getBoundingClientRect();
        c.style.backgroundImage = 'linear-gradient(100deg, #FFE2B0 0%, #F4BA4F 45%, #E58B3A 100%)';
        c.style.backgroundSize = (box.width + 20) + 'px 100%';
        c.style.backgroundPosition = (box.left - b.left).toFixed(1) + 'px 0';
      });
    });
    root.classList.remove('tl-measure');
  }

  var splits = $$('[data-split]');
  splits.forEach(splitText);
  if (splits.length) {
    var gStyle = document.createElement('style');
    gStyle.textContent = '.tl-measure [data-split] .tl-c{transform:none!important;transition:none!important}' +
      '[data-split] em{background:none!important}' +
      '[data-split] em .tl-c{-webkit-background-clip:text;background-clip:text;color:transparent;background-repeat:no-repeat;padding:0 .09em .08em;margin:0 -.09em -.08em}';
    document.head.appendChild(gStyle);
    paintGradients();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(paintGradients);
    var rT;
    window.addEventListener('resize', function () { clearTimeout(rT); rT = setTimeout(paintGradients, 150); });
  }

  /* ----------------------------------------------------- reveal on view */
  var revealEls = $$('[data-rv], [data-split]');
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

  /* ------------------------------------------------------- pricing tabs */
  var table = $('.tl-table');
  if (table) {
    $$('.tl-tabs [data-filter]').forEach(function (btn, _, all) {
      btn.addEventListener('click', function () {
        var f = btn.getAttribute('data-filter');
        all.forEach(function (b) { b.setAttribute('aria-selected', b === btn ? 'true' : 'false'); });
        $$('tbody tr[data-g]', table).forEach(function (tr) {
          tr.classList.toggle('is-hidden', f !== 'all' && tr.getAttribute('data-g') !== f);
        });
      });
    });
  }

  // run a looping mockup only while it is on screen
  function whileVisible(el, start, stop) {
    if (!el) return;
    if (reduce || !('IntersectionObserver' in window)) { start(); return; }
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) start(); else stop();
    }, { threshold: 0.3 }).observe(el);
  }

  /* --------------------------------------------- mockup: words swapping */
  $$('[data-swap]').forEach(function (box) {
    var words = $$('.mk-w', box);
    words.forEach(function (w) {
      var en = w.textContent;
      w.textContent = '';
      var a = document.createElement('span'); a.className = 'mk-en'; a.textContent = en;
      var b = document.createElement('span'); b.className = 'mk-tl'; b.textContent = w.getAttribute('data-tl');
      w.appendChild(a); w.appendChild(b);
    });
    if (reduce) { words.forEach(function (w) { w.classList.add('is-tl'); }); return; }
    var timer = 0, n = 0;
    function step() {
      if (n < words.length) { words[n++].classList.add('is-tl'); timer = setTimeout(step, 750); return; }
      timer = setTimeout(function () {
        words.forEach(function (w) { w.classList.remove('is-tl'); });
        n = 0;
        timer = setTimeout(step, 1400);
      }, 3600);
    }
    whileVisible(box, function () { if (!timer) timer = setTimeout(step, 500); }, function () { clearTimeout(timer); timer = 0; });
  });

  /* ------------------------------------------------- mockup: Thea chat */
  $$('[data-chat]').forEach(function (box) {
    var msgs = $$('.mk-msg', box);
    var typing = $('.mk-msg--typing', box);
    var timer = 0;
    function reset() { msgs.forEach(function (m) { m.classList.remove('is-shown', 'is-gone'); }); }
    function play() {
      reset();
      var t = 300;
      msgs.forEach(function (m) {
        if (m === typing) {
          timer = setTimeout(function () { m.classList.add('is-shown'); }, t);
          t += 1300;
          setTimeout(function () { m.classList.add('is-gone'); }, t);
          return;
        }
        (function (msg, at) { setTimeout(function () { msg.classList.add('is-shown'); }, at); })(m, t);
        t += m.classList.contains('mk-msg--me') ? 1500 : 2200;
      });
      timer = setTimeout(play, t + 3500);
    }
    if (reduce) { msgs.forEach(function (m) { m.classList.add('is-shown'); }); if (typing) typing.classList.add('is-gone'); return; }
    whileVisible(box, function () { if (!timer) play(); }, function () { clearTimeout(timer); timer = 0; });
  });

  /* ------------------------------------------------- mockup: subtitles */
  $$('[data-subs]').forEach(function (box) {
    var subs = $$('.mk-sub', box);
    var i = 0, timer = 0;
    function next() {
      subs[i].classList.remove('is-on');
      i = (i + 1) % subs.length;
      subs[i].classList.add('is-on');
      timer = setTimeout(next, 4000);
    }
    if (reduce) return;
    whileVisible(box, function () { if (!timer) timer = setTimeout(next, 4000); }, function () { clearTimeout(timer); timer = 0; });
  });

  /* =================================================== home page scenery */
  var chapters = $$('.tl-ch[data-ch]');
  if (!chapters.length) return;

  var hero = $('.tl-hero');
  if (hero) {
    requestAnimationFrame(function () { hero.classList.add('is-lit'); });
    setTimeout(function () { $$('[data-rv], [data-split]', hero).forEach(function (el) { el.classList.add('is-in'); }); }, 200);
  }

  /* ruler */
  var ruler = $('.tl-ruler');
  var rulerDot = $('.tl-ruler-dot');
  var rulerNow = $('.tl-ruler-now');
  var marks = $('.tl-ruler-marks');
  var markEls = [];
  if (marks) {
    chapters.forEach(function (ch) {
      var a = document.createElement('a');
      a.href = '#' + ch.id;
      a.textContent = ch.getAttribute('data-ch');
      a.setAttribute('aria-label', 'Chapter ' + ch.getAttribute('data-ch') + ', ' + ch.getAttribute('data-name'));
      marks.appendChild(a);
      markEls.push(a);
    });
  }

  function layoutRuler() {
    var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    chapters.forEach(function (ch, i) {
      var top = ch.getBoundingClientRect().top + window.scrollY;
      if (markEls[i]) markEls[i].style.left = (clamp(top / max, 0, 1) * 100).toFixed(2) + '%';
    });
  }

  /* panels turning as they pass */
  var turners = $$('[data-turn]');
  var active = 0;
  var footer = $('.site-footer');

  function onScene() {
    var vh = window.innerHeight;
    var vw = window.innerWidth;
    var mid = vh / 2;

    // which chapter holds the middle of the screen
    for (var i = 0; i < chapters.length; i++) {
      var r = chapters[i].getBoundingClientRect();
      if (r.top <= mid && r.bottom > mid) { active = i; break; }
    }

    if (ruler) {
      var max = Math.max(1, document.documentElement.scrollHeight - vh);
      if (rulerDot) rulerDot.style.left = (clamp(window.scrollY / max, 0, 1) * 100).toFixed(2) + '%';
      var ch = chapters[active];
      if (rulerNow) rulerNow.innerHTML = '<b>' + ch.getAttribute('data-ch') + '</b><span>' + ch.getAttribute('data-name') + '</span>';
      markEls.forEach(function (m, k) { m.classList.toggle('is-on', k === active); });
      if (footer) ruler.classList.toggle('is-away', footer.getBoundingClientRect().top < vh - 20);
    }

    if (!reduce && vw > 900) {
      turners.forEach(function (p) {
        var r = p.parentElement.getBoundingClientRect();
        var t = clamp((r.top + r.height / 2 - mid) / vh, -1.2, 1.2);
        var side = (r.left + r.width / 2) > vw / 2 ? 1 : -1;
        p.style.setProperty('--turn-y', (-t * 34 * side).toFixed(2) + 'deg');
        p.style.setProperty('--turn-x', (t * 70 * side).toFixed(1) + 'px');
        p.style.setProperty('--turn-z', (-Math.abs(t) * 160).toFixed(1) + 'px');
        p.classList.toggle('is-near', Math.abs(t) < 0.6);
      });
    } else {
      turners.forEach(function (p) { p.classList.add('is-near'); });
    }
  }

  var sceneTick = false;
  window.addEventListener('scroll', function () {
    if (!sceneTick) { sceneTick = true; requestAnimationFrame(function () { sceneTick = false; onScene(); }); }
  }, { passive: true });
  window.addEventListener('resize', function () { layoutRuler(); onScene(); });
  window.addEventListener('load', layoutRuler);
  layoutRuler();
  onScene();

  /* ----------------------------------------------------- canvas helper */
  function fitCanvas(canvas) {
    var dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    var ctx = canvas.getContext('2d');
    var s = { w: 1, h: 1, ctx: ctx };
    function size() {
      s.w = window.innerWidth;
      s.h = window.innerHeight;
      canvas.width = Math.round(s.w * dpr);
      canvas.height = Math.round(s.h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    size();
    window.addEventListener('resize', size);
    return s;
  }

  /* -------------------------------------------- terrain: wireframe range */
  var terrain = $('.tl-terrain');
  var T = terrain ? fitCanvas(terrain) : null;
  var COLS = window.innerWidth < 700 ? 34 : 56;
  var ROWS = window.innerWidth < 700 ? 22 : 34;
  var stars = [];
  for (var si = 0; si < 90; si++) stars.push({ x: Math.random(), y: Math.random() * 0.55, r: Math.random() * 1.1 + 0.2, p: Math.random() * 6.28 });

  // a valley floor in front, peaks rising toward the back and the sides
  function heightAt(x, z, zr) {
    var ridge = 0.3 + Math.abs(x) * 0.8;
    var n = Math.sin(x * 2.3 + z * 1.1) * 0.45 + Math.sin(x * 5.9 - z * 2.3) * 0.2 + Math.sin(x * 1.1 + z * 0.5) * 0.5 + Math.sin(x * 11.0 + z * 4.1) * 0.07 + 1.1;
    var far = clamp((zr - 1.2) / 3.5, 0.08, 1);
    return Math.max(0, n) * ridge * far;
  }

  function drawTerrain(t) {
    var ctx = T.ctx, w = T.w, h = T.h;
    ctx.clearRect(0, 0, w, h);
    var horizon = h * 0.56;
    var scroll = window.scrollY * 0.0009;
    var drift = t * 0.05 + scroll;

    // sky dust
    stars.forEach(function (s) {
      var a = 0.25 + 0.35 * Math.sin(t * 0.8 + s.p);
      ctx.fillStyle = 'rgba(241,236,226,' + a.toFixed(3) + ')';
      ctx.fillRect(s.x * w, s.y * h, s.r, s.r);
    });

    var pts = [];
    var zNear = 0.9, zFar = 7.5;
    for (var r = 0; r < ROWS; r++) {
      var row = [];
      var zf = r / (ROWS - 1);
      var z = lerp(zNear, zFar, zf * zf);
      for (var c = 0; c < COLS; c++) {
        var x = (c / (COLS - 1)) * 2 - 1;
        var wx = x * 3.2;
        // the land moves toward you, so the range slowly rolls past
        var hgt = heightAt(wx, z + drift, z);
        var sx = w / 2 + (wx * w * 0.42) / z;
        var sy = horizon + ((0.9 - hgt) * h * 0.3) / z;
        row.push([sx, sy, z]);
      }
      pts.push(row);
    }

    ctx.lineWidth = 0.6;
    for (var r2 = 0; r2 < ROWS; r2++) {
      var a = 0.05 + 0.2 * (1 - r2 / ROWS);
      ctx.strokeStyle = 'rgba(241,236,226,' + a.toFixed(3) + ')';
      ctx.beginPath();
      for (var c2 = 0; c2 < COLS; c2++) {
        var p = pts[r2][c2];
        if (c2 === 0) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1]);
      }
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(241,236,226,0.07)';
    for (var c3 = 0; c3 < COLS; c3 += 2) {
      ctx.beginPath();
      for (var r3 = 0; r3 < ROWS; r3++) {
        var q = pts[r3][c3];
        if (r3 === 0) ctx.moveTo(q[0], q[1]); else ctx.lineTo(q[0], q[1]);
      }
      ctx.stroke();
    }
    // vertices catching light, warmer in the middle distance
    for (var r4 = 0; r4 < ROWS; r4 += 1) {
      for (var c4 = 0; c4 < COLS; c4 += 2) {
        var v = pts[r4][c4];
        var warm = (r4 * 7 + c4 * 3) % 23 === 0;
        var al = 0.12 + 0.3 * (1 - r4 / ROWS);
        ctx.fillStyle = warm ? 'rgba(244,186,79,' + (al + 0.3).toFixed(3) + ')' : 'rgba(241,236,226,' + al.toFixed(3) + ')';
        ctx.fillRect(v[0] - 0.7, v[1] - 0.7, 1.4, 1.4);
      }
    }
    // fade the bottom into the page
    var fade = ctx.createLinearGradient(0, h * 0.7, 0, h);
    fade.addColorStop(0, 'rgba(11,13,14,0)');
    fade.addColorStop(1, 'rgba(11,13,14,0.85)');
    ctx.fillStyle = fade;
    ctx.fillRect(0, h * 0.7, w, h * 0.3);
  }

  /* ------------------------------------------- figure: gold string-art */
  var N = 240;
  var TAU = Math.PI * 2;

  function polar(fr) {
    var out = [];
    for (var i = 0; i < N; i++) { var a = (i / N) * TAU; var r = fr(a); out.push([Math.cos(a) * r, Math.sin(a) * r]); }
    return out;
  }

  function param(fx, fy, period) {
    var out = [];
    for (var i = 0; i < N; i++) { var t = (i / N) * period; out.push([fx(t), fy(t)]); }
    return out;
  }

  function polygon(k, step) {
    var verts = [];
    for (var j = 0; j <= k; j++) { var a = -Math.PI / 2 + (j * step * TAU) / k; verts.push([Math.cos(a), Math.sin(a)]); }
    var out = [];
    for (var i = 0; i < N; i++) {
      var f = (i / N) * k;
      var e = Math.floor(f), u = f - e;
      out.push([lerp(verts[e][0], verts[e + 1][0], u), lerp(verts[e][1], verts[e + 1][1], u)]);
    }
    return out;
  }

  var SHAPES = {
    sun: { pts: polar(function (a) { return 0.5 + 0.5 * Math.pow(Math.abs(Math.cos(a * 4)), 5); }), copies: 7, spin: 0.08, tilt: 0 },
    rose: { pts: polar(function (a) { return 0.22 + 0.78 * Math.abs(Math.cos(a * 3)); }), copies: 6, spin: 0.06, tilt: 0.5 },
    star: { pts: polygon(7, 3), copies: 7, spin: -0.07, tilt: 0.3 },
    triad: { pts: polygon(3, 1), copies: 9, spin: 0.1, tilt: 0.7 },
    knot: { pts: param(function (t) { return (Math.sin(t) + 2 * Math.sin(2 * t)) / 3; }, function (t) { return (Math.cos(t) - 2 * Math.cos(2 * t)) / 3; }, TAU), copies: 6, spin: 0.09, tilt: 0.4 },
    orbit: { pts: param(function (t) { return (2 * Math.cos(t) + 3 * Math.cos(2 * t / 3)) / 5; }, function (t) { return (2 * Math.sin(t) - 3 * Math.sin(2 * t / 3)) / 5; }, TAU * 3), copies: 5, spin: 0.05, tilt: 0.6 },
    heart: { pts: param(function (t) { return 16 * Math.pow(Math.sin(t), 3) / 17; }, function (t) { return -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 17; }, TAU), copies: 6, spin: 0.03, tilt: 0.2 },
    ring: { pts: polar(function () { return 1; }), copies: 12, spin: 0.12, tilt: 1 },
    spiral: { pts: param(function (t) { return 1.25 * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t)); }, function (t) { return 1.25 * Math.sin(t) * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t)); }, TAU), copies: 8, spin: 0.06, tilt: 0.8 }
  };

  var figCanvas = $('.tl-figure');
  var F = figCanvas ? fitCanvas(figCanvas) : null;
  var cur = { pts: SHAPES.sun.pts.map(function (p) { return p.slice(); }), copies: 7, spin: 0.08, tilt: 0, x: 0, y: 0, s: 0, a: 0 };
  var angle = 0;

  function figureTarget() {
    var ch = chapters[active];
    var shape = SHAPES[ch.getAttribute('data-shape')] || SHAPES.sun;
    var anchor = $$('[data-figure]', ch).filter(function (el) { return el.offsetParent !== null; })[0];
    var vw = F.w, vh = F.h;
    var x, y, s, a;
    if (anchor && (anchor.classList.contains('tl-panel') || anchor.classList.contains('tl-portrait'))) {
      // a frame with something inside: the figure sits on its outer top corner
      var r = anchor.getBoundingClientRect();
      s = clamp(r.width * 0.13, 56, 95);
      var right = r.left + r.width / 2 > vw / 2;
      x = right ? r.right + s * 0.15 : r.left - s * 0.15;
      y = r.top - s * 0.15;
      a = 1;
    } else if (anchor) {
      var r2 = anchor.getBoundingClientRect();
      x = r2.left + r2.width / 2;
      y = r2.top + r2.height / 2;
      s = Math.min(r2.width, r2.height) * (anchor.classList.contains('tl-spot') ? 0.42 : 0.4);
      a = anchor.classList.contains('tl-final-frame') ? 0.5 : 1;
    } else {
      x = vw * 0.5; y = -vh; s = 80; a = 0;
    }
    if (vw <= 900) a *= 0.55;
    return { shape: shape, x: x, y: y, s: s, a: a };
  }

  function drawFigure(dt) {
    var ctx = F.ctx;
    ctx.clearRect(0, 0, F.w, F.h);
    var tg = figureTarget();
    var k = 1 - Math.pow(0.0025, dt);
    var km = 1 - Math.pow(0.02, dt);
    if (!cur.s) { cur.x = tg.x; cur.y = tg.y; cur.s = tg.s; }
    cur.x = lerp(cur.x, tg.x, k);
    cur.y = lerp(cur.y, tg.y, k);
    cur.s = lerp(cur.s, tg.s, k);
    cur.a = lerp(cur.a, tg.a, km);
    cur.tilt = lerp(cur.tilt, tg.shape.tilt, km);
    cur.spin = lerp(cur.spin, tg.shape.spin, km);
    cur.copies = lerp(cur.copies, tg.shape.copies, km);
    for (var i = 0; i < N; i++) {
      cur.pts[i][0] = lerp(cur.pts[i][0], tg.shape.pts[i][0], km);
      cur.pts[i][1] = lerp(cur.pts[i][1], tg.shape.pts[i][1], km);
    }
    angle += cur.spin * dt;

    if (cur.y < -cur.s * 2 || cur.y > F.h + cur.s * 2) return;

    // a low glow first
    var g = ctx.createRadialGradient(cur.x, cur.y, 0, cur.x, cur.y, cur.s * 1.3);
    g.addColorStop(0, 'rgba(244,186,79,' + (0.14 * cur.a).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(244,186,79,0)');
    ctx.fillStyle = g;
    ctx.fillRect(cur.x - cur.s * 1.4, cur.y - cur.s * 1.4, cur.s * 2.8, cur.s * 2.8);

    ctx.globalCompositeOperation = 'lighter';
    ctx.lineWidth = 0.8;
    var copies = Math.round(cur.copies);
    for (var c = 0; c < copies; c++) {
      var f = c / copies;
      var rot = angle + f * 0.5;
      var squash = Math.cos(angle * 1.7 + f * Math.PI) * cur.tilt + (1 - cur.tilt);
      var cs = Math.cos(rot), sn = Math.sin(rot);
      var scale = cur.s * (0.94 + 0.08 * f);
      ctx.strokeStyle = 'rgba(' + (244 - c * 4) + ',' + (186 - c * 6) + ',' + (79 + c * 2) + ',' + ((0.22 + 0.3 * (1 - f)) * cur.a).toFixed(3) + ')';
      ctx.beginPath();
      for (var i2 = 0; i2 <= N; i2++) {
        var p = cur.pts[i2 % N];
        var px = p[0] * squash, py = p[1];
        var x = cur.x + (px * cs - py * sn) * scale;
        var y = cur.y + (px * sn + py * cs) * scale;
        if (i2 === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    // the strings across the figure
    ctx.strokeStyle = 'rgba(255,226,176,' + (0.07 * cur.a).toFixed(3) + ')';
    ctx.beginPath();
    var cs2 = Math.cos(angle), sn2 = Math.sin(angle);
    for (var j = 0; j < N; j += 4) {
      var p1 = cur.pts[j], p2 = cur.pts[(j + Math.round(N * 0.37)) % N];
      ctx.moveTo(cur.x + (p1[0] * cs2 - p1[1] * sn2) * cur.s, cur.y + (p1[0] * sn2 + p1[1] * cs2) * cur.s);
      ctx.lineTo(cur.x + (p2[0] * cs2 - p2[1] * sn2) * cur.s, cur.y + (p2[0] * sn2 + p2[1] * cs2) * cur.s);
    }
    ctx.stroke();
    ctx.globalCompositeOperation = 'source-over';
  }

  /* ------------------------------------------------------------ the loop */
  var last = performance.now();
  var running = true;
  document.addEventListener('visibilitychange', function () {
    running = !document.hidden;
    if (running) { last = performance.now(); requestAnimationFrame(loop); }
  });

  function loop(now) {
    if (!running) return;
    var dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    var t = now / 1000;
    if (T) drawTerrain(reduce ? 0 : t);
    if (F) drawFigure(reduce ? 1 : dt);
    if (!reduce) requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
  if (reduce) window.addEventListener('scroll', function () { requestAnimationFrame(loop); }, { passive: true });
})();
