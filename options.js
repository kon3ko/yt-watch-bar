const DEFAULT_COLOR = 'linear-gradient(90deg, #00ff00 0%, #008000 100%)';

// Saves options to chrome.storage
const saveOptions = () => {
    const color = document.getElementById('color').value || DEFAULT_COLOR;

    chrome.storage.sync.set(
        { progressBarColor: color },
        () => {
            // Update status to let user know options were saved.
            const status = document.getElementById('status');
            status.style.display = 'block';
            setTimeout(() => {
                status.style.display = 'none';
            }, 1500);
        }
    );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
    chrome.storage.sync.get(
        { progressBarColor: DEFAULT_COLOR },
        (items) => {
            document.getElementById('color').value = items.progressBarColor;
        }
    );
};

// Internationalization
const localizeHtmlPage = () => {
    const objects = document.querySelectorAll('[data-i18n]');
    for (let i = 0; i < objects.length; i++) {
        const obj = objects[i];
        const tag = obj.getAttribute('data-i18n');
        obj.textContent = chrome.i18n.getMessage(tag);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    restoreOptions();
    localizeHtmlPage();
});

document.getElementById('save').addEventListener('click', saveOptions);

// Add event listeners for preset buttons
document.querySelectorAll('.preset-btn').forEach(button => {
    button.addEventListener('click', () => {
        const color = button.getAttribute('data-color');
        document.getElementById('color').value = color;
    });
});
