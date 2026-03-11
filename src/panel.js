document.addEventListener("DOMContentLoaded", () => {

  const mainPage = document.getElementById("mainPage");
  const eyeToggle = document.getElementById("eyeToggle");
  const voiceToggle = document.getElementById("voiceToggle");
  const eyePage = document.getElementById("eyePage");
  const voicePage = document.getElementById("voicePage");
  const installerButton = document.getElementById("installer");
  const installPage = document.getElementById("installPage");

  // const SpeechRecognition =
  //   window.SpeechRecognition || window.webkitSpeechRecognition;

  document.getElementById("eyeSetting").addEventListener("click", () => {
    mainPage.style.display = "none";
    eyePage.style.display = "block";
  });

  document.getElementById("voiceSetting").addEventListener("click", () => {
    mainPage.style.display = "none";
    voicePage.style.display = "block";
  });

  document.getElementById("installer").addEventListener("click", () => {
    // const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      // const recognition = new SpeechRecognition();
      recognition.processLocally = true;

      recognition.onerror = (event) => {
        if (event.error === "language-not-supported") {
          mainPage.style.display = "none";
          installerButton.style.display = "block";
        }
      };

      recognition.onstart = () => {
        mainPage.style.display = "block";
        installerButton.style.display = "none";
        recognition.stop();
      };

    }
  });


  eyeToggle.addEventListener("change", () => {

    if (eyeToggle.checked) {
      console.log("Eye tracking ON");
      webgazer.begin();
    } else {
      console.log("Eye tracking OFF");
      webgazer.pause();
    }

  });

  voiceToggle.addEventListener("change", () => {

  if (voiceToggle.checked) {
    chrome.runtime.sendMessage({ type: "startVoice" });
  } else {
    chrome.runtime.sendMessage({ type: "stopVoice" });
  }

});




  // If API doesn't exist, hide the installer entirely
async function checkSpeechModel() {

  if (!SpeechRecognition) {
    mainPage.style.display = "none";
    installPage.style.display = "block";
    return;
  }

  try {

    const result = await SpeechRecognition.available({
      langs: ["en-US"],
      processLocally: true
    });

    if (result === "available") {
      installPage.style.display = "none";
      mainPage.style.display = "block";
    } else {
      mainPage.style.display = "none";
      installPage.style.display = "block";
    }

  } catch (err) {
    console.error("Speech check failed:", err);
    mainPage.style.display = "none";
    installPage.style.display = "block";
  }

}

checkSpeechModel();

  document.querySelectorAll(".backBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      eyePage.style.display = "none";
      voicePage.style.display = "none";
      mainPage.style.display = "block";
    });
  });


  installerButton.addEventListener("click", async () => {

    // const SpeechRecognition =
    //   window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    try {

      await SpeechRecognition.install({
        langs: ["en-US"],
        processLocally: true
      });

      console.log("Speech model installed!");

      // Switch to main UI
      installPage.style.display = "none";
      mainPage.style.display = "block";

    } catch (err) {
      console.error("Installation failed:", err);
    }

  });

});