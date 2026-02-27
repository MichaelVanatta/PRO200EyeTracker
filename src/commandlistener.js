export function startCommandListener() {
  const recognition = new window.webkitSpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    console.log("Starting voice recognition");
  };

  recognition.onnomatch = () => {
    console.log("This sucks");
  };

  recognition.onresult = (event) => {
    console.log("Transcript:", event.results[0][0].transcript);
  };

  recognition.onerror = (error) => {
    console.error(error.error);
  };

  recognition.start();

  console.log(recognition);
}
