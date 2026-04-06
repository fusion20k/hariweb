(function () {
    'use strict';

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var header = document.getElementById('site-header');
    var menuToggle = document.getElementById('menu-toggle');
    var navLinks = document.getElementById('nav-links');
    var scenes = Array.prototype.slice.call(document.querySelectorAll('.scene[data-scene]'));
    var faqItems = document.querySelectorAll('.faq-item');
    var backToTop = document.getElementById('back-to-top');

    var currentIndex = 0;
    var isTransitioning = false;
    var transitionDuration = prefersReducedMotion ? 50 : 700;

    var rapidMode = false;
    var rapidTimer = null;
    var wheelEvents = [];
    var RAPID_WINDOW = 300;
    var RAPID_THRESHOLD = 3;
    var SNAP_DELAY = 600;
    var WHEEL_THRESHOLD = 50;
    var wheelAccumulator = 0;
    var wheelTimer = null;

    function isScrollableScene(index) {
        var scene = scenes[index];
        if (!scene) return false;
        return scene.scrollHeight > scene.clientHeight + 10;
    }

    function updateHeader() {
        if (currentIndex === 0) {
            header.classList.remove('is-scrolled');
        } else {
            header.classList.add('is-scrolled');
        }
    }

    function updateBackToTop() {
        if (!backToTop) return;
        if (currentIndex > 1) {
            backToTop.classList.add('is-visible');
        } else {
            backToTop.classList.remove('is-visible');
        }
    }

    function detectCurrentScene() {
        var scrollY = window.scrollY;
        var viewH = window.innerHeight;
        var mid = scrollY + viewH / 2;
        for (var i = scenes.length - 1; i >= 0; i--) {
            if (scenes[i].offsetTop <= mid) {
                return i;
            }
        }
        return 0;
    }

    function syncActiveClasses(index) {
        scenes.forEach(function (scene, i) {
            if (i === index) {
                scene.classList.add('is-active');
            } else {
                scene.classList.remove('is-active');
            }
        });
    }

    function goToScene(index, instant) {
        if (index < 0 || index >= scenes.length) return;
        if (index === currentIndex && !instant) return;

        isTransitioning = true;
        currentIndex = index;

        syncActiveClasses(index);
        updateHeader();
        updateBackToTop();

        var targetTop = scenes[index].offsetTop;

        if (instant || prefersReducedMotion) {
            window.scrollTo(0, targetTop);
            isTransitioning = false;
        } else {
            smoothScrollTo(targetTop, transitionDuration, function () {
                isTransitioning = false;
            });
        }
    }

    function smoothScrollTo(target, duration, callback) {
        var start = window.scrollY;
        var distance = target - start;
        var startTime = null;

        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var elapsed = timestamp - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var eased = easeOutCubic(progress);

            window.scrollTo(0, start + distance * eased);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                if (callback) callback();
            }
        }

        requestAnimationFrame(step);
    }

    function enterRapidMode() {
        rapidMode = true;
        document.documentElement.style.scrollBehavior = 'auto';
    }

    function scheduleSnap() {
        clearTimeout(rapidTimer);
        rapidTimer = setTimeout(function () {
            rapidMode = false;
            document.documentElement.style.scrollBehavior = '';
            var idx = detectCurrentScene();
            currentIndex = idx;
            syncActiveClasses(idx);
            updateHeader();
            updateBackToTop();
            goToScene(idx);
        }, SNAP_DELAY);
    }

    function recordWheelEvent() {
        var now = Date.now();
        wheelEvents.push(now);
        while (wheelEvents.length > 0 && now - wheelEvents[0] > RAPID_WINDOW) {
            wheelEvents.shift();
        }
        return wheelEvents.length >= RAPID_THRESHOLD;
    }

    function onWheel(e) {
        if (isTransitioning && !rapidMode) {
            e.preventDefault();
            return;
        }

        var isRapid = recordWheelEvent();

        if (rapidMode) {
            var detectedIdx = detectCurrentScene();
            if (detectedIdx !== currentIndex) {
                currentIndex = detectedIdx;
                syncActiveClasses(detectedIdx);
                updateHeader();
                updateBackToTop();
            }
            scheduleSnap();
            return;
        }

        if (isRapid) {
            enterRapidMode();
            scheduleSnap();
            return;
        }

        if (isScrollableScene(currentIndex)) {
            var scene = scenes[currentIndex];
            var scrollTop = scene.scrollTop;
            var scrollHeight = scene.scrollHeight;
            var clientHeight = scene.clientHeight;
            var atTop = scrollTop <= 1;
            var atBottom = scrollTop + clientHeight >= scrollHeight - 5;

            if (e.deltaY > 0 && atBottom) {
                e.preventDefault();
                goToScene(currentIndex + 1);
            } else if (e.deltaY < 0 && atTop) {
                e.preventDefault();
                goToScene(currentIndex - 1);
            }
            return;
        }

        var isLast = currentIndex === scenes.length - 1;

        if (isLast && e.deltaY > 0) {
            var docBottom = document.documentElement.scrollHeight;
            var viewBottom = window.scrollY + window.innerHeight;
            if (viewBottom < docBottom - 5) {
                return;
            }
        }

        if (isLast && e.deltaY < 0) {
            var sceneTop = scenes[currentIndex].offsetTop;
            if (window.scrollY > sceneTop + 5) {
                return;
            }
        }

        e.preventDefault();

        wheelAccumulator += e.deltaY;
        clearTimeout(wheelTimer);
        wheelTimer = setTimeout(function () {
            wheelAccumulator = 0;
        }, 200);

        if (Math.abs(wheelAccumulator) >= WHEEL_THRESHOLD) {
            var direction = wheelAccumulator > 0 ? 1 : -1;
            wheelAccumulator = 0;
            if (direction > 0) {
                goToScene(currentIndex + 1);
            } else {
                goToScene(currentIndex - 1);
            }
        }
    }

    function onKeydown(e) {
        if (isTransitioning) return;

        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
            case 'PageDown':
                e.preventDefault();
                handleNavigation(1);
                break;
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                handleNavigation(-1);
                break;
            case 'Home':
                e.preventDefault();
                goToScene(0);
                break;
            case 'End':
                e.preventDefault();
                goToScene(scenes.length - 1);
                break;
        }
    }

    function handleNavigation(direction) {
        if (isTransitioning) return;

        if (isScrollableScene(currentIndex)) {
            var scene = scenes[currentIndex];
            var scrollTop = scene.scrollTop;
            var scrollHeight = scene.scrollHeight;
            var clientHeight = scene.clientHeight;

            if (direction > 0 && scrollTop + clientHeight >= scrollHeight - 5) {
                goToScene(currentIndex + 1);
            } else if (direction < 0 && scrollTop <= 5) {
                goToScene(currentIndex - 1);
            }
            return;
        }

        if (direction > 0) {
            goToScene(currentIndex + 1);
        } else if (direction < 0) {
            goToScene(currentIndex - 1);
        }
    }

    var touchStartY = 0;
    var touchStartTime = 0;

    function onTouchStart(e) {
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
    }

    function onTouchMove(e) {
        if (isTransitioning) {
            e.preventDefault();
            return;
        }

        if (!isScrollableScene(currentIndex)) {
            e.preventDefault();
        }
    }

    function onTouchEnd(e) {
        if (isTransitioning) return;

        var deltaY = touchStartY - e.changedTouches[0].clientY;
        var deltaTime = Date.now() - touchStartTime;

        if (Math.abs(deltaY) < 50 || deltaTime > 600) return;

        var direction = deltaY > 0 ? 1 : -1;
        handleNavigation(direction);
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

    function findSceneIndex(el) {
        for (var i = 0; i < scenes.length; i++) {
            if (scenes[i] === el || scenes[i].contains(el)) {
                return i;
            }
        }
        return -1;
    }

    goToScene(0, true);
    initHeroReveal();

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeydown);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    window.addEventListener('resize', function () {
        goToScene(currentIndex, true);
    });

    if (backToTop) {
        backToTop.addEventListener('click', function () {
            goToScene(0);
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
                var sceneIndex = findSceneIndex(target);
                if (sceneIndex >= 0) {
                    goToScene(sceneIndex);
                }
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
