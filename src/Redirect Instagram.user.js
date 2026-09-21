// ==UserScript==
// @name         Redirect Instagram
// @version      3
// @match        *://*.instagram.com/*
// @author       itsjoshpark
// @downloadURL  https://github.com/itsjoshpark/userscripts/raw/main/src/Redirect%20Instagram.user.js
// @updateURL    https://github.com/itsjoshpark/userscripts/raw/main/src/Redirect%20Instagram.user.js
// @run-at       document-start
// ==/UserScript==

const DOMAIN = "www.pixnoy.com";

// Instagram usernames are letters, digits, dots and underscores only.
const USER = /^[a-z0-9._]{1,30}$/i;
const CODE = /^[a-z0-9_-]+$/i;

// Story highlights have no Pixnoy equivalent, so `highlights` is never a story
// username we can follow.
const STORY_RESERVED = new Set(["highlights"]);

// First path segments that are never usernames, so `/<segment>/` must not be
// treated as a profile.
const RESERVED = new Set([
  "about",
  "accounts",
  "ajax",
  "api",
  "challenge",
  "developer",
  "direct",
  "e",
  "emails",
  "explore",
  "graphql",
  "legal",
  "oauth",
  "p",
  "privacy",
  "qr",
  "reel",
  "reels",
  "s",
  "session",
  "settings",
  "static",
  "stories",
  "terms",
  "tv",
  "web",
  "your_activity",
]);

// Maps an Instagram path to the equivalent Pixnoy one, or null when there is no
// equivalent and we should stay put.
function target(pathname) {
  const parts = pathname.split("/").filter(Boolean);
  const [first, second, third] = parts;

  if (parts.length === 0) {
    return "/";
  }

  if (parts.length === 1) {
    return USER.test(first) && !RESERVED.has(first) ? `/profile/${first}/` : null;
  }

  if (parts.length === 2) {
    // /p/<code>/, /tv/<code>/, /reel/<code>/, /reels/<code>/
    if (["p", "tv", "reel", "reels"].includes(first) && CODE.test(second)) {
      return `/post/${second}/`;
    }
    // /stories/<user>/
    if (first === "stories" && USER.test(second) && !STORY_RESERVED.has(second)) {
      return `/profile/${second}/stories/`;
    }
    if (!USER.test(first) || RESERVED.has(first)) {
      return null;
    }
    // Pixnoy files reels under igtv, and has no tagged view.
    if (second === "reels") {
      return `/profile/${first}/igtv/`;
    }
    if (second === "tagged") {
      return `/profile/${first}/`;
    }
    return null;
  }

  if (parts.length === 3) {
    // /<user>/p/<code>/, /<user>/reel/<code>/
    if (
      USER.test(first) &&
      !RESERVED.has(first) &&
      ["p", "reel"].includes(second) &&
      CODE.test(third)
    ) {
      return `/post/${third}/`;
    }
    // A single story is not supported, so show the whole stories page.
    if (
      first === "stories" &&
      USER.test(second) &&
      !STORY_RESERVED.has(second) &&
      /^\d+$/.test(third)
    ) {
      return `/profile/${second}/stories/`;
    }
    // /explore/tags/<tag>/
    if (first === "explore" && second === "tags" && CODE.test(third)) {
      return `/tag/${third}/`;
    }
    return null;
  }

  return null;
}

// Logged out, Instagram parks the real destination in `?next=`. Resolve it once.
function unwrapNext(pathname, search) {
  if (!["/accounts/login/", "/accounts/signup/"].includes(pathname)) {
    return null;
  }
  const next = new URLSearchParams(search).get("next");
  if (!next || !next.startsWith("/")) {
    return null;
  }
  const [nextPath] = next.split("?");
  return target(nextPath);
}

function main() {
  if (!/(^|\.)instagram\.com$/.test(window.location.hostname)) {
    return;
  }

  // Leave embedded posts alone so they keep working in other people's pages.
  if (window.top !== window.self) {
    return;
  }

  const pathname = window.location.pathname;
  const search = window.location.search;
  const path = target(pathname) ?? unwrapNext(pathname, search);
  if (!path) {
    return;
  }

  window.stop();
  window.location.replace(`https://${DOMAIN}${path}`);
}

main();
