// ==UserScript==
// @name         Redirect X
// @version      4
// @match        *://x.com
// @match        *://*.x.com/*
// @match        *://nitter.cf/*
// @author       itsjoshpark
// @downloadURL  https://github.com/itsjoshpark/userscripts/raw/main/src/Redirect%20X.user.js
// @updateURL    https://github.com/itsjoshpark/userscripts/raw/main/src/Redirect%20X.user.js
// @run-at       document-start
// ==/UserScript==

function main() {
  const domain = "nitter.cf";

  if (window.location.hostname === "x.com") {
    const pathname = window.location.pathname;
    if (pathname) {
      window.location.replace(`https://${domain}${pathname}`);
    }
    return;
  }
}

main();
