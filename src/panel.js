import { startCommandListener } from "./commandlistener.js";

document.addEventListener("DOMContentLoaded", () => {

  const mainPage = document.getElementById("mainPage");
  const eyePage = document.getElementById("eyePage");
  const voicePage = document.getElementById("voicePage");

  document.getElementById("eyeSetting").addEventListener("click", () => {
    mainPage.style.display = "none";
    eyePage.style.display = "block";
  });

  document.getElementById("voiceSetting").addEventListener("click", () => {
    mainPage.style.display = "none";
    voicePage.style.display = "block";
  });

  document.getElementById("installer").addEventListener("click", ()=>{
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      SpeechRecognition.install({
      langs: ["en-US"],
      processLocally: true
    });
  });

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