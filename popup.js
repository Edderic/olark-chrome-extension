// var port = chrome.runtime.connect({name: "knockknock"});
// port.postMessage({action: "POPUP::CLICKED"})
// chrome.tabs.query({active:true,currentWindow:true},function(tabs){
  //tabs is an array even if there is only one result
  // var message = "start";
  // chrome.tabs.sendMessage(tabs[0].id,message,function(response){
    // console.log("response", response);
    //in case you want a response
  // });
// });

function popup() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "start"});
   });
}

popup()

// document.addEventListener("DOMContentLoaded", function() {
  // document.getElementById("button1").addEventListener("click", popup);
// });
