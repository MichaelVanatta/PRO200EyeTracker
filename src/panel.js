document.addEventListener("DOMContentLoaded", () => {
  const buto = document.getElementById("buto");
  buto.addEventListener("click", () => {
    // chrome.runtime.sendMessage({ type: "startVR" });
    const recognition = new window.webkitSpeechRecognition();

    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log("it go");
    };

    recognition.onresult = e => {
      console.log("Transcript:", e.results[0][0].transcript);
    };

    recognition.onerror = (event) => {
      console.error(event.error);
    };

    recognition.start();

    console.log(recognition);
  });
});