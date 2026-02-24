document.addEventListener("DOMContentLoaded", () => {
    const buto = document.getElementById("buto");
    buto.addEventListener("click", go);
});

let exists = undefined;

async function go() {
    if (!exists) {
      await chrome.offscreen.createDocument({
        url: chrome.runtime.getURL("offscreen.html"),
        reasons: ["USER_MEDIA"],
        justification: "Run speech recognition"
      });
    }
    exists = await chrome.runtime.getContexts({
      documentUrls: [chrome.runtime.getURL("offscreen.html")],
      contextTypes: ['OFFSCREEN_DOCUMENT']
    });
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "voskResult") {
    console.log("Speech result:", msg.text);
  }
});