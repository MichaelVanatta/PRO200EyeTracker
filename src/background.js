// let exists = [];

// chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
//   if (msg.type === "startVR") {
//     exists = await chrome.runtime.getContexts({
//       documentUrls: [chrome.runtime.getURL("offscreen.html")],
//       contextTypes: ["OFFSCREEN_DOCUMENT"]
//     });

//     if (exists.length === 0) {
//       await chrome.offscreen.createDocument({
//         url: chrome.runtime.getURL("offscreen.html"),
//         reasons: ["USER_MEDIA"],
//         justification: "Run speech recognition"
//       });
//       await new Promise(r => setTimeout(r, 10000));
//     }

//     chrome.runtime.sendMessage({ type: "startVR" });
//   }
// });