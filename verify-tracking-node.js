const fs = require('fs');
const path = require('path');

global.window = {
    innerWidth: 1280,
    innerHeight: 720,
    addEventListener: () => {},
    scrollY: 0,
    pageYOffset: 0
};

global.document = {
    referrer: 'https://reddit.com/',
    readyState: 'complete',
    addEventListener: (event, cb) => {
        if (event === 'DOMContentLoaded') {
            cb();
        }
    },
    documentElement: {
        scrollTop: 0,
        scrollHeight: 2000,
        clientHeight: 720
    },
    querySelectorAll: (selector) => {
        if (selector === '[data-track-btn]') {
            return [
                {
                    dataset: { trackBtn: 'hero-primary' },
                    getAttribute: (attr) => attr === 'data-track-btn' ? 'hero-primary' : null,
                    textContent: 'Start Learning Free',
                    closest: (sel) => {
                        if (sel === 'section') {
                            return { id: 'scene-hero' };
                        }
                        return null;
                    },
                    addEventListener: (event, cb) => {
                        if (event === 'click') {
                            global.mockClick = cb;
                        }
                    }
                }
            ];
        }
        return [];
    },
    getElementById: (id) => {
        return { id: id };
    }
};

const sentEvents = [];

global.navigator = {
    sendBeacon: (url, blob) => {
        sentEvents.push({ url, body: JSON.parse(blob.text) });
        return true;
    }
};

global.Blob = class {
    constructor(parts, options) {
        this.parts = parts;
        this.options = options;
        this.text = parts[0];
    }
};

global.sessionStorage = {
    store: {},
    getItem(key) {
        return this.store[key] || null;
    },
    setItem(key, value) {
        this.store[key] = String(value);
    }
};

global.IntersectionObserver = class {
    constructor(callback, options) {
        global.mockIntersectionTrigger = callback;
        this.options = options;
    }
    observe() {}
};

global.window.IntersectionObserver = global.IntersectionObserver;

const code = fs.readFileSync(path.join(__dirname, 'tracking.js'), 'utf8');
eval(code);

const pageVisitEvent = sentEvents.find(e => e.body.event === 'page_visit');
if (!pageVisitEvent) {
    console.error('FAIL: page_visit event not sent!');
    process.exit(1);
} else {
    console.log('PASS: page_visit event successfully sent:', pageVisitEvent.body);
}

if (typeof global.mockClick === 'function') {
    global.mockClick();
    const btnClickEvent = sentEvents.find(e => e.body.event === 'btn_click');
    if (!btnClickEvent) {
        console.error('FAIL: btn_click event not sent on click!');
        process.exit(1);
    } else {
        console.log('PASS: btn_click event successfully sent:', btnClickEvent.body);
    }
} else {
    console.error('FAIL: mockClick not bound!');
    process.exit(1);
}

if (typeof global.mockIntersectionTrigger === 'function') {
    global.mockIntersectionTrigger([
        {
            target: { id: 'scene-hero' },
            isIntersecting: true
        }
    ]);

    setTimeout(() => {
        const sectionViewEvent = sentEvents.find(e => e.body.event === 'section_view');
        if (!sectionViewEvent) {
            console.error('FAIL: section_view event not sent after 1.5s!');
            process.exit(1);
        } else {
            console.log('PASS: section_view event successfully sent after 1.5s:', sectionViewEvent.body);
            console.log('All tracking assertions passed successfully!');
            process.exit(0);
        }
    }, 1600);
} else {
    console.error('FAIL: mockIntersectionTrigger not bound!');
    process.exit(1);
}
