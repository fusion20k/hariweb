(function () {
  'use strict';

  var EXTENSION_ID = 'mheinmngfhebgbbaceolefnpmfepidae';
  var CHROME_STORE_URL = 'https://chromewebstore.google.com/detail/' + EXTENSION_ID;
  var FASOU_INSTALL_URL = 'https://haribackend-mitj.onrender.com/fasou/install';
  var COOKIE_NAME = 'hari_referral';
  var COOKIE_MAX_AGE = 2592000; // 30 days
  var API_BASE = 'https://haribackend-mitj.onrender.com/api/partner';
  var currentSlug = null;

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

  // ─── Fallback-getter: cookie → sessionStorage → URL params ───────

  function getReferralToken() {
    var token = getCookie(COOKIE_NAME);
    if (token) return token;
    try { token = sessionStorage.getItem(COOKIE_NAME); } catch (e) { /* ignore */ }
    if (token) return token;
    try {
      var params = new URLSearchParams(window.location.search);
      token = params.get('token') || params.get('referralToken') || params.get('ref');
    } catch (e) { /* ignore */ }
    return token || null;
  }

  function saveReferralToken(token) {
    setCookie(COOKIE_NAME, token, COOKIE_MAX_AGE);
    try { sessionStorage.setItem(COOKIE_NAME, token); } catch (e) { /* ignore */ }
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
          saveReferralToken(data.referralToken);
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

    var token = getReferralToken();

    recordClick(token)
      .catch(function () {
        // continue even if click tracking fails
      })
      .then(function () {
        if (currentSlug === 'fasou') {
          window.location.href = FASOU_INSTALL_URL;
        } else {
          window.location.href = CHROME_STORE_URL;
        }
      });
  }

  // ─── Init ────────────────────────────────────────────────────────

  function init() {
    var slug = getSlugFromPath();
    if (!slug) return;
    currentSlug = slug;

    // Update UI with partner name
    var partnerNameEl = document.getElementById('js-partner-name');
    if (partnerNameEl) {
      partnerNameEl.textContent = capitalize(slug);
    }

    // Start partner flow: create referral token
    var statusEl = document.getElementById('js-flow-status');
    if (statusEl) {
      statusEl.textContent = 'Preparing your plan\u2026';
    }
    startPartnerFlow(slug).then(function (data) {
      if (statusEl && data.referralToken) {
        statusEl.textContent = '';
      }
    }).catch(function () {
      if (statusEl) {
        statusEl.textContent = 'Unable to reach server. You can still install — your plan will be ready when you sign in.';
        statusEl.style.color = '#b8860b';
      }
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
    getReferralToken: getReferralToken,
    saveReferralToken: saveReferralToken,
    EXTENSION_ID: EXTENSION_ID,
    COOKIE_NAME: COOKIE_NAME,
    getSlugFromPath: getSlugFromPath
  };

})();