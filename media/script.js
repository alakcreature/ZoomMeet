const ZOOM_LINK_KEY = 'meeting_launcher_zoom_link';
const GOOGLE_LINK_KEY = 'meeting_launcher_google_link';

const zoomPattern = /^https?:\/\/([\w-]+\.)*zoom\.(us|com)(\/[^\s]*)?$/i;
const googlePattern = /^(https?:\/\/)?([\w-]+\.)?meet\.google\.com(\/[a-zA-Z0-9\-_]+)?$/i;

const zoomInput = document.getElementById('zoom-link');
const googleInput = document.getElementById('google-link');
const zoomLaunchLink = document.getElementById('launch-zoom');
const googleLaunchLink = document.getElementById('launch-google');

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
    if (link && !validateUrl(link, 'zoom')) {
        showToast('Invalid Zoom meeting link', 'error');
        zoomInput.classList.add('error');
    } else {
        zoomInput.classList.remove('error');
        if (link) {
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

function validateUrl(url, type) {
    if (!url) return true;

    try {
        new URL(url);
        if (type === 'zoom') {
            return zoomPattern.test(url);
        } else if (type === 'google') {
            return googlePattern.test(url);
        }
        return false;
    } catch (error) {
        return false;
    }
}

function showToast(message, type = '') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast';

    if (type === 'error') {
        toast.classList.add('error');
    } else if (type === 'success') {
        toast.classList.add('success');
    }

    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 3000);
}

function copyToClipboard(text, successMessage, errorMessage) {
    if (!text) {
        showToast(errorMessage || 'Please enter a meeting link first.', 'error');
        return;
    }

    navigator.clipboard.writeText(text)
        .then(() => showToast(successMessage, 'success'))
        .catch(() => showToast('Failed to copy to clipboard.', 'error'));
}

document.getElementById('copy-zoom').addEventListener('click', (e) => {
    e.preventDefault();
    const zoomLink = zoomInput.value;
    copyToClipboard(zoomLink, 'Zoom link copied to clipboard!', 'Please enter a Zoom link first.');
});

document.getElementById('copy-google').addEventListener('click', () => {
    const googleLink = googleInput.value;
    copyToClipboard(googleLink, 'Google Meet link copied to clipboard!', 'Please enter a Google Meet link first.');
});

zoomLaunchLink.addEventListener('click', (e) => {
    e.preventDefault();
    const zoomLink = zoomInput.value.trim();

    if (zoomLink && !validateUrl(zoomLink, 'zoom')) {
        showToast('Invalid Zoom meeting link', 'error');
        zoomInput.classList.add('error');
        return;
    }

    const linkToOpen = zoomLink || 'https://us04web.zoom.us/start/videomeeting';
    if (zoomLink) {
        localStorage.setItem(ZOOM_LINK_KEY, zoomLink);
    }

    const anchor = document.querySelector('.zoom-button');
    anchor.href = linkToOpen;
});

googleLaunchLink.addEventListener('click', (e) => {
    e.preventDefault();
    const googleLink = googleInput.value.trim();

    if (googleLink && !validateUrl(googleLink, 'google')) {
        showToast('Invalid Google Meet link', 'error');
        googleInput.classList.add('error');
        return;
    }

    const linkToOpen = googleLink || 'https://meet.google.com/new';
    if (googleLink) {
        localStorage.setItem(GOOGLE_LINK_KEY, googleLink);
    }

    const anchor = document.querySelector('.google-button');
    anchor.href = linkToOpen;
});