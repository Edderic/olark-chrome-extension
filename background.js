var bkgr = this;

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "knockknock");
  port.onMessage.addListener(function(msg) {
    if (msg.messages) {
      doc = encodeURIComponent(msg.messages)

      bkgr.chrome.storage.sync.get('get_url', function(items) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", items.get_url + "?document=" + doc, true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            // JSON.parse does not evaluate the attacker's scripts.
            var resp = JSON.parse(xhr.responseText);
            chrome.extension.sendMessage( {'conversations': resp})
          }
        }
        xhr.send();
      });
    }
  });
});

