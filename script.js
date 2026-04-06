(function () {
    'use strict';

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var header = document.getElementById('site-header');
    var menuToggle = document.getElementById('menu-toggle');
    var navLinks = document.getElementById('nav-links');
    var scenes = Array.prototype.slice.call(document.querySelectorAll('.scene[data-scene]'));
    var faqItems = document.querySelectorAll('.faq-item');
    var backToTop = document.getElementById('back-to-top');

    function updateHeader() {
        if (window.scrollY > 80) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    }

    function updateBackToTop() {
        if (!backToTop) return;
        if (window.scrollY > window.innerHeight * 1.5) {
            backToTop.classList.add('is-visible');
        } else {
            backToTop.classList.remove('is-visible');
        }
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-active');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
    });

    scenes.forEach(function (scene) {
        observer.observe(scene);
    });

    scenes[0].classList.add('is-active');

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

    window.addEventListener('scroll', function () {
        updateHeader();
        updateBackToTop();
    }, { passive: true });

    updateHeader();
    updateBackToTop();

    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

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
                target.scrollIntoView({ behavior: 'smooth' });
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
