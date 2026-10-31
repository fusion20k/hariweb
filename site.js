/*
 * haritagalog.com motion ("Haribon Night"). Styles are in site.css.
 *
 *  - Hero: HARI / TAGALOG rise out of their masks, the eagle lifts into the light and follows the
 *    mouse a little; scrolling away lifts the eagle and lets the type drift apart.
 *  - Strands: one golden form on a fixed canvas that reshapes for every section (a sunburst behind
 *    the eagle, flowing ribbons, a ring around the demo, a heart, linked rings, rising bars, a
 *    question mark) and scrolls with the section it belongs to.
 *  - Titles rise word by word, eyebrows draw in, cards cascade, pictures are wiped in.
 *  - A counter in the corner follows the section you're in; its arrows step between sections.
 *
 * With "reduce motion" on, everything is simply shown and nothing moves.
 */
(function () {
  'use strict';

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  if (!reduced) root.classList.add('hb-motion');

  var header = document.getElementById('site-header');
  var hero = document.querySelector('.hb-hero') || document.querySelector('.scene--hero');
  var sections = Array.prototype.slice.call(document.querySelectorAll('section[id][data-section]'));
  var LABELS = { 'hero': 'Hari', 'hero-copy': 'Story', 'demo': 'Demo', 'founder-story': 'Why Hari', 'partners': 'Partners', 'pricing': 'Pricing', 'faq': 'Questions' };

  function inView(els, cb, opts) {
    if (!els.length) return;
    if (reduced || !('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('is-in'); if (cb) cb(el); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        if (cb) cb(e.target);
        io.unobserve(e.target);
      });
    }, opts || { threshold: 0.2 });
    els.forEach(function (el) { io.observe(el); });
  }

  // ---- header: solid once the page moves ----
  function onScrollHeader() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 40);
  }

  // ---- hero ----
  function setupHero() {
    if (!hero || !hero.classList.contains('hb-hero')) return;
    hero.querySelectorAll('.hb-word').forEach(function (w) {
      if (!w.querySelector('span')) w.innerHTML = '<span>' + w.textContent + '</span>';
    });
    requestAnimationFrame(function () { requestAnimationFrame(function () { hero.classList.add('is-in'); }); });
  }

  var mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  if (hero && !reduced) {
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width - 0.5;
      mouse.ty = (e.clientY - r.top) / r.height - 0.5;
    }, { passive: true });
    hero.addEventListener('mouseleave', function () { mouse.tx = 0; mouse.ty = 0; }, { passive: true });
  }

  function heroFrame() {
    if (!hero) return;
    mouse.x += (mouse.tx - mouse.x) * 0.06;
    mouse.y += (mouse.ty - mouse.y) * 0.06;
    var p = Math.min(1, Math.max(0, window.scrollY / (hero.offsetHeight || 1)));
    var title = hero.querySelector('.hb-title');
    var eagle = hero.querySelector('.hb-eagle');
    var glow = hero.querySelector('.hb-glow');
    if (title) {
      title.style.setProperty('--tx', (mouse.x * -26 - p * 120).toFixed(1) + 'px');
      title.style.setProperty('--ty', (mouse.y * -14 + p * 60).toFixed(1) + 'px');
      title.style.opacity = (1 - p * 1.2).toFixed(3);
    }
    if (eagle) {
      eagle.style.setProperty('--ex', (mouse.x * 30).toFixed(1) + 'px');
      eagle.style.setProperty('--ey', (mouse.y * 16).toFixed(1) + 'px');
      eagle.style.setProperty('--es', (p * -140).toFixed(1) + 'px');
      eagle.style.setProperty('--ez', (1 + p * 0.12).toFixed(3));
    }
    if (glow) {
      glow.style.setProperty('--gx', (mouse.x * 60).toFixed(1) + 'px');
      glow.style.setProperty('--gy', (mouse.y * 40 - p * 160).toFixed(1) + 'px');
    }
  }

  // the story eagle drifts against the scroll
  function storyFrame() {
    var art = document.querySelector('.gp-story-art img');
    if (!art) return;
    var r = art.getBoundingClientRect();
    var c = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
    art.style.setProperty('--art-y', (c * -60).toFixed(1) + 'px');
  }

  // ---- titles, eyebrows, cards and pictures ----
  function splitWords(el) {
    var i = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var parts = n.textContent.split(/(\s+)/);
          var frag = document.createDocumentFragment();
          parts.forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            var w = document.createElement('span');
            w.className = 'hb-w';
            var inner = document.createElement('span');
            inner.textContent = part;
            inner.style.setProperty('--i', i++);
            w.appendChild(inner);
            frag.appendChild(w);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') {
          walk(n);
        }
      });
    })(el);
  }

  function setupReveals() {
    var titles = Array.prototype.slice.call(document.querySelectorAll('.section-title, .founder-section-title, .gp-story-title, .plan-compare-title, .hb-copy-title'));
    titles.forEach(function (t) {
      if (t.classList.contains('hb-split')) return;
      t.removeAttribute('data-animate');
      t.classList.add('is-visible');
      splitWords(t);
      t.classList.add('hb-split');
    });
    inView(titles);

    var brows = Array.prototype.slice.call(document.querySelectorAll('.demo-eyebrow, .partners-eyebrow, .pricing-eyebrow, .founder-eyebrow, .gp-story-title small'));
    brows.forEach(function (b) { b.classList.add('hb-eyebrow'); });
    inView(brows);

    // pictures are wiped in; their parent is watched, since a clipped picture never reports itself as visible
    var hosts = [];
    document.querySelectorAll('.demo-video-frame, .demo-screenshot-wrap, .founder-avatar, .partner-spotlight-logo').forEach(function (w) {
      w.classList.add('hb-wipe');
      if (hosts.indexOf(w.parentElement) < 0) hosts.push(w.parentElement);
    });
    hosts.forEach(function (h) { h.classList.add('hb-wipe-host'); });
    inView(hosts, null, { threshold: 0.15 });

    // siblings that reveal together are staggered
    var groups = new Map();
    document.querySelectorAll('[data-animate]').forEach(function (el) {
      var list = groups.get(el.parentElement) || [];
      list.push(el);
      groups.set(el.parentElement, list);
    });
    groups.forEach(function (list) {
      if (list.length < 2) return;
      list.forEach(function (el, i) { el.style.transitionDelay = (Math.min(i, 6) * 0.1).toFixed(2) + 's'; });
    });
  }

  // ---- the corner counter, and the story's chapter list ----
  var active = 0;
  var counter = null;

  function buildCounter() {
    if (sections.length < 3) return;
    counter = document.createElement('div');
    counter.className = 'hb-counter';
    var nums = sections.map(function (_, i) { return (i + 1 < 10 ? '0' : '') + (i + 1); }).join('<br>');
    counter.innerHTML =
      '<div><div class="hb-counter-label">' + LABELS[sections[0].dataset.section] + '</div></div>' +
      '<div class="hb-counter-num" aria-hidden="true"><span>' + nums + '</span></div>' +
      '<div class="hb-counter-arrows">' +
      '<button type="button" data-step="-1" aria-label="Previous section"><svg viewBox="0 0 24 24"><path d="M6 15l6-6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
      '<button type="button" data-step="1" aria-label="Next section"><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
      '</div>';
    document.body.appendChild(counter);
    counter.querySelectorAll('[data-step]').forEach(function (b) {
      b.addEventListener('click', function () {
        var next = sections[Math.max(0, Math.min(sections.length - 1, active + Number(b.dataset.step)))];
        if (next) next.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      });
    });
  }

  function setActive(i) {
    if (i < 0) return;
    active = i;
    if (counter) {
      counter.querySelector('.hb-counter-num span').style.setProperty('--n', i);
      counter.querySelector('.hb-counter-label').textContent = LABELS[sections[i].dataset.section] || '';
    }
    var id = sections[i].id;
    document.querySelectorAll('.gp-chapters a[href^="#"]').forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
    });
    strands.morph(sections[i].dataset.section);
  }

  function watchSections() {
    if (!sections.length) return;
    setActive(0);
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) setActive(sections.indexOf(e.target));
      });
    }, { rootMargin: '-50% 0px -50% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  }

  // ---- strands: one golden form that reshapes for every section ----
  var strands = (function () {
    var noop = { morph: function () {}, frame: function () {} };
    // only on the home page; articles and inner pages stay still behind the text
    if (reduced || sections.length < 3) return noop;
    var cv = document.createElement('canvas');
    if (!cv.getContext) return noop;
    cv.className = 'hb-strands';
    cv.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(cv, document.body.firstChild);
    var ctx = cv.getContext('2d');
    var TAU = Math.PI * 2;
    var W = 0, H = 0, DPR = 1;
    var N = window.innerWidth < 900 ? 240 : 520;
    var COLORS = ['#F4BA4F', '#E58B3A', '#F7D58A', '#C9632F'];
    var P = [];
    for (var i = 0; i < N; i++) {
      P.push({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, vx: 0, vy: 0, a: Math.random() * TAU,
        r1: Math.random(), r2: Math.random(), r3: Math.random(), len: 8 + Math.random() * 18, c: i % COLORS.length });
    }
    var shape = 'dust';
    var changed = 0;
    var alpha = 0;
    var qmark = [];

    function resize() {
      W = window.innerWidth; H = window.innerHeight; DPR = Math.min(2, window.devicePixelRatio || 1);
      cv.width = W * DPR; cv.height = H * DPR;
      // the question mark is sampled from type
      var off = document.createElement('canvas');
      var s = Math.round(Math.min(W, H) * 0.55);
      qmark = [];
      if (s < 20) return;
      off.width = s; off.height = s;
      var o = off.getContext('2d');
      o.fillStyle = '#000';
      o.font = '800 ' + Math.round(s * 0.95) + 'px Montserrat, Arial, sans-serif';
      o.textAlign = 'center'; o.textBaseline = 'middle';
      o.fillText('?', s / 2, s / 2);
      var d = o.getImageData(0, 0, s, s).data;
      for (var t = 0; t < 4000 && qmark.length < 900; t++) {
        var x = Math.floor(Math.random() * s), y = Math.floor(Math.random() * s);
        if (d[(y * s + x) * 4 + 3] > 128) qmark.push([x - s / 2, y - s / 2]);
      }
    }

    // where a section's form sits: it scrolls in with the section, then holds still while you read
    function sectionAnchor(id, fx, fy) {
      var el = document.querySelector('[data-section="' + id + '"]');
      if (!el) return { x: W * fx, y: H * fy };
      var r = el.getBoundingClientRect();
      var top = Math.max(r.top, Math.min(0, r.bottom - H));
      return { x: r.left + r.width * fx, y: top + H * fy };
    }

    function rectOf(sel) {
      var el = document.querySelector(sel);
      return el ? el.getBoundingClientRect() : null;
    }

    // each form: where its centre is, how strong it shows, and where strand p goes at time t
    var FORMS = {
      'hero': {
        alpha: 0.95,
        at: function () {
          var b = rectOf('.hb-eagle');
          if (!b || !b.width) return { x: W * 0.5, y: H * 0.3, s: Math.min(W, H) * 0.3 };
          return { x: b.left + b.width * 0.5, y: b.top + b.height * 0.48, s: b.height * 0.34 };
        },
        place: function (p, t, s) {
          var ray = Math.floor(p.r2 * 32);
          var th = ray / 32 * TAU + t * 0.035 + (p.r3 - 0.5) * 0.05;
          var rr = s * (1.05 + p.r1 * 1.15);
          return [Math.cos(th) * rr, Math.sin(th) * rr * 0.85, th, 0.6 + p.r1];
        },
      },
      'hero-copy': {
        alpha: 0.5,
        at: function () { var a = sectionAnchor('hero-copy', 0, 0); return { x: 0, y: a.y, s: 1 }; },
        place: function (p, t) {
          var lane = Math.floor(p.r2 * 7);
          var span = W * 0.75;
          var x = ((p.r1 * span + t * 50 * (0.6 + p.r3)) % span) - W * 0.12;
          var baseY = H * (0.6 + lane * 0.05);
          var k = 0.005;
          var y = baseY + Math.sin(x * k + lane * 0.9 + t * 0.5) * 46;
          var slope = Math.cos(x * k + lane * 0.9 + t * 0.5) * 46 * k;
          return [x, y, Math.atan(slope), 1];
        },
      },
      'demo': {
        alpha: 0.6,
        at: function () {
          var b = rectOf('.demo-video-frame');
          if (!b || !b.width) { var a = sectionAnchor('demo', 0.5, 0.55); return { x: a.x, y: a.y, s: Math.min(W, H) * 0.4 }; }
          return { x: b.left + b.width / 2, y: b.top + b.height / 2, s: b.width * 0.62 };
        },
        place: function (p, t, s) {
          var th = p.r1 * TAU + t * 0.06;
          var rr = s * (0.92 + p.r2 * 0.22);
          return [Math.cos(th) * rr, Math.sin(th) * rr * 0.72, th + (p.r3 - 0.5) * 0.7, 1];
        },
      },
      'founder-story': {
        alpha: 0.6,
        at: function () { var a = sectionAnchor('founder-story', 0.83, 0.48); return { x: a.x, y: a.y, s: Math.min(W, H) * 0.2 }; },
        place: function (p, t, s) {
          var th = p.r1 * TAU;
          var beat = 1 + 0.04 * Math.sin(t * 2.6);
          var f = (p.r2 < 0.75 ? 1 : 0.55 + p.r2 * 0.4) * beat;
          var hx = 16 * Math.pow(Math.sin(th), 3);
          var hy = -(13 * Math.cos(th) - 5 * Math.cos(2 * th) - 2 * Math.cos(3 * th) - Math.cos(4 * th));
          var dx = 48 * Math.pow(Math.sin(th), 2) * Math.cos(th);
          var dy = 13 * Math.sin(th) - 10 * Math.sin(2 * th) - 6 * Math.sin(3 * th) - 4 * Math.sin(4 * th);
          return [hx / 16 * s * f, hy / 16 * s * f, Math.atan2(dy, dx), 1];
        },
      },
      'partners': {
        alpha: 0.45,
        at: function () {
          var b = rectOf('.partner-grid');
          if (!b || !b.width) { var a = sectionAnchor('partners', 0.5, 0.6); return { x: a.x, y: a.y, s: W * 0.12 }; }
          return { x: b.left + b.width / 2, y: b.top + b.height / 2, s: Math.min(b.width * 0.26, b.height * 0.62) };
        },
        place: function (p, t, s) {
          var side = p.r3 < 0.5 ? -1 : 1;
          var th = p.r1 * TAU + t * 0.05 * side;
          var rr = s * (0.95 + p.r2 * 0.18);
          return [side * s * 0.72 + Math.cos(th) * rr, Math.sin(th) * rr, th + Math.PI / 2, 1];
        },
      },
      'pricing': {
        alpha: 0.5,
        at: function () { var a = sectionAnchor('pricing', 0.86, 0.36); return { x: a.x, y: a.y, s: Math.min(W, H) * 0.3 }; },
        place: function (p, t, s) {
          var bar = Math.floor(p.r2 * 5);
          var hgt = [0.35, 0.55, 0.75, 1, 0.85][bar] * (1 + 0.05 * Math.sin(t * 1.6 + bar));
          var x = (bar - 2) * s * 0.22 + (p.r3 - 0.5) * s * 0.12;
          var y = s * 0.5 - p.r1 * s * hgt;
          return [x, y, -Math.PI / 2 + (p.r3 - 0.5) * 0.25, 0.8];
        },
      },
      'faq': {
        alpha: 0.55,
        at: function () { var a = sectionAnchor('faq', 0.78, 0.45); return { x: a.x, y: a.y, s: 1 }; },
        place: function (p, t) {
          var q = qmark.length ? qmark[Math.floor(p.r1 * qmark.length)] : [0, 0];
          var wob = Math.sin(t * 0.8 + p.r2 * 6) * 3;
          return [q[0] + wob, q[1], 0.7 + (p.r3 - 0.5) * 0.9, 0.8];
        },
      },
      'dust': {
        alpha: 0.22,
        at: function () { return { x: 0, y: 0, s: 1 }; },
        place: function (p, t) {
          return [p.r1 * W, p.r2 * H + Math.sin(t * 0.3 + p.r3 * 6) * 20, p.r3 * TAU + t * 0.2, 0.7];
        },
      },
    };

    function morph(name) {
      var next = FORMS[name] ? name : 'dust';
      if (next === shape) return;
      shape = next;
      changed = performance.now();
    }

    function frame(now) {
      var f = FORMS[shape];
      var t = now / 1000;
      var since = now - changed;
      // on narrow screens the text runs through the middle, so only the hero form shows fully
      var want = f.alpha * (W < 900 && shape !== 'hero' ? 0.4 : 1);
      alpha += (want - alpha) * 0.04;
      var c = f.at();
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineWidth = 1.3;
      ctx.lineCap = 'round';
      var paths = COLORS.map(function () { return []; });
      for (var i = 0; i < P.length; i++) {
        var p = P[i];
        var g = f.place(p, t, c.s);
        var tx = c.x + g[0], ty = c.y + g[1];
        // strands let go one after another, so the form swirls into its new shape
        var go = Math.min(1, Math.max(0, (since - p.r1 * 650) / 500));
        var dx = tx - p.x, dy = ty - p.y;
        p.vx += dx * 0.012 * go - dy * 0.0016 * go * (1 - go);
        p.vy += dy * 0.012 * go + dx * 0.0016 * go * (1 - go);
        p.vx *= 0.84; p.vy *= 0.84;
        p.x += p.vx; p.y += p.vy;
        var da = g[2] - p.a;
        da = Math.atan2(Math.sin(da), Math.cos(da));
        p.a += da * 0.08;
        // nothing is drawn under the header bar
        if (p.x < -60 || p.x > W + 60 || p.y < 78 || p.y > H + 60) continue;
        paths[p.c].push(p.x, p.y, Math.cos(p.a) * p.len * g[3] * 0.5, Math.sin(p.a) * p.len * g[3] * 0.5);
      }
      for (var k = 0; k < COLORS.length; k++) {
        var list = paths[k];
        if (!list.length) continue;
        ctx.strokeStyle = COLORS[k];
        ctx.globalAlpha = alpha * (k === 2 ? 0.7 : 0.9);
        ctx.beginPath();
        for (var j = 0; j < list.length; j += 4) {
          ctx.moveTo(list[j] - list[j + 2], list[j + 1] - list[j + 3]);
          ctx.lineTo(list[j] + list[j + 2], list[j + 1] + list[j + 3]);
        }
        ctx.stroke();
      }
    }

    resize();
    window.addEventListener('resize', resize);
    return { morph: morph, frame: frame };
  })();

  // ---- one loop for everything that follows the mouse or the scroll ----
  var running = !reduced;
  function loop(now) {
    if (!running) return;
    heroFrame();
    storyFrame();
    strands.frame(now);
    requestAnimationFrame(loop);
  }
  document.addEventListener('visibilitychange', function () {
    if (reduced) return;
    var wasRunning = running;
    running = !document.hidden;
    if (running && !wasRunning) requestAnimationFrame(loop);
  });

  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  setupHero();
  setupReveals();
  buildCounter();
  watchSections();
  if (!reduced) requestAnimationFrame(loop);
})();
