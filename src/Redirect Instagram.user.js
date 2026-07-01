// ==UserScript==
// @name         Redirect Instagram to Picnob
// @version      1
// @match        *://*.instagram.com/*
// @match        *://www.picnob.com/*
// @author       itsjoshpark
// @downloadURL  https://github.com/itsjoshpark/userscripts/raw/main/src/Redirect%20Instagram.user.js
// @updateURL    https://github.com/itsjoshpark/userscripts/raw/main/src/Redirect%20Instagram.user.js
// @run-at       document-start
// ==/UserScript==

function main() {
  const domain = "www.picnob.com";

  if (window.location.hostname === "www.instagram.com") {
    const pathname = window.location.pathname;
    if (pathname) {
      window.location.replace(`https://${domain}/profile${pathname}`);
    }
    return;
  }
}

main();
