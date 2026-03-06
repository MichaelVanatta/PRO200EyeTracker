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