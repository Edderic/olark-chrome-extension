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
    console.log("text", text);
    console.log("timestamp", timestamp);
    console.log("fullName", fullName);
    console.log("email", email);
    console.log("operatorName", operatorName);
  }

  messagesFromVisitorCount = length
}, 1000)

