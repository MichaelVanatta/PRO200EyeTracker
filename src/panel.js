import { startCommandListener } from "./commandlistener.js";

document.addEventListener("DOMContentLoaded", () => {

  const mainPage = document.getElementById("mainPage");
  const eyePage = document.getElementById("eyePage");
  const voicePage = document.getElementById("voicePage");
  const installerButton = document.getElementById("installer");
  const installPage = document.getElementById("installPage");

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  document.getElementById("eyeSetting").addEventListener("click", () => {
    mainPage.style.display = "none";
    eyePage.style.display = "block";
  });

  document.getElementById("voiceSetting").addEventListener("click", () => {
    mainPage.style.display = "none";
    voicePage.style.display = "block";
  });

  document.getElementById("installer").addEventListener("click", () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.processLocally = true;

      recognition.onerror = (event) => {
        if (event.error === "language-not-supported") {
          ui.style.display = "none";
          installerButton.style.display = "block";
        }
      };

      recognition.onstart = () => {
        ui.style.display = "block";
        installerButton.style.display = "none";
        recognition.stop();
      };

      recognition.start();
    }
  });


  // If API doesn't exist, hide the installer entirely
  if (!SpeechRecognition) {
    mainPage.style.display = "none";
    installPage.style.display = "block";
    return;
  }

  try {

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.processLocally = true;

    recognition.onstart = () => {
      // model exists
      installPage.style.display = "none";
      mainPage.style.display = "block";
      recognition.stop();
    };

    recognition.onerror = (event) => {

      if (event.error === "language-not-supported") {
        // model missing
        mainPage.style.display = "none";
        installPage.style.display = "block";
      }

    };

    recognition.start();

  } catch {
    mainPage.style.display = "none";
    installPage.style.display = "block";
  }


  document.querySelectorAll(".backBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      eyePage.style.display = "none";
      voicePage.style.display = "none";
      mainPage.style.display = "block";
    });
  });

});









function startSpeechRecognition() {
  startCommandListener();
}

// chrome.runtime.sendMessage({ type: "startSR" });
startSpeechRecognition();