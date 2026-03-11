console.log("OFFSCREEN PAGE LOADED");

// const SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = null;

function startRecognition() {

  if (recognition) return;

  console.log("Starting recognition");

  // recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onresult = (event) => {

    const transcript =
      event.results[event.results.length - 1][0].transcript;

    console.log("Heard:", transcript);

    chrome.runtime.sendMessage({
      type: "dictationTranscript",
      data: transcript
    });

  };

  recognition.onerror = (e) => {
    console.error("Speech error:", e.error);
  };

  recognition.onend = () => {
    console.log("Recognition stopped");
    recognition = null;
  };

  recognition.start();
}

function stopRecognition() {

  if (!recognition) return;

  console.log("Stopping recognition");

  recognition.stop();
  recognition = null;
}

chrome.runtime.onMessage.addListener((msg) => {

  if (msg.type === "startRecognition") {
    startRecognition();
  }

  if (msg.type === "stopRecognition") {
    stopRecognition();
  }

});