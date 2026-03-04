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

let recognition = new window.webkitSpeechRecognition();

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

function runCommand(command) {
 switch(command) {
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
  default:
    console.log("False alarm");
    break;
 }
}

function initialize() { // Acts as settings for right now
  recognition = new window.webkitSpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;
  recognition.processLocally = true;

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
      console.log(word, "this is a command");
      recognition.stop();
      runCommand(word);
      //startCommandListener();
    }
    else {
      console.log(word, "this is not a command");
    }
  };

  recognition.onerror = (error) => {
    console.error(error.error);
    startCommandListener();
  };

  recognition.start();
}
