const phraseData = [
  { phrase: "click", boost: 5.0 },
  { phrase: "select", boost: 5.0 },
  { phrase: "type", boost: 5.0 },
  { phrase: "write", boost: 5.0 },
];

const phrases = phraseData.map(
  (p) => new webkitSpeechRecognitionPhrase(p.phrase, p.boost),
);

chrome.runtime.onMessage.addListener(async (msg) => {
  if (msg.type === "startSR") {
    const recognition = new webkitSpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.processLocally = true;
    recognition.phrases = phraseObjects;

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
