chrome.runtime.onConnect.addListener(function(port) {
  console.log('inside bg addListener')
  console.assert(port.name == "knockknock");
  port.onMessage.addListener(function(msg) {
    console.log("msg", msg);
    if (msg.messages) {
      console.log("msg.messages", msg.messages);
      doc = encodeURIComponent(msg.messages)
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "http://localhost:9998/documents?document=" + doc, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          // JSON.parse does not evaluate the attacker's scripts.
          var resp = JSON.parse(xhr.responseText);
          chrome.extension.sendMessage( {'conversations': resp})
        }
      }
      xhr.send();
    }
  });
});

