// ==UserScript==
// @name         YouTube Live Progress Bar Color
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Change watched progress bar color on YouTube streams page
// @author       kon3ko
// @homepageURL  https://github.com/kon3ko/yt-watch-bar
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const STREAMS_REGEX = /^https:\/\/www\.youtube\.com\/@[^/]+\/streams/;

    function applyProgressBarColor() {
        if (!STREAMS_REGEX.test(location.href)) {
            return;
        }

        const elements = document.querySelectorAll(
            '.ytThumbnailOverlayProgressBarHostWatchedProgressBarSegment'
        );

        elements.forEach(el => {
            el.style.background =
                'linear-gradient(90deg, #00ff00 0%, #008000 100%)';
        });
    }

    function initObserver() {
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.addedNodes.length > 0) {
                    applyProgressBarColor();
                    break;
                }
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // YouTube SPA navigation event
    window.addEventListener('yt-navigate-finish', () => {
        applyProgressBarColor();
    });

    // Init load
    applyProgressBarColor();

    // DOM Watcher
    initObserver();

})();
