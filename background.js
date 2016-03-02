var portRef;

chrome.runtime.onConnect.addListener(function(port) {
  portRef = port
  console.log('inside bg addListener')
  console.assert(port.name == "knockknock");
  port.onMessage.addListener(function(msg) {
    console.log("msg", msg);
    if (msg.messages) {
      console.log("msg.messages", msg.messages);
    }
  });
});

chrome.browserAction.onClicked.addListener(function (tab) {
  portRef.postMessage({action: "POPUP::CLICKED"})
});
