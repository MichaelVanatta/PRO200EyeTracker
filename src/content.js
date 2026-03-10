// src/dictationrecognizer.js
var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
var isActive = false;
function initialize() {
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.processLocally = true;
  console.log(recognition);
  recognition.onstart = () => {
    console.log("Starting dictation...");
    isActive = true;
  };
}
function startDictationRecognizer() {
  let hasRun = false;
  if (!isActive) {
    initialize();
    recognition.onnomatch = () => {
      console.log("This sucks");
    };
    recognition.onresult = (event) => {
      let transcript = event.results[0][0].transcript;
      isActive = false;
      hasRun = true;
      recognition.stop();
      console.log(transcript);

      const input = document.activeElement;
      if (input && input.matches("input, textarea")) {
        input.value = transcript;
      }
      else if (input.shadowRoot && input.shadowRoot.matches("input, textarea")) {
        input.value = transcript;
      }

      setTimeout(() => {
        startCommandListener();
      }, 5e3);
    };
    recognition.onerror = (error) => {
      console.error(error.error);
    };
    recognition.start();
  }
}

// src/commandlistener.js
var SpeechRecognition2 = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition2 = new SpeechRecognition2();
var commands = [
  "type",
  "dictate",
  "write",
  "right",
  "click",
  "clique",
  "select",
  "reset",
  "restart",
  "stop",
  "kill",
  "die"
];
async function runCommand(command) {
  switch (command) {
    case "click":
    case "clique":
    case "select":
      break;
    case "dictate":
    case "write":
    case "right":
      startDictationRecognizer();
      break;
    case "reset":
    case "restart":
      break;
    case "stop":
    case "kill":
    case "die":
      recognition2.stop();
      break;
    default:
      console.log("False alarm");
      break;
  }
}
function initialize2() {
  recognition2 = new SpeechRecognition2();
  recognition2.continuous = true;
  recognition2.interimResults = true;
  recognition2.maxAlternatives = 1;
  recognition2.processLocally = true;
  recognition2.lang = "en-US";
  console.log(recognition2);
  recognition2.onstart = () => {
    console.log("Starting command listener");
  };
}
function startCommandListener() {
  initialize2();
  recognition2.onnomatch = () => {
    console.log("This sucks");
  };
  recognition2.onresult = (event) => {
    let word = event.results[event.resultIndex][0].transcript.toLowerCase().trim();
    if (commands.includes(word)) {
      recognition2.stop();
      console.log(word, "this is a command");
      runCommand(word);
    } else {
      console.log(word, "this is not a command");
    }
  };
  recognition2.onerror = (error) => {
    console.error(error.error);
    if (error.error === "no-speech") {
      startCommandListener();
    }
  };
  recognition2.start();
}
navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => console.log("Mic working")).catch((err) => console.error(err));

startCommandListener();