// ==UserScript==
// @name         Redirect X
// @version      7
// @match        *://x.com
// @match        *://*.x.com/*
// @match        *://nitter.cf/*
// @match        *://xitter.cf/*
// @author       itsjoshpark
// @downloadURL  https://github.com/itsjoshpark/userscripts/raw/main/src/Redirect%20X.user.js
// @updateURL    https://github.com/itsjoshpark/userscripts/raw/main/src/Redirect%20X.user.js
// @run-at       document-start
// @inject-into  content
// ==/UserScript==

// Nitter serves `script-src 'self'`, which blocks page-context injection in
// Safari, so this has to run in the extension's content context instead.

function main() {
  const domain = "nitter.cf";

  if (window.location.hostname === "x.com") {
    const pathname = window.location.pathname;
    if (pathname) {
      window.location.replace(`https://${domain}${pathname}`);
    }
    return;
  }

  if (window.location.hostname === domain) {
    // Nitter writes its preference cookies as HttpOnly, so they are invisible
    // and unwritable from JS. Track application with our own cookie instead,
    // using a name Nitter's preference list does not contain, and let the
    // server apply the settings.
    if (document.cookie.split("; ").includes("defaults_applied=1")) {
      return;
    }
    document.cookie = "defaults_applied=1; path=/";

    fetch("/saveprefs", {
      method: "POST",
      body: new URLSearchParams({
        referer: "/",
        theme: "Auto",
        hideBanner: "on",
        hidePins: "on",
        hideTweetStats: "on",
        squareAvatars: "on",
        useTwemoji: "on",
        mp4Playback: "on",
        autoplayGifs: "on",
        mediaView: "Gallery",
        gallerySize: "Large",
        replaceTwitter: "nitter.cf",
        replaceReddit: "redlib.catsarch.com",
      }),
    }).then(() => window.location.reload());
  }
}

main();
