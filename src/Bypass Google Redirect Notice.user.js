// ==UserScript==
// @name         Bypass Google Redirect Notice
// @version      5
// @encoding     utf-8
// @match        *://*.google.com/url*
// @author       itsjoshpark
// @compatible   chrome
// @compatible   firefox
// @compatible   opera
// @compatible   safari
// @compatible   edge
// @downloadURL  https://github.com/itsjoshpark/userscripts/raw/main/src/Bypass%20Google%20Redirect%20Notice.user.js
// @updateURL    https://github.com/itsjoshpark/userscripts/raw/main/src/Bypass%20Google%20Redirect%20Notice.user.js
// @run-at       document-start
// ==/UserScript==

const url = new URL(window.location).searchParams.get("url");
if (url) {
  window.location.replace(decodeURIComponent(url).replace("%20", "+"));
}
