chrome.runtime.onConnect.addListener(function(port) {
  console.log('inside bg addListener')
  console.assert(port.name == "knockknock");
  port.onMessage.addListener(function(msg) {
    console.log("msg", msg);
    if (msg.messages) {
      console.log("msg.messages", msg.messages);
      chrome.extension.sendMessage({'conversations': [
        {
          'url' : 'http://somefakeurl',
          'score': 0.00,
          'snippet': 'I would like to know what other people are doing.'
        }
      ]})
    }
  });
});

