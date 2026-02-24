window.addEventListener("message", async (ev) => {
  if (ev.data?.type === "init_vosk") {
    console.log("Sandbox: Received init_vosk:", ev.data);
    const { wasmURL, modelURL } = ev.data;

    // Now you *have* valid extension URLs to load Vosklet
    let module = await loadVosklet({
      locateFile: () => wasmURL
    });

    let model = await module.createModel(modelURL, "English", "vosk-model-small-en-us-0.15");
    let recognizer = await module.createRecognizer(model, 16000);

    recognizer.addEventListener("result", (result) => {
      parent.postMessage({ type: "voskResult", text: result.detail.text }, "*");
    });

    const ctx = new AudioContext();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const source = ctx.createMediaStreamSource(stream);
    const transferer = await module.createTransferer(ctx, 128 * 150);

    transferer.port.onmessage = ev => recognizer.acceptWaveform(ev.data);

    console.log("Sandbox: Vosklet module loaded", module);
    
    source.connect(transferer);
  }
});