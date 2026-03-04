let recognition = new window.webkitSpeechRecognition();

function initialize() {
  recognition = new window.webkitSpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.processLocally = true;

console.log(recognition);

  recognition.onstart = () => {
    console.log("Starting dictation...");
  };
}

export function startDictationRecognizer() {
  initialize();

  recognition.onnomatch = () => {
    console.log("This sucks");
  };

  recognition.onresult = (event) => {
    let transcript = event.results[0][0].transcript;
    recognition.stop();
    console.log(transcript);
    chrome.runtime.sendMessage({ 
        type: "dictationTranscript",
        data: transcript
     });
  };

  recognition.onerror = (error) => {
    console.error(error.error);
  };

  recognition.start();

  console.log(recognition);
}