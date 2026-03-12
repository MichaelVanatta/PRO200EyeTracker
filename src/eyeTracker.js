// created entirely by ChatGPT

(async function () {
  // Wait for webgazer to load
  while (!window.webgazer) {
    await new Promise(r => requestAnimationFrame(r));
  }
  const wg = window.webgazer;

  // Show camera video so we can see what webgazer sees
  const video = document.createElement("video");
  document.body.appendChild(video);
  video.style.position = "fixed";
  video.style.bottom = "10px";
  video.style.right = "10px";
  video.style.width = "160px";
  video.style.height = "120px";
  video.style.zIndex = 99999;
  wg.showVideoPreview(true);
  wg.showPredictionPoints(true);

  // Start tracking
  await wg
    .setRegression("ridge")
    .setTracker("clmtrackr")
    .begin();

  // Calibration generator: show dots that user must click
  const calPoints = [
    [0.1, 0.1], [0.5, 0.1], [0.9, 0.1],
    [0.1, 0.5], [0.5, 0.5], [0.9, 0.5],
    [0.1, 0.9], [0.5, 0.9], [0.9, 0.9]
  ];

  for (const [px, py] of calPoints) {
    const dot = document.createElement("div");
    dot.style.position = "fixed";
    dot.style.left = `${px * 100}%`;
    dot.style.top = `${py * 100}%`;
    dot.style.width = "16px";
    dot.style.height = "16px";
    dot.style.background = "red";
    dot.style.borderRadius = "50%";
    dot.style.transform = "translate(-50%, -50%)";
    dot.style.zIndex = 99999;
    document.body.appendChild(dot);

    await new Promise(resolve => {
      dot.addEventListener("click", () => {
        wg.recordScreenPosition(px * window.innerWidth, py * window.innerHeight, "click");
        dot.remove();
        resolve();
      }, { once: true });
    });
  }

  console.log("Calibration completed");
  wg.showPredictionPoints(true);

  wg.setGazeListener((data) => {
    if (data) {
      console.log("Gaze:", data.x, data.y);
    }
  });
})();