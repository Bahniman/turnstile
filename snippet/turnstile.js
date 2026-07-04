/* Turnstile client beacon (prototype).
   One <script> tag on any page. Collects the cheap signals that separate
   hands from software and posts them to your collector. */
(function () {
  var start = Date.now();
  var mouseEvents = 0;
  document.addEventListener("mousemove", function () { mouseEvents++; }, { passive: true });

  function signals() {
    return {
      user_agent: navigator.userAgent,
      sent_beacon: true,
      webdriver: navigator.webdriver === true,
      mouse_events_3s: mouseEvents,
      plugins: (navigator.plugins || []).length,
      accept_language: navigator.language || "",
      fetched_assets: true,
      time_to_action_ms: Date.now() - start
    };
  }

  setTimeout(function () {
    try {
      navigator.sendBeacon(
        (window.TURNSTILE_COLLECT || "/turnstile/collect"),
        JSON.stringify(signals())
      );
    } catch (e) { /* never break the page */ }
  }, 3000);
})();
