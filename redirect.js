const pages = [
    "https://sites.google.com/view/essentiaacademyhub/essentia-academy-hub?read_current=1",
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
