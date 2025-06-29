// ==UserScript==
// @name         Redirect Instagram Posts to Bibliogram
// @version      2
// @encoding     utf-8
// @match        *://*.instagram.com/accounts/login/?next=/p/*
// @author       itsjoshpark
// @compatible   chrome
// @compatible   firefox
// @compatible   opera
// @compatible   safari
// @compatible   edge
// @downloadURL  https://github.com/itsjoshpark/userscripts/raw/main/src/Redirect%20Instagram%20Posts%20to%20Bibliogram.user.js
// @updateURL    https://github.com/itsjoshpark/userscripts/raw/main/src/Redirect%20Instagram%20Posts%20to%20Bibliogram.user.js
// @run-at       document-start
// ==/UserScript==

const url = new URL(window.location).searchParams.get("next");
if (url) {
  window.location.replace("https://bib.actionsack.com" + url);
}
