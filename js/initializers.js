// Get info in costs.json
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
