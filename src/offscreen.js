window.addEventListener("message", async (ev) => {
    console.log("OFFSCREEN: script running!");

  if (ev.data.type === "init_vosk") {
    const wasmURL = chrome.runtime.getURL("Vosklet.wasm");
    const modelURL = chrome.runtime.getURL("model.tar.gz");

    let module = await loadVosklet({
      locateFile: () => wasmURL
    });

    let model = await module.createModel(modelURL, "English", "vosk-model-small-en-us-0.15");
    let recognizer = await module.createRecognizer(model, 16000);


    console.log("here");
    // Post results back
    recognizer.addEventListener("result", (ev) => {
      chrome.runtime.sendMessage({ type: "voskResult", text: ev.detail.text });
    });
  }
});