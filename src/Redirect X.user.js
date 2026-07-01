// ==UserScript==
// @name         Redirect X
// @version      3
// @match        *://x.com
// @match        *://*.x.com/*
// @match        *://xcancel.com/*
// @author       itsjoshpark
// @downloadURL  https://github.com/itsjoshpark/userscripts/raw/main/src/Redirect%20X.user.js
// @updateURL    https://github.com/itsjoshpark/userscripts/raw/main/src/Redirect%20X.user.js
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
}

main();