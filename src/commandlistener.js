// //This file is depricated and needs to be integrated into the background.js
// import { startDictationRecognizer } from './dictationrecognizer.js';

// // const phraseData = [
// //   { phrase: "click", boost: 5.0 },
// //   { phrase: "select", boost: 5.0 },
// //   { phrase: "type", boost: 5.0 },
// //   { phrase: "write", boost: 5.0 },
// // ];

// // const phrases = phraseData.map(
// //   (p) => new window.webkitSpeechRecognitionPhrase(p.phrase, p.boost),
// // );

// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// let recognition = new SpeechRecognition();

// let voiceEnabled = false;

// const commands = [
//   "type",
//   "dictate",
//   "write",
//   "right",
//   "click",
//   "clique",
//   "select",
//   "reset",
//   "restart",
//   "stop",
//   "kill",
// ];

// async function runCommand(command) {
//  switch(command) {
//   case "click":
//   case "clique":
//   case "select":
//     break;
//   case "dictate":
//   case "write":
//   case "right":
//   startDictationRecognizer();
//     break;
//   case "reset":
//   case "restart":
//     break;
//   case "stop":
//   case "kill":
//     recognition.stop();
//     break;
//   default:
//     console.log("False alarm");
//     break;
//  }
// }

// function initialize() { // Acts as settings for right now
//   recognition = new SpeechRecognition();

//   recognition.continuous = true;
//   recognition.interimResults = true;
//   recognition.maxAlternatives = 1;
//   recognition.processLocally = true;
//   recognition.lang = "en-US";

//   console.log(recognition);

//   recognition.onstart = () => {
//     console.log("Starting command listener");
//   };
// }

// export function startCommandListener() {
//   if (!voiceEnabled) return;

//   initialize();

// recognition.onresult = (event) => {
//   let word = event.results[event.resultIndex][0].transcript
//     .toLowerCase()
//     .trim();

//   if (commands.includes(word)) {
//     recognition.stop();
//     console.log(word, "this is a command");
//     runCommand(word);
//   } else {
//     console.log(word, "this is not a command");
//   }
// };

//   recognition.onerror = (error) => {
//     console.error(error.error);

//     if (error.error === "no-speech" && voiceEnabled) {
//       enableVoice(); // startCommandListener(); // only restart if enabled
//     }
//   };

//   recognition.start();
// }

// chrome.runtime.onMessage.addListener((msg) => {
//   if (msg.type === "dictationFinished" && voiceEnabled) {
//     setTimeout(() => {
//       enableVoice(); // startCommandListener();
//     }, 5000);
//   }
// });

// // check chrome://settings/content/microphone for the boys with the no-speech error

// navigator.mediaDevices.getUserMedia({ audio: true })
//   .then(stream => console.log("Mic working"))
//   .catch(err => console.error(err));

// export function enableVoice() {
//   if (voiceEnabled) return;

//   voiceEnabled = true;
//   startCommandListener();
// }

// export function disableVoice() {
//   voiceEnabled = false;

//   if (recognition2) {
//     recognition2.stop();
//   }
//     console.log("Voice recognition disabled");
// }

