chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "start" ) {
      start();
    }
  }
);

function start(){
  // alert("started");

  var port = chrome.runtime.connect({name: 'knockknock'})

  port.postMessage({messages: reducedMessages()});
}

function reducedMessages() {
  var messages = $('.message');
  messages.reduce = Array.prototype.reduce;

  return messages.reduce(function(prev, curr) {
    prev = prev + ' ' + $.trim($(curr).text());
    return prev
  }, "")
}

