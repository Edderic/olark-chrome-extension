function popup() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "start"}, function(response) {
      var message;

      if (response.messages) {
        message = response.messages
      } else {
        message = "Sorry, there are no messages found in the current tab."
      }

      document.getElementById('status').textContent = message
    });
   });
}

popup()

// document.addEventListener("DOMContentLoaded", function() {
  // document.getElementById("button1").addEventListener("click", popup);
// });
