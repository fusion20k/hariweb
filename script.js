(function () {
    'use strict';

    var TAGALOG_WORDS = [
        // Batch 0
        {
            word: 'Mahal',
            pronunciation: 'mah \u00b7 HAL',
            pos: 'adjective',
            meaning: 'beloved; expensive',
            sentence: '"\u003cspan class="word-highlight"\u003eMahal\u003c/span\u003e kita," she finally said \u2014 quietly, over the phone, after years of not saying it.',
            usage: 'The same word covers love and cost. What you treasure is what you\'d pay anything for.'
        },
        {
            word: 'Salamat',
            pronunciation: 'sa \u00b7 LAH \u00b7 mat',
            pos: 'interjection',
            meaning: 'thank you',
            sentence: 'He left a note on the counter: "\u003cspan class="word-highlight"\u003eSalamat\u003c/span\u003e" \u2014 nothing else, just that one word and a smiley face.',
            usage: 'The default expression of gratitude in Filipino. Warmer than a quick "thanks."'
        },
        {
            word: 'Barkada',
            pronunciation: 'bar \u00b7 KAH \u00b7 da',
            pos: 'noun',
            meaning: 'a tight-knit group of friends; one\'s crew',
            sentence: 'She didn\'t need a big party \u2014 her \u003cspan class="word-highlight"\u003ebarkada\u003c/span\u003e showed up with food and that was enough.',
            usage: 'More than "friend group." A barkada implies history, loyalty, and shared mischief.'
        },
        // Batch 1
        {
            word: 'Sama-sama',
            pronunciation: 'SAH \u00b7 ma SAH \u00b7 ma',
            pos: 'adverb',
            meaning: 'together; all at once; as one',
            sentence: 'The whole family ate \u003cspan class="word-highlight"\u003esama-sama\u003c/span\u003e \u2014 squeezed around a table too small for all of them.',
            usage: 'Reduplication (repeating a root) is a core feature of Tagalog grammar. "Sama" = to join; "sama-sama" = everyone joining.'
        },
        {
            word: 'Ingat',
            pronunciation: 'EE \u00b7 ngat',
            pos: 'verb \u00b7 interjection',
            meaning: 'to be careful; take care (farewell)',
            sentence: 'Her lola called after her: "\u003cspan class="word-highlight"\u003eIngat\u003c/span\u003e!" \u2014 the same thing every time she left the house.',
            usage: 'Used as a goodbye that means "be safe." Grandparents say it constantly.'
        },
        {
            word: 'Talaga',
            pronunciation: 'ta \u00b7 LAH \u00b7 ga',
            pos: 'adverb',
            meaning: 'really; truly; indeed',
            sentence: '"\u003cspan class="word-highlight"\u003eTalaga\u003c/span\u003e?" she asked, leaning forward \u2014 the kind of really that means tell me everything.',
            usage: 'One of the most flexible Tagalog words. Tone completely changes the meaning.'
        },
        // Batch 2
        {
            word: 'Kuya',
            pronunciation: 'KOO \u00b7 ya',
            pos: 'noun \u00b7 title',
            meaning: 'older brother; respectful address for any older male',
            sentence: 'She flagged down the server: "\u003cspan class="word-highlight"\u003eKuya\u003c/span\u003e!" \u2014 it worked better than raising her hand.',
            usage: 'Not just for siblings. Calling a stranger Kuya is a sign of respect and familiarity. Ate is the female equivalent.'
        },
        {
            word: 'Puso',
            pronunciation: 'POO \u00b7 so',
            pos: 'noun',
            meaning: 'heart',
            sentence: 'The doctor said his \u003cspan class="word-highlight"\u003epuso\u003c/span\u003e was strong \u2014 the family exhaled at once.',
            usage: 'Used literally and figuratively, just like "heart" in English. Also a common word in Filipino pop songs.'
        },
        {
            word: 'Masaya',
            pronunciation: 'ma \u00b7 SAH \u00b7 ya',
            pos: 'adjective',
            meaning: 'happy; joyful; fun',
            sentence: 'It was a small birthday \u2014 just cake and karaoke \u2014 but it was so \u003cspan class="word-highlight"\u003emasaya\u003c/span\u003e.',
            usage: 'Can describe a person\'s mood or a situation\'s vibe. "Masaya dito" = it\'s fun here.'
        },
        // Batch 3
        {
            word: 'Sige',
            pronunciation: 'see \u00b7 GEH',
            pos: 'interjection',
            meaning: 'okay; go ahead; sure; alright then',
            sentence: '"\u003cspan class="word-highlight"\u003eSige\u003c/span\u003e, pumunta na tayo" \u2014 fine, let\'s just go already.',
            usage: 'One of the most heard words in everyday Filipino conversation. Can express agreement, resignation, or encouragement.'
        },
        {
            word: 'Lipad',
            pronunciation: 'LEE \u00b7 pad',
            pos: 'verb',
            meaning: 'to fly',
            sentence: 'She watched the plane until it disappeared \u2014 her brother was finally going to \u003cspan class="word-highlight"\u003elipad\u003c/span\u003e somewhere new.',
            usage: 'Root word. "Lumipad" = he/she flew; "maglipad" = to fly (infinitive). Filipino verbs conjugate through affixes.'
        },
        {
            word: 'Tahimik',
            pronunciation: 'ta \u00b7 HEE \u00b7 mik',
            pos: 'adjective',
            meaning: 'quiet; peaceful; still',
            sentence: 'At 5am the neighborhood was \u003cspan class="word-highlight"\u003etahimik\u003c/span\u003e \u2014 she drank her coffee and didn\'t want it to end.',
            usage: 'Can mean quiet (no noise) or peaceful (serene). Often used to describe places or moments, not just people.'
        },
        // Batch 4
        {
            word: 'Umaga',
            pronunciation: 'oo \u00b7 MAH \u00b7 ga',
            pos: 'noun',
            meaning: 'morning',
            sentence: '"Magandang \u003cspan class="word-highlight"\u003eumaga\u003c/span\u003e," her dad always said \u2014 good morning \u2014 before anyone else was even awake.',
            usage: '"Magandang umaga" = good morning. "Maganda" = beautiful. Filipino greetings are literally "beautiful morning/afternoon/evening."'
        },
        {
            word: 'Gutom',
            pronunciation: 'GOO \u00b7 tom',
            pos: 'adjective',
            meaning: 'hungry',
            sentence: 'They arrived at the restaurant with nothing planned except being very \u003cspan class="word-highlight"\u003egutom\u003c/span\u003e.',
            usage: '"Gutom na ako" = I\'m already hungry. A word that appears often and urgently in Filipino households.'
        },
        {
            word: 'Luto',
            pronunciation: 'LOO \u00b7 toh',
            pos: 'verb \u00b7 adjective',
            meaning: 'to cook; cooked (done cooking)',
            sentence: '"\u003cspan class="word-highlight"\u003eLuto\u003c/span\u003e na," her nanay announced, and everyone moved toward the kitchen.',
            usage: '"Luto na" = it\'s done / the food is ready. Hearing this phrase means it\'s time to gather.'
        },
        // Batch 5
        {
            word: 'Bahay',
            pronunciation: 'ba \u00b7 HI',
            pos: 'noun',
            meaning: 'house; home',
            sentence: 'After a year abroad, she stepped off the plane and just wanted to go \u003cspan class="word-highlight"\u003ebahay\u003c/span\u003e.',
            usage: '"Uwi na tayo sa bahay" = let\'s go home. More than a structure \u2014 implies warmth and belonging.'
        },
        {
            word: 'Maganda',
            pronunciation: 'ma \u00b7 GAN \u00b7 da',
            pos: 'adjective',
            meaning: 'beautiful; pretty; nice',
            sentence: 'They drove through the province and she kept saying it \u2014 "\u003cspan class="word-highlight"\u003eMaganda\u003c/span\u003e" \u2014 to no one in particular.',
            usage: 'Describes people, places, sunsets, ideas. Also used in greetings: "Magandang hapon" = good afternoon.'
        },
        {
            word: 'Tayo',
            pronunciation: 'tah \u00b7 YO',
            pos: 'pronoun',
            meaning: 'we / us (inclusive \u2014 speaker and listener both included)',
            sentence: '"Kain na \u003cspan class="word-highlight"\u003etayo\u003c/span\u003e" \u2014 let\'s eat \u2014 is the phrase that signals everything is ready.',
            usage: 'Tagalog has two words for "we": "tayo" (includes the listener) and "kami" (excludes the listener). A rare grammatical distinction.'
        },
        // Batch 6
        {
            word: 'Naman',
            pronunciation: 'NAH \u00b7 man',
            pos: 'particle',
            meaning: 'softens a request; adds contrast or emphasis; "come on" / "for its part"',
            sentence: '"Sige \u003cspan class="word-highlight"\u003enaman\u003c/span\u003e," he said \u2014 the kind of come on that sounds like a gentle plea.',
            usage: 'One of Tagalog\'s most expressive particles. Nearly untranslatable on its own \u2014 it modulates tone, not content.'
        },
        {
            word: 'Alis',
            pronunciation: 'AH \u00b7 lis',
            pos: 'verb',
            meaning: 'to leave; to go; to remove',
            sentence: '"\u003cspan class="word-highlight"\u003eAlis\u003c/span\u003e na tayo" \u2014 they said it at the same time, grabbed their things, and left.',
            usage: '"Umalis na" = already left / gone. "Aalis na ako" = I\'m leaving now. Used constantly as a departure signal.'
        },
        {
            word: 'Pagmamahal',
            pronunciation: 'pag \u00b7 ma \u00b7 ma \u00b7 HAL',
            pos: 'noun',
            meaning: 'love; affection; the act of loving',
            sentence: 'She wrote in the card: "With all my \u003cspan class="word-highlight"\u003epagmamahal\u003c/span\u003e" \u2014 then crossed it out and wrote it again anyway.',
            usage: 'The noun form of "mahal." Prefixing "pag-" turns verbs and adjectives into the act or state of something.'
        },
        // Batch 7
        {
            word: 'Lakad',
            pronunciation: 'LAH \u00b7 kad',
            pos: 'noun \u00b7 verb',
            meaning: 'walk; errand; plan; a thing to do',
            sentence: '"May \u003cspan class="word-highlight"\u003elakad\u003c/span\u003e ako" \u2014 I have somewhere to be \u2014 was all she said before disappearing for three hours.',
            usage: 'Flexible word. Can mean a literal walk, a scheduled errand, or a vague "I have plans." Often used as a polite excuse.'
        },
        {
            word: 'Bago',
            pronunciation: 'BAH \u00b7 go',
            pos: 'adjective \u00b7 adverb',
            meaning: 'new; before (as a conjunction)',
            sentence: 'She put on the \u003cspan class="word-highlight"\u003ebago\u003c/span\u003e shoes and immediately felt like a different person.',
            usage: '"Bago" meaning "new" and "bago" meaning "before" are the same word \u2014 context separates them. "Bago umalis" = before leaving.'
        },
        {
            word: 'Dito',
            pronunciation: 'DEE \u00b7 toh',
            pos: 'adverb',
            meaning: 'here; in this place',
            sentence: '"Halika \u003cspan class="word-highlight"\u003edito\u003c/span\u003e" \u2014 come here \u2014 carries different weight depending on who says it.',
            usage: 'Part of a three-way distance system: dito (here), diyan (there, near you), doon (there, far away). Tagalog is precise about proximity.'
        },
        // Batch 8
        {
            word: 'Malayo',
            pronunciation: 'ma \u00b7 LAH \u00b7 yo',
            pos: 'adjective \u00b7 adverb',
            meaning: 'far; distant; a long way off',
            sentence: 'They said the hospital was \u003cspan class="word-highlight"\u003emalayo\u003c/span\u003e \u2014 but she drove there anyway, without thinking about it.',
            usage: '"Malayo pa" = still far / not yet close. Often used emotionally as well as physically.'
        },
        {
            word: 'Gabi',
            pronunciation: 'GAH \u00b7 bi',
            pos: 'noun',
            meaning: 'night; evening',
            sentence: '"Magandang \u003cspan class="word-highlight"\u003egabi\u003c/span\u003e," the host said, and the crowd settled into something warmer.',
            usage: '"Magandang gabi" = good evening. "Gabi na" = it\'s already night \u2014 sometimes said with surprise, sometimes resignation.'
        },
        {
            word: 'Ate',
            pronunciation: 'AH \u00b7 teh',
            pos: 'noun \u00b7 title',
            meaning: 'older sister; respectful address for any older female',
            sentence: '"\u003cspan class="word-highlight"\u003eAte\u003c/span\u003e, paki-pass ng asin?" \u2014 she didn\'t need to know her name to ask politely.',
            usage: 'Like Kuya, Ate is used for any older woman \u2014 siblings, cashiers, nurses. Shows respect without formality.'
        },
        // Batch 9
        {
            word: 'Ganoon',
            pronunciation: 'ga \u00b7 NOON',
            pos: 'adverb \u00b7 pronoun',
            meaning: 'like that; in that way; that\'s how it is',
            sentence: '"\u003cspan class="word-highlight"\u003eGanoon\u003c/span\u003e talaga," her lola said, with a shrug that meant some things just are what they are.',
            usage: 'Short form: "ganon." Used to describe manner or to accept reality. "Ganoon pala" = so that\'s how it is / ah, I see.'
        },
        {
            word: 'Mano po',
            pronunciation: 'MAH \u00b7 no \u00b7 poh',
            pos: 'phrase \u00b7 gesture',
            meaning: 'a gesture of respect: pressing an elder\'s hand to your forehead',
            sentence: 'He greeted his lolo with "\u003cspan class="word-highlight"\u003eMano po\u003c/span\u003e," taking his hand gently the way he\'d been taught as a kid.',
            usage: 'A physical act of greeting elders. "Mano" = hand (from Spanish); "po" = polite particle. Deeply embedded in Filipino family culture.'
        },
        {
            word: 'Kain',
            pronunciation: 'KA \u00b7 in',
            pos: 'verb',
            meaning: 'to eat',
            sentence: '"\u003cspan class="word-highlight"\u003eKain\u003c/span\u003e na!" was yelled from the kitchen, and nobody needed to be told twice.',
            usage: '"Kain na tayo" = let\'s eat. "Kumain ka na ba?" = have you eaten yet? Asking this is a form of caring in Filipino culture.'
        }
    ];

    function getTodaysWordIndices() {
        var WORDS_PER_DAY = 3;
        var POOL_SIZE = 30;
        var BATCH_COUNT = POOL_SIZE / WORDS_PER_DAY;

        var now = new Date();
        var estDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));

        if (estDate.getHours() < 6) {
            estDate.setDate(estDate.getDate() - 1);
        }

        var midnight = new Date(estDate.getFullYear(), estDate.getMonth(), estDate.getDate());
        var epoch = new Date(2025, 0, 1);
        var daysSinceEpoch = Math.floor((midnight - epoch) / (1000 * 60 * 60 * 24));
        var batchIndex = ((daysSinceEpoch % BATCH_COUNT) + BATCH_COUNT) % BATCH_COUNT;
        var start = batchIndex * WORDS_PER_DAY;
        return [start, start + 1, start + 2];
    }

    function initWordCards() {
        var container = document.getElementById('word-cards');
        if (!container) return;
        var indices = getTodaysWordIndices();
        indices.forEach(function (idx, i) {
            var w = TAGALOG_WORDS[idx];
            var card = document.createElement('article');
            card.className = 'word-card';
            card.setAttribute('data-card', String(i + 1));
            card.setAttribute('data-animate', '');
            card.innerHTML = [
                '<header class="word-card-header">',
                '  <span class="word-tagalog">' + w.word + '</span>',
                '  <span class="word-pos">' + w.pos + '</span>',
                '</header>',
                '<div class="word-pronunciation">' + w.pronunciation + '</div>',
                '<div class="word-meaning">' + w.meaning + '</div>',
                '<blockquote class="word-sentence">' + w.sentence + '</blockquote>',
                '<p class="word-usage">' + w.usage + '</p>'
            ].join('');
            container.appendChild(card);
        });
    }

    initWordCards();

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

    (function initCompareSlider() {
        var slider = document.getElementById('compare-slider');
        if (!slider) return;
        var after = document.getElementById('compare-after');
        var divider = document.getElementById('compare-divider');
        var handle = document.getElementById('compare-handle');
        if (!after || !divider || !handle) return;
        var legend = slider.parentNode.querySelector('.compare-legend');

        var dragging = false;
        var pointerId = null;
        var hasInteracted = false;

        function setPosition(percent) {
            var clamped = Math.max(0, Math.min(100, percent));
            after.style.clipPath = 'inset(0 0 0 ' + clamped + '%)';
            divider.style.left = clamped + '%';
            handle.setAttribute('aria-valuenow', String(Math.round(clamped)));
            if (legend) {
                legend.style.setProperty('--compare-percent', clamped + '%');
                legend.style.setProperty('--compare-before', (100 - clamped) / 100);
                legend.style.setProperty('--compare-after', clamped / 100);
            }
        }

        function markInteracted() {
            if (hasInteracted) return;
            hasInteracted = true;
            slider.classList.add('has-interacted');
        }

        function updateFromEvent(e) {
            var rect = slider.getBoundingClientRect();
            var x = e.clientX - rect.left;
            setPosition((x / rect.width) * 100);
        }

        slider.addEventListener('pointerdown', function (e) {
            dragging = true;
            pointerId = e.pointerId;
            markInteracted();
            try { slider.setPointerCapture(e.pointerId); } catch (err) {}
            updateFromEvent(e);
            e.preventDefault();
        });

        slider.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            updateFromEvent(e);
        });

        function endDrag(e) {
            if (!dragging) return;
            dragging = false;
            if (pointerId !== null) {
                try { slider.releasePointerCapture(pointerId); } catch (err) {}
                pointerId = null;
            }
        }

        slider.addEventListener('pointerup', endDrag);
        slider.addEventListener('pointercancel', endDrag);
        slider.addEventListener('pointerleave', endDrag);

        handle.addEventListener('keydown', function (e) {
            markInteracted();
            var current = parseFloat(handle.getAttribute('aria-valuenow')) || 50;
            var step = e.shiftKey ? 10 : 2;
            if (e.key === 'ArrowLeft') {
                setPosition(current - step);
                e.preventDefault();
            } else if (e.key === 'ArrowRight') {
                setPosition(current + step);
                e.preventDefault();
            } else if (e.key === 'Home') {
                setPosition(0);
                e.preventDefault();
            } else if (e.key === 'End') {
                setPosition(100);
                e.preventDefault();
            }
        });

        setPosition(50);
    })();

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

    function initBottomTabNav() {
        var tabs = document.querySelectorAll('.tab-link');
        if (!tabs.length) return;
        var sections = [
            { id: 'scene-hero', tab: 'hero' },
            { id: 'scene-demo', tab: 'hero' },
            { id: 'scene-how', tab: 'hero' },
            { id: 'scene-culture', tab: 'hero' },
            { id: 'scene-vs-pc', tab: 'hero' },
            { id: 'scene-reassurance', tab: 'hero' },
            { id: 'scene-how-it-works', tab: 'how' },
            { id: 'scene-words', tab: 'how' },
            { id: 'scene-pricing', tab: 'how' },
            { id: 'scene-faq', tab: 'faq' },
            { id: 'scene-closing', tab: 'faq' }
        ];
        window.addEventListener('scroll', function () {
            var current = 'hero';
            sections.forEach(function (s) {
                var el = document.getElementById(s.id);
                if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
                    current = s.tab;
                }
            });
            tabs.forEach(function (t) {
                t.classList.toggle('is-active', t.dataset.tab === current);
            });
        }, { passive: true });
    }

    initBottomTabNav();

    function initHeroAnimation() {
        var els = document.querySelectorAll('.hero-letter, .hero-eagle-wrap, .hero-counter, .hero-bottom, .hero-nav-strip');
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
        var rafId = null;

        hero.addEventListener('mousemove', function (e) {
            var rect = hero.getBoundingClientRect();
            var dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
            var dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
            targetX = dx * 14;
            targetY = dy * 9;
        }, { passive: true });

        hero.addEventListener('mouseleave', function () {
            targetX = 0;
            targetY = 0;
        }, { passive: true });

        function tick() {
            currentX += (targetX - currentX) * 0.07;
            currentY += (targetY - currentY) * 0.07;
            eagleImg.style.transform = 'translate(' + currentX.toFixed(2) + 'px, ' + currentY.toFixed(2) + 'px)';
            rafId = requestAnimationFrame(tick);
        }

        tick();
    }

    initHeroParallax();

    function initHeroCounter() {
        var numEl = document.querySelector('.hero-counter-num');
        var captionEl = document.querySelector('[data-counter-caption]');
        var prevBtn = document.querySelector('[data-counter-prev]');
        var nextBtn = document.querySelector('[data-counter-next]');
        if (!numEl || !prevBtn || !nextBtn) return;

        var slides = [
            { num: '01', caption: 'Click any English word to learn it in Tagalog' },
            { num: '02', caption: 'Adaptive review that fits your browsing' },
            { num: '03', caption: 'Free forever to add to Chrome' }
        ];
        var current = 0;
        var autoTimer = null;
        var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function goTo(index) {
            current = (index + slides.length) % slides.length;
            numEl.classList.add('counter-changing');
            if (captionEl) captionEl.classList.add('counter-changing');
            setTimeout(function () {
                numEl.textContent = slides[current].num;
                if (captionEl) captionEl.textContent = slides[current].caption;
                numEl.classList.remove('counter-changing');
                if (captionEl) captionEl.classList.remove('counter-changing');
            }, 180);
        }

        function resetTimer() {
            if (autoTimer) clearInterval(autoTimer);
            if (!reducedMotion) {
                autoTimer = setInterval(function () { goTo(current + 1); }, 6000);
            }
        }

        prevBtn.addEventListener('click', function () {
            goTo(current - 1);
            resetTimer();
        });

        nextBtn.addEventListener('click', function () {
            goTo(current + 1);
            resetTimer();
        });

        if (!reducedMotion) {
            autoTimer = setInterval(function () { goTo(current + 1); }, 6000);
        }
    }

    initHeroCounter();

})();
