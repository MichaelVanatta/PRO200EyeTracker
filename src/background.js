// let exists = [];

// browser.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
//   if (msg.type === "startSR") {
//     exists = await browser.runtime.getContexts({
//       documentUrls: [browser.runtime.getURL("offscreen.html")],
//       contextTypes: ["OFFSCREEN_DOCUMENT"],
//     });

//     if (exists.length === 0) {
//       await browser.offscreen.createDocument({
//         url: browser.runtime.getURL("offscreen.html"),
//         reasons: ["USER_MEDIA"],
//         justification: "Run speech recognition",
//       });
//       await new Promise((r) => setTimeout(r, 10000));
//     }

//     browser.runtime.sendMessage({ type: "startSR" });
//   }
// });

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = null;
let recognitionEnabled = false;

function startRecognition() {

  if (recognition) return;

  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = true;

  recognition.onresult = (event) => {

    const transcript =
      event.results[event.results.length - 1][0].transcript;

    console.log("Heard:", transcript);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

      if (!tabs.length) return;

      chrome.tabs.sendMessage(tabs[0].id, {
        type: "dictationTranscript",
        data: transcript
      });

    });

  };

  recognition.start();
}

function stopRecognition() {

  if (recognition) {
    recognition.stop();
    recognition = null;
  }

}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "dictationTranscript") {
    console.log("received:", msg.data);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs.length) return;

    const tabId = tabs[0].id;

    chrome.tabs.sendMessage(tabId, {
        type: "dictationTranscript",
        data: msg.data
      },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error("Send failed:", chrome.runtime.lastError.message);
        } else {
          console.log("Message sent successfully");
        }
      });
    });
  }
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "dictationFinished") {
    chrome.runtime.sendMessage({
      type: "dictationFinished"
    });
  }
});


chrome.runtime.onMessage.addListener((msg) => {

  if (msg.type === "startVoice") {
    console.log("Voice start requested");
    startRecognition();
  }

  if (msg.type === "stopVoice") {
    console.log("Voice stop requested");
    stopRecognition();
  }

});