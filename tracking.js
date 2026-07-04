(function () {
  var SUPABASE_URL = "https://wisjsfswsqtnxewhkvdl.supabase.co";
  var SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indpc2pzZnN3c3F0bnhld2hrdmRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxNzIyNjEsImV4cCI6MjA4NTc0ODI2MX0.KSaCO0SpsmEW1wWvXKFL0ApxNjinDT_rbJdWs8dFk9c";

  var sessionId = (function () {
    try {
      var stored = sessionStorage.getItem("hari_session_id");
      if (stored) return stored;
      var id = crypto.randomUUID();
      sessionStorage.setItem("hari_session_id", id);
      return id;
    } catch (e) {
      return "unknown";
    }
  })();

  function sendEvent(payload) {
    try {
      fetch(SUPABASE_URL + "/rest/v1/analytics_events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": "Bearer " + SUPABASE_ANON_KEY,
          "Prefer": "return=minimal"
        },
        body: JSON.stringify(payload)
      }).catch(function () {});
    } catch (e) {}
  }

  function firePageVisit() {
    try {
      sendEvent({
        event_type: "page_visit",
        session_id: sessionId,
        page_url: window.location.href,
        referrer: document.referrer || null,
        viewport_width: window.innerWidth,
        viewport_height: window.innerHeight
      });
    } catch (e) {}
  }

  var CTA_TEXT_PATTERNS = ["start", "get", "download", "free", "sign up", "learn more"];

  function matchesCta(el) {
    if (!el) return false;
    if (el.matches(".cta-btn, [data-track], a[href*='chrome.google.com']")) return true;
    if (el.matches("button, a")) {
      var text = (el.textContent || "").trim().toLowerCase();
      for (var i = 0; i < CTA_TEXT_PATTERNS.length; i++) {
        if (text.indexOf(CTA_TEXT_PATTERNS[i]) !== -1) return true;
      }
    }
    return false;
  }

  function getClickTarget(target) {
    var el = target;
    var depth = 0;
    while (el && depth < 5) {
      if (matchesCta(el)) return el;
      el = el.parentElement;
      depth++;
    }
    return null;
  }

  document.addEventListener("click", function (e) {
    try {
      var el = getClickTarget(e.target);
      if (!el) return;
      sendEvent({
        event_type: "btn_click",
        session_id: sessionId,
        button_id: el.id || el.getAttribute("data-track") || null,
        button_text: (el.textContent || "").trim().slice(0, 100) || null
      });
    } catch (e) {}
  }, true);

  function initSectionObserver() {
    try {
      var sections = document.querySelectorAll("[data-section]");
      if (!sections.length) return;

      var entryTimes = {};

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          try {
            var id = entry.target.getAttribute("data-section");
            if (entry.isIntersecting) {
              entryTimes[id] = Date.now();
            } else {
              var entered = entryTimes[id];
              if (entered) {
                var duration = Date.now() - entered;
                delete entryTimes[id];
                if (duration > 500) {
                  sendEvent({
                    event_type: "section_view",
                    session_id: sessionId,
                    section_id: id,
                    duration_ms: duration
                  });
                }
              }
            }
          } catch (e) {}
        });
      }, { threshold: 0.2 });

      sections.forEach(function (s) {
        observer.observe(s);
      });
    } catch (e) {}
  }

  function initScrollDepth() {
    try {
      var milestones = [25, 50, 75, 100];
      var fired = {};

      function onScroll() {
        try {
          var scrollTop = window.scrollY || document.documentElement.scrollTop;
          var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          if (docHeight <= 0) return;
          var pct = Math.round((scrollTop / docHeight) * 100);

          for (var i = 0; i < milestones.length; i++) {
            var m = milestones[i];
            if (pct >= m && !fired[m]) {
              fired[m] = true;
              sendEvent({
                event_type: "scroll_depth",
                session_id: sessionId,
                scroll_percentage: m
              });
            }
          }
        } catch (e) {}
      }

      var ticking = false;
      window.addEventListener("scroll", function () {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(function () {
            onScroll();
            ticking = false;
          });
        }
      }, { passive: true });
    } catch (e) {}
  }

  function init() {
    firePageVisit();
    initSectionObserver();
    initScrollDepth();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
