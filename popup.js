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

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  var tbody;

  if (request.conversations) {
    console.log("request.conversations", request.conversations);
    tbody = document.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    request.conversations.forEach(function(convo) {
      var tr = document.createElement('tr')
      var arr = ['snippet', 'score']

      arr.forEach(function(attribute) {
        var td = document.createElement('td');
        td.textContent = convo[attribute];
        td.className += ' ' + attribute
        tr.appendChild(td);
      })

      var td = document.createElement('td');
      var a =  document.createElement('a');
      a.href = convo['url'];
      a.textContent = 'url';
      td.appendChild(a);
      tr.appendChild(td);

      tbody.appendChild(tr);
    })
  }
})


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
