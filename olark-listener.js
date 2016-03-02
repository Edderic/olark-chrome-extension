var port = chrome.runtime.connect({name: 'knockknock'})
port.onMessage.addListener(function(msg) {
  if (msg.action == "POPUP::CLICKED") {
    var messages = $('.message');
    messages.reduce = Array.prototype.reduce;
    reducedMessages = messages.reduce(function(prev, curr) {
      prev = prev + ' ' + $.trim($(curr).text());
      return prev
    }, "")

    port.postMessage({messages: reducedMessages});
  }
});

