// When the content script requests it, we send everything under body in background.html.
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.html == "initial")
      var html = document.getElementsByTagName("body")[0].innerHTML
      sendResponse({html: html});
  });
