import { startDictationRecognizer } from './dictationrecognizer.js';

// const phraseData = [
//   { phrase: "click", boost: 5.0 },
//   { phrase: "select", boost: 5.0 },
//   { phrase: "type", boost: 5.0 },
//   { phrase: "write", boost: 5.0 },
// ];

// const phrases = phraseData.map(
//   (p) => new window.webkitSpeechRecognitionPhrase(p.phrase, p.boost),
// );

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

const commands = [
  "type",
  "dictate",
  "write",
  "right",
  "click",
  "clique",
  "select",
  "reset",
  "restart",
];

async function runCommand(command) {
 switch(command) {
  case "click":
  case "clique":
  case "select":
    break;
  case "dictate":
  case "write":
  case "right":
  startDictationRecognizer();
    // while(!commandHasRun) {
    //   await new Promise(r => setTimeout(r, 5000));
    //   console.log("failed", commandHasRun);
    // }
    //startCommandListener();
    break;
  case "reset":
  case "restart":
    break;
  default:
    console.log("False alarm");
    break;
 }
}

function initialize() { // Acts as settings for right now
  recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;
  recognition.processLocally = true;
  recognition.lang = "en-US";

  console.log(recognition);

  recognition.onstart = () => {
    console.log("Starting command listener");
  };
}

export function startCommandListener() {
    initialize();

    // recognition.phrases = phrases;

    recognition.onnomatch = () => {
      console.log("This sucks");
    };

    recognition.onresult = (event) => {
      let word = event.results[event.resultIndex][0].transcript.toLowerCase().trim();

      if (commands.includes(word)) {
        recognition.stop();
        console.log(word, "this is a command");
        runCommand(word);
      }
      else {
        console.log(word, "this is not a command");
      }
    };

    recognition.onerror = (error) => {
      console.error(error.error);
      if (error.error === "no-speech") {
        startCommandListener();
      }
    };

    recognition.start();
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "dictationFinished") {
    setTimeout(() => {
      startCommandListener();
    }, 5000);
  }
});

// check chrome://settings/content/microphone for the boys with the no-speech error

navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => console.log("Mic working"))
  .catch(err => console.error(err));
