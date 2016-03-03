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
  ['Conversation','Score', 'Link'].forEach(function(thName) {
    var th = document.createElement('th');
    th.textContent = thName;
    thead.appendChild(th);
  })
}

function createLinkTD(convo) {
  var td = document.createElement('td');
  var circle = document.createElement('div');
  circle.className = 'link-circle';
  var a =  document.createElement('a');
  a.href = convo['url'];
  a.target = '_blank';
  a.textContent = 'LINK';
  circle.appendChild(a)
  td.appendChild(circle);

  return td;
}

function createScoreTD(convo) {
  var td = document.createElement('td');
  var circle = document.createElement('div');
  var percentage = parseFloat(convo['Cosine similarity']) * 100;
  var roundedPerc = percentage.toFixed(2);
  circle.className = 'score-circle'
  circle.textContent = '' + roundedPerc + '%'
  td.appendChild(circle)
  td.className += ' ' + 'score'

  return td;
}

function authors(convo) {
  return convo.Conversation.reduce(function(prev, curr) {
    var author = curr.author
    if (prev.indexOf(author) == -1) {
      prev.push(author)
    }
    return prev
  }, [])
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
      var _authors = authors(convo);
      var tr = document.createElement('tr')
      var convoTD = document.createElement('td');
      convoTD.className += ' convo-td'

      convo.Conversation.forEach(function(messageObj) {
        var messageHtml = document.createElement('div');
        messageHtml.dataset.author = messageObj.author;
        messageHtml.dataset.author_index = _authors.indexOf(messageObj.author);
        messageHtml.textContent = messageObj.message;
        convoTD.appendChild(messageHtml);
      })

      tr.appendChild(convoTD);

      tr.appendChild(createScoreTD(convo))
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
    bkgrPage.chrome.storage.sync.set({'get_url': get_url});
  });

  popup()
});
