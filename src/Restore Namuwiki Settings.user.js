// ==UserScript==
// @name         Restore Namuwiki Settings
// @version      4
// @encoding     utf-8
// @match        *://namu.wiki/*
// @match        *://en.namu.wiki/*
// @author       itsjoshpark
// @compatible   chrome
// @compatible   firefox
// @compatible   opera
// @compatible   safari
// @compatible   edge
// @downloadURL  https://github.com/itsjoshpark/userscripts/raw/main/src/Restore%20Namuwiki%20Settings.user.js
// @updateURL    https://github.com/itsjoshpark/userscripts/raw/main/src/Restore%20Namuwiki%20Settings.user.js
// @run-at       document-start
// ==/UserScript==

function main() {
  // redirect to Korean site
  if (window.location.hostname !== "namu.wiki") {
    const pathname = window.location.pathname;
    if (pathname) {
      window.location.replace("https://namu.wiki/trdr?redirect=" + pathname);
    }
    return;
  }

  const settings = localStorage.getItem("theseed_settings");
  if (settings) {
    return;
  }
  localStorage.setItem(
    "theseed_settings",
    '{"wiki.footnote_type":"popover","wiki.dark_mode":true,"wiki.forced_font_size":"1.3rem","wiki.disable_image_lazy":true,"discuss.strike":"hide","discuss.bold":"hide","senkawa.hide_sidebar":true,"senkawa.left_sidebar":false,"senkawa.hide_namunews_card":true}'
  );
  window.location.reload();
}

main();
