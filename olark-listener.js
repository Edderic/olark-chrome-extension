chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if( request.message === "start" ) {
    sendResponse({messages: postMessages()});
  }
});

function postMessages(){
  var port = chrome.runtime.connect({name: 'knockknock'})

  port.postMessage({messages: reducedMessages()});

  return reducedMessages();
}

function reducedMessages() {
  var messages = $('.conversation-view:not(".inactive") .message');
  messages.reduce = Array.prototype.reduce;

  return messages.reduce(function(prev, curr) {
    prev = prev + ' ' + $.trim($(curr).text());
    return prev
  }, "")
}

