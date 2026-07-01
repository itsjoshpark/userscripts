// ==UserScript==
// @name         Redirect Reddit
// @version      10
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
    if (document.cookie.split("; ").includes("use_hls=on")) {
      return;
    }
    document.cookie = "theme=system; path=/";
    document.cookie = "front_page=default; path=/";
    document.cookie = "layout=card; path=/";
    document.cookie = "wide=off; path=/";
    document.cookie = "post_sort=hot; path=/";
    document.cookie = "comment_sort=top; path=/";
    document.cookie = "show_nsfw=off; path=/";
    document.cookie = "use_hls=on; path=/";
    document.cookie = "hide_hls_notification=on; path=/";
    document.cookie = "fixed_navbar=off; path=/";
    window.location.reload();
  }
}

main();
