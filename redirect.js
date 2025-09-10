(async () => {
  const STORAGE_KEY = "rrIndex";       // round-robin position (per device)
  const RESET_KEY   = "rrResetDate";   // optional daily reset
  const today = new Date().toISOString().slice(0,10); // YYYY-MM-DD

  try {
    const res = await fetch("redirect.json", { cache: "no-store" });
    const data = await res.json();

    if (!data.targets || !Array.isArray(data.targets) || data.targets.length === 0) {
      throw new Error("No targets configured");
    }

    // Optional: reset the sequence each day so day 1 always starts at link 1 on this device
    const lastReset = localStorage.getItem(RESET_KEY);
    if (lastReset !== today) {
      localStorage.setItem(STORAGE_KEY, "-1"); // so first calc goes to 0
      localStorage.setItem(RESET_KEY, today);
    }

    const n = data.targets.length;

    // Get previous index and advance
    let idx = parseInt(localStorage.getItem(STORAGE_KEY) ?? "-1", 10);
    if (Number.isNaN(idx)) idx = -1;
    idx = (idx + 1) % n;
    localStorage.setItem(STORAGE_KEY, String(idx));

    // Decode and go
    const urlB64 = data.targets[idx];
    const target = atob(urlB64);

    // Use replace() so the splash page isn't kept in browser history
    window.location.replace(target);
  } catch (err) {
    console.error("Redirect error:", err);

    // Fallback: evenly distribute using time-based hash (doesn't need storage)
    const fallbackList = [
      // add plain (non-encoded) fallbacks if you want:
      // "https://…/a", "https://…/b", "https://…/c", "https://…/d", "https://…/e"
    ];
    if (fallbackList.length > 0) {
      const i = Math.floor(Date.now() / 1000) % fallbackList.length;
      window.location.replace(fallbackList[i]);
    } else {
      alert("Configuration error: no redirect targets set.");
    }
  }
})();
