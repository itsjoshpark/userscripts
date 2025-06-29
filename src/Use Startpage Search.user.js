// ==UserScript==
// @name         Use Startpage Search
// @version      3
// @encoding     utf-8
// @description  Redirect DuckDuckGo searches to use Startpage
// @match        *://duckduckgo.com/*
// @author       itsjoshpark
// @compatible   safari
// @downloadURL  https://github.com/itsjoshpark/userscripts/raw/main/src/Use%20Startpage%20Search.user.js
// @updateURL    https://github.com/itsjoshpark/userscripts/raw/main/src/Use%20Startpage%20Search.user.js
// @run-at       document-start
// ==/UserScript==

const query = new URL(window.location).searchParams.get("q");
if (query) {
  window.location.replace(
    "https://www.startpage.com/sp/search?q=" +
      encodeURIComponent(query).replace("%20", "+")
  );
}
