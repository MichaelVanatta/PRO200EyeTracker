console.log("BACKGROUND WORKER STARTED");

async function ensureOffscreen() {

  const contexts = await chrome.runtime.getContexts({
    contextTypes: ["OFFSCREEN_DOCUMENT"],
    documentUrls: [chrome.runtime.getURL("offscreen.html")]
  });

  if (contexts.length > 0) return;

  console.log("Creating offscreen document");

  await chrome.offscreen.createDocument({
    url: "offscreen.html",
    reasons: ["USER_MEDIA"],
    justification: "Run speech recognition"
  });

}

chrome.runtime.onMessage.addListener(async (msg) => {

  if (msg.type === "startVoice") {

    console.log("Voice start requested");

    await ensureOffscreen();

    chrome.runtime.sendMessage({
      type: "startRecognition"
    });

  }

  if (msg.type === "stopVoice") {

    console.log("Voice stop requested");

    chrome.runtime.sendMessage({
      type: "stopRecognition"
    });

  }

});