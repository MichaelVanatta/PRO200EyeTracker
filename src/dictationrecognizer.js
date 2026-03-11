// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// let recognition = new SpeechRecognition();
// let isActive = false;

// function initialize() {
//   recognition = new SpeechRecognition();

//   recognition.continuous = true;
//   recognition.interimResults = false;
//   recognition.maxAlternatives = 1;
//   recognition.processLocally = true;

// console.log(recognition);

// recognition.onstart = () => {
//     console.log("Starting dictation...");
//     isActive = true;
//   };
// }

// export function startDictationRecognizer() {
//   let hasRun = false;
//   if (!isActive) {
//     initialize();

//     recognition.onnomatch = () => {
//       console.log("This sucks");
//     };

//     recognition.onresult = (event) => {
//       let transcript = event.results[0][0].transcript;
//       isActive = false;
//       hasRun = true;
//       recognition.stop();
//       console.log(transcript);
//       chrome.runtime.sendMessage({ 
//           type: "dictationTranscript",
//           data: transcript
//       });
//       chrome.runtime.sendMessage({
//         type: "dictationFinished",
//       });
//     };

//     recognition.onerror = (error) => {
//       console.error(error.error);
//     };

//     recognition.start();
//   }
// }