(function () {
    'use strict';

    var TRACKING_ENDPOINT = 'https://your-api.example.com/track';

    function sendEvent(payload) {
        var data = JSON.stringify(payload);
        var sent = false;
        if (navigator.sendBeacon) {
            try {
                var blob = new Blob([data], { type: 'application/json' });
                sent = navigator.sendBeacon(TRACKING_ENDPOINT, blob);
            } catch (e) {
                sent = false;
            }
        }
        if (!sent && window.fetch) {
            fetch(TRACKING_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data,
                keepalive: true
            }).catch(function () {});
        }
    }

    function init() {
        var pageVisitPayload = {
            event: 'page_visit',
            referrer: document.referrer || '',
            viewport_width: window.innerWidth || 0,
            viewport_height: window.innerHeight || 0,
            timestamp: Date.now()
        };
        sendEvent(pageVisitPayload);

        var els = document.querySelectorAll('[data-track-btn]');
        els.forEach(function (el) {
            el.addEventListener('click', function () {
                var sectionId = 'global';
                var parentSection = el.closest('section');
                if (parentSection) {
                    sectionId = parentSection.id || parentSection.className.split(' ')[0] || 'section';
                } else if (el.closest('header')) {
                    sectionId = 'header';
                } else if (el.closest('footer')) {
                    sectionId = 'footer';
                }

                sendEvent({
                    event: 'btn_click',
                    button_id: el.getAttribute('data-track-btn') || '',
                    button_text: el.textContent.trim(),
                    section: sectionId,
                    timestamp: Date.now()
                });
            });
        });

        if ('IntersectionObserver' in window) {
            var viewedSectionsKey = 'hari_viewed_sections';
            var viewedSections = {};
            try {
                viewedSections = JSON.parse(sessionStorage.getItem(viewedSectionsKey) || '{}');
            } catch (e) {}

            var sectionTimers = {};

            var sectionObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    var id = entry.target.id;
                    if (entry.isIntersecting) {
                        if (!viewedSections[id]) {
                            sectionTimers[id] = setTimeout(function () {
                                viewedSections[id] = true;
                                try {
                                    sessionStorage.setItem(viewedSectionsKey, JSON.stringify(viewedSections));
                                } catch (e) {}
                                sendEvent({
                                    event: 'section_view',
                                    section_id: id,
                                    duration_ms: 1500,
                                    timestamp: Date.now()
                                });
                            }, 1500);
                        }
                    } else {
                        if (sectionTimers[id]) {
                            clearTimeout(sectionTimers[id]);
                            delete sectionTimers[id];
                        }
                    }
                });
            }, {
                threshold: 0.25
            });

            var sectionsToTrack = [
                'scene-hero',
                'scene-demo',
                'scene-founder',
                'scene-philosophy',
                'scene-how-it-works',
                'scene-testimonials',
                'scene-pricing',
                'scene-download',
                'scene-faq'
            ];

            sectionsToTrack.forEach(function (id) {
                var el = document.getElementById(id);
                if (el) {
                    sectionObserver.observe(el);
                }
            });
        }

        var scrollMarkers = [25, 50, 75, 100];
        var triggeredMarkers = {};

        function checkScrollDepth() {
            var scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
            var docHeight = document.documentElement.scrollHeight;
            var winHeight = window.innerHeight || document.documentElement.clientHeight;
            var totalScrollable = docHeight - winHeight;
            if (totalScrollable <= 0) return;

            var percentage = Math.min(100, Math.round((scrollTop / totalScrollable) * 100));

            scrollMarkers.forEach(function (marker) {
                if (percentage >= marker && !triggeredMarkers[marker]) {
                    triggeredMarkers[marker] = true;
                    sendEvent({
                        event: 'scroll_depth',
                        percentage: marker,
                        timestamp: Date.now()
                    });
                }
            });
        }

        var scrollTimeout;
        window.addEventListener('scroll', function () {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(function () {
                    scrollTimeout = null;
                    checkScrollDepth();
                }, 100);
            }
        }, { passive: true });

        checkScrollDepth();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
