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

    if (scenes[0]) {
        scenes[0].classList.add('is-active');
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

    function initScrollAnimations() {
        var els = document.querySelectorAll('[data-animate]');
        if (!els.length || !('IntersectionObserver' in window)) {
            els.forEach(function (el) { el.classList.add('is-visible'); });
            return;
        }
        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('is-visible');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.12 });
        els.forEach(function (el) { obs.observe(el); });
    }

    initScrollAnimations();

    function initHeroAnimation() {
        var els = document.querySelectorAll('.hero-letters, .hero-eagle-wrap, .hero-bottom, .hero-nav-strip');
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                els.forEach(function (el) { el.classList.add('hero-in'); });
            });
        });
    }

    initHeroAnimation();

    function initHeroParallax() {
        if (prefersReducedMotion) return;
        if (window.innerWidth < 768) return;
        var hero = document.querySelector('.scene--hero');
        var eagleImg = document.querySelector('.hero-eagle-img');
        if (!hero || !eagleImg) return;

        var targetX = 0, targetY = 0;
        var currentX = 0, currentY = 0;

        hero.addEventListener('mousemove', function (e) {
            var rect = hero.getBoundingClientRect();
            var dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
            var dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
            targetX = dx * 6;
            targetY = dy * 4;
        }, { passive: true });

        hero.addEventListener('mouseleave', function () {
            targetX = 0;
            targetY = 0;
        }, { passive: true });

        function tick() {
            currentX += (targetX - currentX) * 0.06;
            currentY += (targetY - currentY) * 0.06;
            eagleImg.style.transform = 'translate3d(' + currentX.toFixed(2) + 'px, ' + currentY.toFixed(2) + 'px, 0)';
            requestAnimationFrame(tick);
        }

        tick();
    }

    initHeroParallax();



})();
