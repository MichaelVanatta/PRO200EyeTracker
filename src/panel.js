document.addEventListener("DOMContentLoaded", () => {

  const mainPage = document.getElementById("mainPage");
  const eyeToggle = document.getElementById("eyeToggle");
  const voiceToggle = document.getElementById("voiceToggle");
  const eyePage = document.getElementById("eyePage");
  const voicePage = document.getElementById("voicePage");
  const installerButton = document.getElementById("installer");
  const installPage = document.getElementById("installPage");

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition) {
    //console.log(typeof(SpeechRecognition), SpeechRecognition);
    if (SpeechRecognition.available && SpeechRecognition.available({ langs: ["en-US"], processLocally: true })) {
      installerButton.style.display = "none";
      mainPage.style.display = "block";
    }
    else {
      installerButton.style.display = "block";
      mainPage.style.display = "block";
    }
  }

  document.getElementById("eyeSetting").addEventListener("click", () => {
    mainPage.style.display = "none";
    eyePage.style.display = "block";
  });

  document.getElementById("voiceSetting").addEventListener("click", () => {
    mainPage.style.display = "none";
    voicePage.style.display = "block";
  });

  eyeToggle.addEventListener("change", () => {

    if (eyeToggle.checked) {
      console.log("Eye tracking ON");
      
    } else {
      console.log("Eye tracking OFF");
      
    }

  });

  voiceToggle.addEventListener("change", () => {

    if (voiceToggle.checked) {
      console.log("Voice recognition ON");
      
    } else {
      console.log("Voice recognition OFF");
      
    }

  });


  if (voiceToggle.checked) {

  }

  document.querySelectorAll(".backBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      eyePage.style.display = "none";
      voicePage.style.display = "none";
      mainPage.style.display = "block";
    });
  });


  installerButton.addEventListener("click", async () => {

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    console.log("clicked");

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    try {

      await SpeechRecognition.install({
        langs: ["en-US"]
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