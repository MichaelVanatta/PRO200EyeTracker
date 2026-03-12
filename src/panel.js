document.addEventListener("DOMContentLoaded", () => {
  const mainPage = document.getElementById("mainPage");
  const eyeToggle = document.getElementById("eyeToggle");
  const voiceToggle = document.getElementById("voiceToggle");
  const eyePage = document.getElementById("eyePage");
  const voicePage = document.getElementById("voicePage");
  const installerButton = document.getElementById("installer");
  const installPage = document.getElementById("installPage");
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    mainPage.style.display = "none";
    installPage.style.display = "block";
    return;
  }

  installPage.style.display = "none";
  mainPage.style.display = "block";

  document.getElementById("eyeSetting").addEventListener("click", () => {
    mainPage.style.display = "none";
    eyePage.style.display = "block";
  });

  document.getElementById("voiceSetting").addEventListener("click", () => {
    mainPage.style.display = "none";
    voicePage.style.display = "block";
  });

  document.querySelectorAll(".backBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      eyePage.style.display = "none";
      voicePage.style.display = "none";
      mainPage.style.display = "block";
    });
  });

  eyeToggle.addEventListener("change", () => {
    if (eyeToggle.checked) {
      webgazer.begin();
    } else {
      webgazer.pause();
    }
  });

  voiceToggle.addEventListener("change", async (e) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab?.id || !tab.url || tab.url.startsWith("chrome://") || tab.url.startsWith("chrome-extension://") || tab.url.startsWith("about:")) {
    console.warn("Can't inject into this page:", tab?.url);
    e.target.checked = !e.target.checked;
    return;
  }

  // NO executeScript here — manifest already injects content.js

  try {
    await chrome.tabs.sendMessage(tab.id, {
      type: e.target.checked ? "START_VOICE" : "STOP_VOICE"
    });
    console.log("Voice recognition", e.target.checked ? "ON" : "OFF");
  } catch (err) {
    console.error("Message failed:", err.message);
    e.target.checked = !e.target.checked;
  }
});

  installerButton.addEventListener("click", async () => {
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    try {
      await SpeechRecognition.install({ langs: ["en-US"], processLocally: true });
      installPage.style.display = "none";
      mainPage.style.display = "block";
    } catch (err) {
      console.error("Installation failed:", err);
    }
  });
});