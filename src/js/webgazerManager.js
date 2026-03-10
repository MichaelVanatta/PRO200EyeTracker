// webgazer.clearData();

// console.log("Started js");

window.addEventListener("load", async function () {
    webgazer.params.faceMeshPath = chrome.runtime.getURL("./mediapipe/");

    await webgazer
        .setRegression('ridge')
        .begin();
    
    webgazer.showVideoPreview(false);
    webgazer.showPredictionPoints(true);
    webgazer.showFaceOverlay(false);
    webgazer.showFaceFeedbackBox(false);

    webgazer.setGazeListener(function(data) {
        if (!data) return;

        var x = data.x;
        var y = data.y;

        var element = document.elementFromPoint(x,y);
        console.log(element);
    });
});