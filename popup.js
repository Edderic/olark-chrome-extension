function handleEmptyURL(callback) {
  this.chrome.storage.sync.get('get_url', function(items) {
    console.log("items", items);
    var input = document.getElementById('get_url_input')

    if (items.get_url) {
      input.value = items.get_url
    } else {
      input.value = ''
    }

    callback();
  })

}

document.addEventListener("DOMContentLoaded", function() {
  function message(response) {
    if (response && response.messages) {
      return response.messages
    } else {
      return "Sorry, there are no messages found in the current tab."
    }
  }

  function popup() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
      var activeTab = tabs[0];
      var bkgrPage = chrome.extension.getBackgroundPage();

      function setValue() {
        chrome.tabs.sendMessage(activeTab.id, {"message": "start"}, function(response) {
          document.getElementById('status').textContent = message(response)
        });
      }

      handleEmptyURL(setValue);
    });
  }

  document.getElementById("get_url_input").addEventListener("keyup", function(e) {
    var key = e.which || e.keyCode;
    var get_url;

    var bkgrPage = chrome.extension.getBackgroundPage();
    get_url = document.getElementById('get_url_input').value
    console.log("get_url", get_url);
    bkgrPage.chrome.storage.sync.set({'get_url': get_url});
  });

  popup()
});
