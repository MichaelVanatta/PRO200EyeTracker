console.log("It works");

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "dictationTranscript") {
    console.log("received:", msg.data);

    const active = document.activeElement;
    console.log(active);

    if ( active && (active.tagName === "TEXTAREA"||(active.tagName === "INPUT" && active.type === "text")) ) {
      const start = active.selectionStart;
      const end = active.selectionEnd;
      const value = active.value;

      active.value = value.slice(0, start) + msg.data + value.slice(end);
    }
  }
});

window.addEventListener("load", async () => {

    webgazer.params.faceMeshPath =
        chrome.runtime.getURL("webgazer/mediapipe/");

    window.locateFile = function(file) {
      return chrome.runtime.getURL("webgazer/mediapipe/") + file;
    };

    await webgazer
        .setRegression("ridge")
        .begin();

    webgazer.showPredictionPoints(true);
    webgazer.showVideoPreview(true);
    webgazer.showFaceOverlay(true);
    webgazer.showFaceFeedbackBox(true);

    webgazer.setGazeListener((data) => {
        if (!data) return;

        console.log("Gaze:", data.x, data.y);
    });
});

// (async function () {

//     if (window.webgazer) return;

//     const script = document.createElement("script");
//     script.src = chrome.runtime.getURL("webgazer/webgazer.js");
//     document.head.appendChild(script);

//     script.onload = async () => {

//         webgazer.params.faceMeshPath =
//             chrome.runtime.getURL("webgazer/mediapipe/");

//         await webgazer
//             .setRegression("ridge")
//             .begin();

//         webgazer.showPredictionPoints(true);

//         webgazer.setGazeListener((data) => {
//             if (!data) return;

//             var x = data.x;
//             var y = data.y;

//             var element = document.elementFromPoint(x,y);
//             console.log("Gaze:", element);
//         });
//     };
// })();