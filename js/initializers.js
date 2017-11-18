//get info in costs.json
var costs = {};
var costsUrl = chrome.runtime.getURL("resources/costs.json");
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       costs = JSON.parse(xhttp.responseText);
    }
};
xhttp.open("GET", costsUrl, true);
xhttp.send();

// The actual html is in a background page. Here we ask for the html to that page.
// We also make some CSS adjustments that were not effective if executed
// through content_script.css.
chrome.runtime.sendMessage({html: "initial"}, function(response) {
  var html = response.html;
  $('body').prepend(html);
  $('#shoeshine-overlay').css('z-index', 1000);
  $('#shoeshine-slideshow').css('z-index', 1001);
});
