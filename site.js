/*
 * haritagalog.com motion: the floating stones follow the mouse and scatter as you scroll, the moss
 * spreads and fades, the eagle drifts, leaves blow through the story, and a gold index on the
 * right follows the section you're reading. Styles are in site.css. Nothing moves when the
 * visitor has asked for reduced motion.
 */
(function () {
  'use strict';

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var header = document.getElementById('site-header');
  var hero = document.querySelector('.gp-hero');

  // header: solid once the page moves
  function onScrollHeader() {
    if (!header || !hero) return;
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  }

  // ---- hero: stones, moss and copy react to the mouse and the scroll ----
  var stones = hero ? Array.prototype.slice.call(hero.querySelectorAll('.gp-stone')) : [];
  var moss = hero ? hero.querySelector('.gp-moss') : null;
  var copy = hero ? hero.querySelector('.gp-hero-copy') : null;
  var mouse = { x: 0, y: 0, tx: 0, ty: 0 };

  if (hero && !reduced) {
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width - 0.5;
      mouse.ty = (e.clientY - r.top) / r.height - 0.5;
    }, { passive: true });
    hero.addEventListener('mouseleave', function () { mouse.tx = 0; mouse.ty = 0; }, { passive: true });
  }

  function frame() {
    mouse.x += (mouse.tx - mouse.x) * 0.06;
    mouse.y += (mouse.ty - mouse.y) * 0.06;
    var h = hero ? hero.offsetHeight : 1;
    var p = Math.min(1, Math.max(0, window.scrollY / h));

    stones.forEach(function (s, i) {
      var depth = Number(s.getAttribute('data-depth') || 0.5);
      // scatter: stones on the left drift left, on the right drift right, all of them rise
      var r = s.getBoundingClientRect();
      var side = (r.left + r.width / 2) < window.innerWidth / 2 ? -1 : 1;
      var x = mouse.x * 60 * depth + side * p * 260 * depth;
      var y = mouse.y * 40 * depth - p * 320 * depth;
      s.style.setProperty('--px', x.toFixed(1) + 'px');
      s.style.setProperty('--py', y.toFixed(1) + 'px');
    });
    if (moss) moss.style.setProperty('--moss-scale', (1 + p * 0.5).toFixed(3));
    if (copy) {
      copy.style.transform = 'translateY(' + (p * -80).toFixed(1) + 'px)';
      copy.style.opacity = String(1 - p * 1.2);
    }

    var art = document.querySelector('.gp-story-art img');
    if (art) {
      var ar = art.getBoundingClientRect();
      var c = (ar.top + ar.height / 2 - window.innerHeight / 2) / window.innerHeight;
      art.style.setProperty('--art-y', (c * -60).toFixed(1) + 'px');
    }
    requestAnimationFrame(frame);
  }

  // ---- leaves blowing through the story ----
  var LEAF = '<svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true"><path d="M8 56C8 30 26 8 58 6c-2 30-22 50-50 50z"/><path d="M10 54C24 40 36 26 52 12" stroke="rgba(0,0,0,0.28)" stroke-width="2" fill="none"/></svg>';
  var LEAF_COLORS = ['#4C8A4A', '#3E7A47', '#6FA25A', '#2F6B52', '#7DB06A', '#0F766E'];

  function growLeaves() {
    var box = document.querySelector('.gp-leaves');
    if (!box || reduced) return;
    for (var i = 0; i < 14; i++) {
      var leaf = document.createElement('span');
      leaf.className = 'gp-leaf';
      leaf.innerHTML = LEAF;
      leaf.style.left = (Math.random() * 40 - 10).toFixed(1) + '%';
      leaf.style.top = (Math.random() * 90 - 10).toFixed(1) + '%';
      leaf.style.setProperty('--w', (18 + Math.random() * 40).toFixed(0) + 'px');
      leaf.style.setProperty('--c', LEAF_COLORS[i % LEAF_COLORS.length]);
      leaf.style.setProperty('--t', (12 + Math.random() * 12).toFixed(1) + 's');
      leaf.style.setProperty('--d', (-Math.random() * 20).toFixed(1) + 's');
      leaf.style.setProperty('--x', (70 + Math.random() * 60).toFixed(0) + 'vw');
      leaf.style.setProperty('--y', (Math.random() * 60 - 20).toFixed(0) + 'vh');
      leaf.style.setProperty('--rot', (120 + Math.random() * 300).toFixed(0) + 'deg');
      box.appendChild(leaf);
    }
  }

  // ---- the gold index on the right, and the chapter list in the story ----
  function buildIndex() {
    var sections = Array.prototype.slice.call(document.querySelectorAll('section[id][data-section]'));
    if (sections.length < 3) return;
    var nav = document.createElement('nav');
    nav.className = 'gp-index';
    nav.setAttribute('aria-label', 'Sections');
    sections.forEach(function (s, i) {
      var a = document.createElement('a');
      a.href = '#' + s.id;
      a.textContent = (i + 1 < 10 ? '0' : '') + (i + 1);
      a.setAttribute('aria-label', 'Section ' + (i + 1));
      nav.appendChild(a);
    });
    document.body.appendChild(nav);

    var links = nav.querySelectorAll('a');
    var chapters = document.querySelectorAll('.gp-chapters a[href^="#"]');
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var id = e.target.id;
        links.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + id); });
        chapters.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + id); });
        nav.classList.toggle('is-on', id !== (hero && hero.id));
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  }

  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  growLeaves();
  buildIndex();
  if (hero && !reduced) requestAnimationFrame(frame);
})();
