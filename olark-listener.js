var port = chrome.runtime.connect({name: "knockknock"});
var messagesFromVisitorCount = 0

window.setInterval(function() {
  var length = $(".message.from-visitor").length
  if (messagesFromVisitorCount < length) {
    var latestMessage = $('.message.from-visitor').last()

    var text = latestMessage.text()
    var timestamp = latestMessage.parent('.conversation-wrapper').find('.timestamp').text()
    var fullName = latestMessage.parents('.conversation-pane').find('.header-fullname').text()
    var email = latestMessage.parents('.conversation-pane').find('.header-email').text()
    var operatorName = $('#opname').text()

    var chatMessageInfo = {
      text: text,
      timestamp: timestamp,
      fullName: fullName,
      email: email,
      operatorName: operatorName
    }

    port.postMessage(chatMessageInfo);

    console.log("text", text);
    console.log("timestamp", timestamp);
    console.log("fullName", fullName);
    console.log("email", email);
    console.log("operatorName", operatorName);
  }

  messagesFromVisitorCount = length
}, 1000)

