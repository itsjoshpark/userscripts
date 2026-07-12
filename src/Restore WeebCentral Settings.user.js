// ==UserScript==
// @name         Restore WeebCentral Settings
// @version      1
// @match        *://weebcentral.com/*
// @author       itsjoshpark
// @downloadURL  https://github.com/itsjoshpark/userscripts/raw/main/src/Restore%20WeebCentral%20Settings.user.js
// @updateURL    https://github.com/itsjoshpark/userscripts/raw/main/src/Restore%20WeebCentral%20Settings.user.js
// @run-at       document-start
// ==/UserScript==

function main() {
  if (localStorage.getItem("_x_reading_style") !== null) {
    return;
  }
  localStorage.setItem("_x_back_to_top", "false");
  localStorage.setItem("_x_dark_background", "false");
  localStorage.setItem("_x_gap", "true");
  localStorage.setItem("_x_image_fit", '"height"');
  localStorage.setItem("_x_reading_direction", '"left_right"');
  localStorage.setItem("_x_reading_style", '"single_page"');
  localStorage.setItem("_x_simple_top_nav", "false");
  localStorage.setItem("_x_sticky_top_nav", "false");
  window.location.reload();
}

main();
