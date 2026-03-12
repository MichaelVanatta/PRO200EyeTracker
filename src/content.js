if (typeof window.__contentScriptInjected === "undefined") {
window.__contentScriptInjected = true;

// src/dictationrecognizer.js
var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
var isActive = false;

function initialize() {
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.onstart = () => {
    console.log("Starting dictation...");
    isActive = true;
  };
}

function startDictationRecognizer() {
  if (!isActive) {
    initialize();
    recognition.onresult = (event) => {
      let transcript = event.results[0][0].transcript;
      isActive = false;
      recognition.stop();
      console.log(transcript);
      const input = document.activeElement;
      if (input && input.matches("input, textarea")) {
        input.value = transcript;
      }
      setTimeout(() => { enableVoice(); }, 5000);
    };
    recognition.onerror = (error) => { console.error(error.error); };
    recognition.start();
  }
}

// src/commandlistener.js
var SpeechRecognition2 = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition2 = new SpeechRecognition2();
var commands = ["type","dictate","write","right","click","clique","select","reset","restart","stop","kill","die"];

async function runCommand(command) {
  switch (command) {
    case "dictate": case "write": case "right":
      startDictationRecognizer();
      break;
    case "stop": case "kill": case "die":
      disableVoice();
      break;
    default:
      console.log("Unknown command:", command);
  }
}

function initialize2() {
  recognition2 = new SpeechRecognition2();
  recognition2.continuous = true;
  recognition2.interimResults = true;
  recognition2.maxAlternatives = 1;
  recognition2.lang = "en-US";
  recognition2.onstart = () => { console.log("Command listener started"); };
}

function startCommandListener() {
  initialize2();
  recognition2.onresult = (event) => {
    let word = event.results[event.resultIndex][0].transcript.toLowerCase().trim();
    if (commands.includes(word)) {
      recognition2.stop();
      console.log("Command:", word);
      runCommand(word);
    }
  };
  recognition2.onerror = (error) => {
    console.error(error.error);
    if (error.error === "no-speech" && voiceRunning) {
      startCommandListener();
    }
  };
  recognition2.start();
}

var voiceRunning = false;

function enableVoice() {
  if (voiceRunning) return;
  voiceRunning = true;
  startCommandListener();
}

function disableVoice() {
  voiceRunning = false;
  try { recognition2.stop(); } catch (e) {}
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "START_VOICE") {
    console.log("Voice ON");
    enableVoice();
  }
  if (msg.type === "STOP_VOICE") {
    console.log("Voice OFF");
    disableVoice();
  }
});

} // end injection guard