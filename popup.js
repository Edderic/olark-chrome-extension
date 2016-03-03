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

function createTHEAD(thead) {
  ['Conversation','Cosine similarity', 'Link'].forEach(function(thName) {
    var th = document.createElement('th');
    th.textContent = thName;
    thead.appendChild(th);
  })
}

function createLinkTD(convo) {
  var td = document.createElement('td');
  var a =  document.createElement('a');
  a.href = convo['url'];
  a.target = '_blank';
  a.textContent = 'url';
  td.appendChild(a);

  return td;
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  var table, thead, tbody, body, gears;

  if (request.conversations) {
    table = document.createElement('table');
    thead = document.createElement('thead');
    tbody = document.createElement('tbody')
    table.appendChild(thead);
    table.appendChild(tbody);

    createTHEAD(thead)

    request.conversations.forEach(function(convo) {
      var tr = document.createElement('tr')
      var arr = ['Conversation', 'Cosine similarity']

      arr.forEach(function(attribute) {
        var td = document.createElement('td');
        td.textContent = convo[attribute];
        td.className += ' ' + attribute
        tr.appendChild(td);
      })

      tr.appendChild(createLinkTD(convo));
      tbody.appendChild(tr);
    })

    body = document.getElementsByTagName('body')[0];
    gears = document.getElementById('gears');
    body.replaceChild(table, gears);
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
