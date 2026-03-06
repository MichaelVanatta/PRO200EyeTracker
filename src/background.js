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