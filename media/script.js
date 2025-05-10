const ZOOM_LINK_KEY = 'meeting_launcher_zoom_link';
const GOOGLE_LINK_KEY = 'meeting_launcher_google_link';

const zoomPattern = /^https?:\/\/([\w-]+\.)*zoom\.(us|com)(\/[^\s]*)?$/i;
const googlePattern = /^(https?:\/\/)?([\w-]+\.)?meet\.google\.com(\/[a-zA-Z0-9\-_]+)?$/i;

// DOM elements
const zoomInput = document.getElementById('zoom-link');
const googleInput = document.getElementById('google-link');

// Load saved links from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedZoomLink = localStorage.getItem(ZOOM_LINK_KEY);
    const savedGoogleLink = localStorage.getItem(GOOGLE_LINK_KEY);

    if (savedZoomLink) {
        zoomInput.value = savedZoomLink;
    }

    if (savedGoogleLink) {
        googleInput.value = savedGoogleLink;
    }
});

zoomInput.addEventListener('blur', () => {
    const link = zoomInput.value.trim();
    console.log(link);
    if (link && !validateUrl(link, 'zoom')) {
        showToast('Invalid Zoom meeting link', 'error');
        zoomInput.classList.add('error');
    } else {
        zoomInput.classList.remove('error');
        if (link) {
            console.log("link added", link);
            localStorage.setItem(ZOOM_LINK_KEY, link);
        }
    }
});

googleInput.addEventListener('blur', () => {
    const link = googleInput.value.trim();
    if (link && !validateUrl(link, 'google')) {
        showToast('Invalid Google Meet link', 'error');
        googleInput.classList.add('error');
    } else {
        googleInput.classList.remove('error');
        if (link) {
            localStorage.setItem(GOOGLE_LINK_KEY, link);
        }
    }
});

// Validate URL based on the meeting type
function validateUrl(url, type) {
    if (!url) return true; // Empty URL is valid (will use default)

    try {
        // Check if it's a valid URL format
        new URL(url);

        // Check if it matches the expected pattern for the meeting type
        if (type === 'zoom') {
            return zoomPattern.test(url);
        } else if (type === 'google') {
            return googlePattern.test(url);
        }
        return false;
    } catch (error) {
        // Not even a valid URL format
        return false;
    }
}

// Toast notification system
function showToast(message, type = '') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast'; // Reset classes

    if (type === 'error') {
        toast.classList.add('error');
    } else if (type === 'success') {
        toast.classList.add('success');
    }

    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 3000);
}

// Copy functionality
function copyToClipboard(text, successMessage, errorMessage) {
    if (!text) {
        showToast(errorMessage || 'Please enter a meeting link first.', 'error');
        return;
    }

    navigator.clipboard.writeText(text)
        .then(() => showToast(successMessage || 'Copied to clipboard!', 'success'))
        .catch(() => showToast('Failed to copy to clipboard.', 'error'));
}

document.getElementById('copy-zoom').addEventListener('click', () => {
    const zoomLink = zoomInput.value;
    copyToClipboard(zoomLink, 'Zoom link copied to clipboard!', 'Please enter a Zoom link first.');
});

document.getElementById('copy-google').addEventListener('click', () => {
    const googleLink = googleInput.value;
    copyToClipboard(googleLink, 'Google Meet link copied to clipboard!', 'Please enter a Google Meet link first.');
});

// Launch meeting functionality
document.getElementById('launch-zoom').addEventListener('click', () => {
    const zoomLink = zoomInput.value.trim();
    const linkToOpen = zoomLink || 'https://us04web.zoom.us/start/videomeeting';

    if (zoomLink && !validateUrl(zoomLink, 'zoom')) {
        showToast('Invalid Zoom meeting link', 'error');
        zoomInput.classList.add('error');
        return;
    }

    // Save valid link to localStorage
    if (zoomLink) {
        localStorage.setItem(ZOOM_LINK_KEY, zoomLink);
    }

    const anchor = document.getElementById('zoom-anchor');
    anchor.href = linkToOpen;
    anchor.click();
});

document.getElementById('launch-google').addEventListener('click', () => {
    const googleLink = googleInput.value.trim();
    const linkToOpen = googleLink || 'https://meet.google.com/new';

    if (googleLink && !validateUrl(googleLink, 'google')) {
        showToast('Invalid Google Meet link', 'error');
        googleInput.classList.add('error');
        return;
    }

    // Save valid link to localStorage
    if (googleLink) {
        localStorage.setItem(GOOGLE_LINK_KEY, googleLink);
    }

    const anchor = document.getElementById('google-anchor');
    anchor.href = linkToOpen;
    anchor.click();
});