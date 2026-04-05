(function () {
    'use strict';

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var header = document.getElementById('site-header');
    var menuToggle = document.getElementById('menu-toggle');
    var navLinks = document.getElementById('nav-links');
    var scenes = document.querySelectorAll('.scene[data-scene]');
    var faqItems = document.querySelectorAll('.faq-item');

    function clamp(val, min, max) {
        return Math.min(Math.max(val, min), max);
    }

    function updateHeader() {
        if (window.scrollY > 60) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    }

    function initHeroReveal() {
        var heroContent = document.querySelector('.hero-content');
        var scrollHint = document.querySelector('.hero-scroll-hint');

        if (prefersReducedMotion) {
            if (heroContent) heroContent.classList.add('is-revealed');
            if (scrollHint) scrollHint.style.setProperty('--hint-ready', '1');
            return;
        }

        setTimeout(function () {
            if (heroContent) heroContent.classList.add('is-revealed');
        }, 80);

        setTimeout(function () {
            if (scrollHint) scrollHint.style.setProperty('--hint-ready', '1');
        }, 1200);
    }

    initHeroReveal();

    var sceneCache = [];

    function buildSceneCache() {
        var scrollY = window.scrollY;
        sceneCache = [];
        scenes.forEach(function (scene) {
            sceneCache.push({
                el: scene,
                top: scene.getBoundingClientRect().top + scrollY,
                height: scene.offsetHeight
            });
        });
    }

    function updateSceneProgress() {
        var scrollY = window.scrollY;
        var vh = window.innerHeight;
        sceneCache.forEach(function (data) {
            var scrollable = Math.max(data.height - vh, 1);
            var progress = clamp((scrollY - data.top) / scrollable, 0, 1);
            data.el.style.setProperty('--scene-progress', progress.toFixed(4));
        });
    }

    var ticking = false;

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(function () {
                updateHeader();
                if (!prefersReducedMotion) {
                    updateSceneProgress();
                }
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    var resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(buildSceneCache, 150);
    }, { passive: true });

    buildSceneCache();
    updateHeader();
    if (!prefersReducedMotion) {
        updateSceneProgress();
    }

    var sceneObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-active');
            } else {
                entry.target.classList.remove('is-active');
            }
        });
    }, { threshold: 0.1 });

    scenes.forEach(function (scene) {
        sceneObserver.observe(scene);
    });

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function () {
            var isOpen = navLinks.classList.toggle('is-open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            menuToggle.classList.toggle('is-open', isOpen);
        });

        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.classList.remove('is-open');
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var href = anchor.getAttribute('href');
            if (href === '#') return;
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                var headerOffset = 80;
                var top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    faqItems.forEach(function (item) {
        var btn = item.querySelector('.faq-question');
        var answer = item.querySelector('.faq-answer');
        if (!btn || !answer) return;

        btn.addEventListener('click', function () {
            var isOpen = item.classList.toggle('is-open');
            btn.setAttribute('aria-expanded', String(isOpen));
            answer.setAttribute('aria-hidden', String(!isOpen));
        });
    });

    document.querySelectorAll('.comparison-tabs').forEach(function (tabList) {
        var tabs = tabList.querySelectorAll('.comparison-tab');
        var display = tabList.nextElementSibling;
        if (!display) return;
        var panels = display.querySelectorAll('.comparison-panel');

        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                var target = tab.getAttribute('data-tab');
                tabs.forEach(function (t) {
                    t.classList.remove('is-active');
                    t.setAttribute('aria-selected', 'false');
                });
                tab.classList.add('is-active');
                tab.setAttribute('aria-selected', 'true');
                panels.forEach(function (panel) {
                    if (panel.getAttribute('data-panel') === target) {
                        panel.classList.add('is-active');
                    } else {
                        panel.classList.remove('is-active');
                    }
                });
            });
        });
    });

})();
