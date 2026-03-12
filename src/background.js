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

chrome.runtime.onMessage.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ["content.js"]
  });
});