// Make some CSS adjustments that were not effective if executed
// through content_script.css.
function setShoeshineZIndex(){
  $('#shoeshine-overlay').css('z-index', 1000);
  $('#shoeshine-slideshow').css('z-index', 1001);
}

// The actual html is in a background page. Here we ask for the html to that page.
function showShoeshineAndSetTime() {
  chrome.runtime.sendMessage({html: "initial"}, function(response) {
    var html = response.html;
    $('body').prepend(html);
    $('body').addClass('shoeshine-stop');
    setShoeshineZIndex();
    mainShoeshineBehavior();
    chrome.storage.local.set({ "lastShoeshineDisplay":  Date.now()})
  });
}

// Check if last time Shoeshine was displayed was more than 12 hours ago.
// If it was, show it, otherwise, do not show it.
function checkShoeshineEligibilityAndShow() {
  chrome.storage.local.get("lastShoeshineDisplay", function(result){
    lastDisplay = result.lastShoeshineDisplay;
    if (lastDisplay) {
      twelveHoursLater = lastDisplay + 12 * 3600 * 1000;
      if (twelveHoursLater < Date.now()) {
        showShoeshineAndSetTime();
      }
    } else {
      showShoeshineAndSetTime();
    }
  });
}

//Start the whole thing
$(document).ready(function(){
  checkShoeshineEligibilityAndShow();
});
