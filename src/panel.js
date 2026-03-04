import { startCommandListener } from "./commandlistener.js";

// document.addEventListener("DOMContentLoaded", () => {
//   const buto = document.getElementById("buto");
//   buto.addEventListener("click", () => {});
// });

function startSpeechRecognition() {
  startCommandListener();
}

// chrome.runtime.sendMessage({ type: "startSR" });
startSpeechRecognition();
