var DEBUG = true;
var olarkChatURLtoPOST = "https://lgmetrics.herokuapp.com/olark_chat"

if (DEBUG) {
  olarkChatURLtoPOST = "http://localhost:1212/olark_chat"
}

chrome.runtime.onConnect.addListener(function(port) {
  // console.assert(port.name == "knockknock");
  port.onMessage.addListener(function(msg) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", olarkChatURLtoPOST, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        alert('data')
        port.postMessage(data);
      }
      alert(xhr.readyState)
    }
    xhr.send();
  })
});
