chrome.runtime.onMessage.addListener(async (msg) => {
  if (msg.type === "startSR") {
    const recognition = new webkitSpeechRecognition();

    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log("it go");
    };

    recognition.onresult = (e) => {
      console.log("Transcript:", e.results[0][0].transcript);
    };

    recognition.start();

    console.log(recognition);
  }
});
