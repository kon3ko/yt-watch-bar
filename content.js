(function () {
    'use strict';

    const STREAMS_REGEX = /^https:\/\/www\.youtube\.com\/@[^/]+\/streams/;
    const DEFAULT_COLOR = 'linear-gradient(90deg, #00ff00 0%, #008000 100%)';
    let userColor = DEFAULT_COLOR;
    let lastUrl = location.href;

    // Load initial color from storage
    function loadSettings() {
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
            chrome.storage.sync.get({ progressBarColor: DEFAULT_COLOR }, (items) => {
                userColor = items.progressBarColor;
                applyProgressBarColor();
            });
        }
    }

    function applyProgressBarColor() {
        if (!STREAMS_REGEX.test(location.href)) {
            return;
        }

        const elements = document.querySelectorAll(
            '.ytThumbnailOverlayProgressBarHostWatchedProgressBarSegment'
        );

        elements.forEach(el => {
            el.style.background = userColor;
        });
    }

    function initObserver() {
        // Observer for DOM changes (new videos loading)
        const observer = new MutationObserver((mutations) => {
            // Check for URL change (YouTube SPA navigation)
            if (location.href !== lastUrl) {
                lastUrl = location.href;
                applyProgressBarColor();
            }

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

    // Listen for storage changes to update color in real-time
    if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.onChanged.addListener((changes, area) => {
            if (area === 'sync' && changes.progressBarColor) {
                userColor = changes.progressBarColor.newValue;
                applyProgressBarColor();
            }
        });
    }

    // Initial load
    loadSettings();
    
    // Start observing
    initObserver();

})();
