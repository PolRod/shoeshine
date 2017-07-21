chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.html == "initial")
      var html = document.getElementsByTagName("body")[0].innerHTML
      sendResponse({html: html});
  });
