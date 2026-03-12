// Created entirely by ChatGPT
(() => {
  const wait = () => new Promise(resolve => {
    (function check() {
      if (window.FaceMesh) resolve(window.FaceMesh);
      else requestAnimationFrame(check);
    })();
  });

  wait().then(FaceMesh => {
    const base = "";

    const faceMesh = new FaceMesh({
      locateFile: file => `${base}${file}`
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    faceMesh.onResults(results => {
      console.log("FaceMesh Results:", results.multiFaceLandmarks);
    });

    const video = document.createElement("video");
    document.body.appendChild(video);

    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      video.srcObject = stream;
      video.play();

      const processFrame = async () => {
        await faceMesh.send({ image: video });
        requestAnimationFrame(processFrame);
      };

      processFrame();
    });
  });
})();