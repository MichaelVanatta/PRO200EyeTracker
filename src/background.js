let exists = [];

browser.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.type === "startSR") {
    exists = await browser.runtime.getContexts({
      documentUrls: [browser.runtime.getURL("offscreen.html")],
      contextTypes: ["OFFSCREEN_DOCUMENT"],
    });

    if (exists.length === 0) {
      await browser.offscreen.createDocument({
        url: browser.runtime.getURL("offscreen.html"),
        reasons: ["USER_MEDIA"],
        justification: "Run speech recognition",
      });
      await new Promise((r) => setTimeout(r, 10000));
    }

    browser.runtime.sendMessage({ type: "startSR" });
  }
});
