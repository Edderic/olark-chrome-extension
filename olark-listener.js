var messagesFromVisitorCount = 0
window.setInterval(function() {
  var length = $(".message.from-visitor").length
  if (messagesFromVisitorCount < length) {
    var latestMessage = $('.message.from-visitor').last()
    var text = latestMessage.text()
    var timestamp = latestMessage.parent('.conversation-wrapper').find('.timestamp').text()
    var fullname = latestMessage.parents('.conversation-pane').find('.header-fullname').text()
    var email = latestMessage.parents('.conversation-pane').find('.header-email').text()
    console.log("text", text);
    console.log("timestamp", timestamp);
    console.log("fullname", fullname);
    console.log("email", email);
  }

  messagesFromVisitorCount = length
}, 1000)

