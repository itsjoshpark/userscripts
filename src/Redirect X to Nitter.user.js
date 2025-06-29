// ==UserScript==
// @name         Redirect X to Nitter
// @version      4
// @encoding     utf-8
// @match        *://x.com
// @match        *://*.x.com/*
// @match        *://xcancel.com/*
// @author       itsjoshpark
// @compatible   chrome
// @compatible   firefox
// @compatible   opera
// @compatible   safari
// @compatible   edge
// @downloadURL  https://github.com/itsjoshpark/userscripts/raw/main/src/Redirect%20X%20to%20Nitter.user.js
// @updateURL    https://github.com/itsjoshpark/userscripts/raw/main/src/Redirect%20X%20to%20Nitter.user.js
// @run-at       document-start
// ==/UserScript==

function main() {
  const domain = "xcancel.com";

  if (window.location.hostname === "x.com") {
    const pathname = window.location.pathname;
    if (pathname) {
      window.location.replace(`https://${domain}${pathname}`);
    }
    return;
  }

  if (window.location.hostname === domain) {
    if (
      document.cookie
        .split("; ")
        .findIndex((row) => row.startsWith("replaceReddit=")) != -1
    ) {
      return;
    }
    document.cookie = "replaceReddit=libreddit.freedit.eu; path=/; Secure";
    window.location.reload();
  }
}

main();
