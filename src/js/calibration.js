webgazer.clearData();

const container = document.querySelector("#calibration");
console.log(container);
const dots = document.querySelectorAll("div#calibration");
console.log(dots);
let clickCounts = {};

window.addEventListener("load", async function () {
    await webgazer
        .setRegression('ridge')
        .begin();

    webgazer.showVideoPreview(true);
    webgazer.showPredictionPoints(true);
    webgazer.showFaceOverlay(true);
    webgazer.showFaceFeedbackBox(true);

    webgazer.setGazeListener(function(data) {
        if (!data) return;
        console.log("GAZE:", data.x, data.y);
    });
});

dots.forEach(dot => {
    console.log(dot);
    clickCounts[dot.computedStyleMap.top + dot.computedStyleMap.left] = 0;

    dot.addEventListener("click", () => {
        const key = dot.style.top + dot.style.left;
        clickCounts[key]++;

        dot.style.opacity = 0.5 + (clickCounts[key] * 0.1);

        if (clickCounts[key] >= 5) {
            dot.style.background = "blue";
            dot.style.pointerEvents = "none";
        };

        if (Object.values(clickCounts).every(count => count >= 5)) {
            document.getElementById("calibration").style.display = "none";
            alert("Calibration complete!");
        };
    });
});