// ==UserScript==
// @name         Redirect Reddit
// @version      11
// @match        *://*.reddit.com/*
// @match        *://redlib.catsarch.com/*
// @author       itsjoshpark
// @downloadURL  https://github.com/itsjoshpark/userscripts/raw/main/src/Redirect%20Reddit.user.js
// @updateURL    https://github.com/itsjoshpark/userscripts/raw/main/src/Redirect%20Reddit.user.js
// @run-at       document-start
// ==/UserScript==

function main() {
  const domain = "redlib.catsarch.com";

  if (window.location.hostname === "www.reddit.com") {
    const pathname = window.location.pathname;
    if (pathname) {
      window.location.replace(`https://${domain}${pathname}`);
    }
    return;
  }

  if (window.location.hostname === domain) {
    // Redlib writes its preference cookies as HttpOnly, so they are invisible
    // and unwritable from JS. Track application with our own session cookie
    // instead, using a name Redlib's PREFS list does not contain, and let the
    // server apply the settings.
    if (document.cookie.split("; ").includes("defaults_applied=1")) {
      return;
    }
    document.cookie = "defaults_applied=1; path=/";

    fetch("/settings", {
      method: "POST",
      body: new URLSearchParams({
        theme: "system",
        front_page: "default",
        layout: "card",
        wide: "off",
        post_sort: "hot",
        comment_sort: "top",
        show_nsfw: "off",
        use_hls: "on",
        hide_hls_notification: "on",
        fixed_navbar: "off",
      }),
    }).then(() => window.location.reload());
  }
}

main();
