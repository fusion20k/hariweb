(function () {
  'use strict';

  var EXTENSION_ID = 'mheinmngfhebgbbaceolefnpmfepidae';
  var CHROME_STORE_URL = 'https://chromewebstore.google.com/detail/' + EXTENSION_ID;
  var COOKIE_NAME = 'hari_referral';
  var COOKIE_MAX_AGE = 2592000; // 30 days
  var API_BASE = '/api/partner';

  // ─── Cookie helpers ──────────────────────────────────────────────

  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

  function setCookie(name, value, maxAge) {
    document.cookie =
      name + '=' + encodeURIComponent(value) +
      '; Path=/; Max-Age=' + (maxAge || COOKIE_MAX_AGE) +
      '; Secure; SameSite=Lax';
  }

  // ─── Extract slug from path ──────────────────────────────────────

  function getSlugFromPath() {
    var path = window.location.pathname;
    // /p/fasou → fasou, /p/fasou/ → fasou
    var parts = path.replace(/^\/p\//, '').replace(/\/$/, '').split('/');
    return parts[0] || null;
  }

  // ─── API calls ───────────────────────────────────────────────────

  function startPartnerFlow(slug) {
    return fetch(API_BASE + '/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: slug })
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.referralToken) {
          setCookie(COOKIE_NAME, data.referralToken, COOKIE_MAX_AGE);
        }
        return data;
      });
  }

  function recordClick(referralToken) {
    return fetch(API_BASE + '/click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ referralToken: referralToken })
    }).then(function (res) { return res.json(); });
  }

  // ─── Install click handler ───────────────────────────────────────

  function handleInstallClick(e) {
    e.preventDefault();

    var btn = e.currentTarget;
    btn.classList.add('is-loading');
    btn.disabled = true;

    var token = getCookie(COOKIE_NAME);

    recordClick(token)
      .catch(function () {
        // continue even if click tracking fails
      })
      .then(function () {
        window.location.href = CHROME_STORE_URL;
      });
  }

  // ─── Init ────────────────────────────────────────────────────────

  function init() {
    var slug = getSlugFromPath();
    if (!slug) return;

    // Update UI with partner name
    var partnerNameEl = document.getElementById('js-partner-name');
    if (partnerNameEl) {
      partnerNameEl.textContent = capitalize(slug);
    }

    // Start partner flow: create referral token
    startPartnerFlow(slug).then(function (data) {
      var statusEl = document.getElementById('js-flow-status');
      if (statusEl && data.referralToken) {
        statusEl.textContent = '';
      }
    }).catch(function () {
      // The page still works — backend may be unreachable during dev
    });

    // Bind install button
    var installBtn = document.getElementById('js-install-btn');
    if (installBtn) {
      installBtn.addEventListener('click', handleInstallClick);
    }
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // ─── Bootstrap ───────────────────────────────────────────────────

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for post-install page use
  window.__hariPartner = {
    getCookie: getCookie,
    setCookie: setCookie,
    EXTENSION_ID: EXTENSION_ID,
    getSlugFromPath: getSlugFromPath
  };

})();