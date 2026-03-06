webgazer.clearData();

var PointCalibrate = 0;
var CalibrationPoints = {};

console.log("Started js");
function docLoad(){
    console.log("Docload Works");
    document.querySelectorAll('.calib-dot').forEach((i) => {
        i.addEventListener('click', () => {
            console.log("Added Event Listeners: ", i);
            calPointClick(i);
        });
    });
}
// window.addEventListener('load',docLoad);

// const dots = document.querySelectorAll('.calib-dot');
// console.log(dots);
// let clickCounts = {};

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
    docLoad();
});

// dots.forEach(dot => {
//     console.log(dot);
//     clickCounts[dot.computedStyleMap.top + dot.computedStyleMap.left] = 0;

//     dot.addEventListener("click", () => {
//         const key = dot.style.top + dot.style.left;
//         clickCounts[key]++;

//         dot.style.opacity = 0.5 + (clickCounts[key] * 0.1);

//         if (clickCounts[key] >= 5) {
//             dot.style.background = "blue";
//             dot.style.pointerEvents = "none";
//         };

//         if (Object.values(clickCounts).every(count => count >= 5)) {
//             document.getElementById("calibration").style.display = "none";
//             alert("Calibration complete!");
//         };
//     });
// });

function calPointClick(node) {
    const id = node.id;

    if (!CalibrationPoints[id]){ // initialises if not done
        CalibrationPoints[id]=0;
    }
    CalibrationPoints[id]++; // increments values
    console.log("Running calPointClick")
    console.log(CalibrationPoints);
    console.log("Points Calibrated: ", PointCalibrate);

    if (CalibrationPoints[id]==5){ //only turn to yellow after 5 clicks
        node.style.setProperty('background-color', 'yellow');
        //node.setAttribute('disabled', 'disabled');
        PointCalibrate++;
    } else if (CalibrationPoints[id]<5){
        //Gradually increase the opacity of calibration points when click to give some indication to user.
        var opacity = 0.2*CalibrationPoints[id]+0.2;
        node.style.setProperty('opacity', opacity);
    }

    //Show the middle calibration point after all other points have been clicked.
    // if (PointCalibrate == 8){
    //     document.getElementById('Pt5').style.removeProperty('display');
    // }

    if (PointCalibrate >= 9){ // last point is calibrated
        // grab every element in Calibration class and hide them except the middle point.
        // document.querySelectorAll('.Calibration').forEach((i) => {
        //     i.style.setProperty('display', 'none');
        // });
        // document.getElementById('Pt5').style.removeProperty('display');

        // clears the canvas
        // var canvas = document.getElementById("plotting_canvas");
        // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

        // Calculate the accuracy
        calcAccuracy();
    }
}

function calcAccuracy() {
    // show modal
    // notification for the measurement process
    // console.log("Running calcSccuracy");
    // swal({
    //     title: "Calculating measurement",
    //     text: "Please don't move your mouse & stare at the middle dot for the next 5 seconds. This will allow us to calculate the accuracy of our predictions.",
    //     closeOnEsc: false,
    //     allowOutsideClick: false,
    //     closeModal: true
    // }).then( () => {
    //     // makes the variables true for 5 seconds & plots the points
    //     console.log("Sweet Alert Running");
        webgazer.params.storingPoints = true; // start storing the prediction points
    
        sleep(5000).then(() => {
                webgazer.params.storingPoints = false; // stop storing the prediction points
                console.log("Stopped storing points");
                // var past50 = webgazer.getStoredPoints(); // retrieve the stored points
                // var precision_measurement = calculatePrecision(past50);
                // var accuracyLabel = "<a>Accuracy | "+precision_measurement+"%</a>";
                // document.getElementById("Accuracy").innerHTML = accuracyLabel; // Show the accuracy in the nav bar.
                // swal({
                //     title: "Your accuracy measure is " + precision_measurement + "%",
                //     allowOutsideClick: false,
                //     buttons: {
                //         cancel: "Recalibrate",
                //         confirm: true,
                //     }
                // }).then(isConfirm => {
                //         if (isConfirm){
                //             //clear the calibration & hide the last middle button
                //             ClearCanvas();
                //         } else {
                //             //use restart function to restart the calibration
                //             document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
                //             webgazer.clearData();
                //             ClearCalibration();
                //             ClearCanvas();
                //             ShowCalibrationPoint();
                //         }
                // });
        });
    //});
}