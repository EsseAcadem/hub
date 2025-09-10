const pages = [
    "https://sites.google.com/view/essentiaacademyhub",
    "https://sites.google.com/view/essentiaacademyhub/guys-home?authuser=0",
    "https://sites.google.com/view/essentiaacademyhub/rbh-home?authuser=0",
    "https://sites.google.com/view/essentiaacademyhub/harefield-home?authuser=0",
    "https://sites.google.com/view/essentiaacademyhub/gds-home?authuser=0"
];

const key = "rrCounter"; // storage key

// Get last index from localStorage, default to -1
let lastIndex = parseInt(localStorage.getItem(key) || "-1", 10);

// Calculate next index
let nextIndex = (lastIndex + 1) % pages.length;

// Save it back
localStorage.setItem(key, String(nextIndex));

// Redirect
window.location.href = pages[nextIndex];
