// ==UserScript==
// @name         Restore WOL Settings
// @version      3
// @encoding     utf-8
// @match        *://wol.jw.org/*
// @author       itsjoshpark
// @compatible   chrome
// @compatible   firefox
// @compatible   opera
// @compatible   safari
// @compatible   edge
// @downloadURL  https://github.com/itsjoshpark/userscripts/raw/main/src/Restore%20WOL%20Settings.user.js
// @updateURL    https://github.com/itsjoshpark/userscripts/raw/main/src/Restore%20WOL%20Settings.user.js
// @run-at       document-start
// ==/UserScript==

function main() {
  if (document.cookie) {
    return;
  }
  document.cookie = "audioContinuousPlay=false; path=/";
  document.cookie = "audioPlayer=false; path=/";
  document.cookie = "cookieConsent-DIAGNOSTIC=true; path=/";
  document.cookie = "cookieConsent-FUNCTIONAL=true; path=/";
  document.cookie = "cookieConsent-STRICTLY_NECESSARY=true; path=/";
  document.cookie = "cookieConsent-USAGE=true; path=/";
  document.cookie = "fontScale=1.17; path=/";
  document.cookie = "preferredVideoResolution=720p; path=/";
  document.cookie = "rb=false; path=/";
  window.location.reload();
}

main();
