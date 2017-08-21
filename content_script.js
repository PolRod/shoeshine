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

// The time it takes for the slide activation/deactivation animation to complete
var SLIDE_ANIMATION_TIME = 120;

function activateSlide(slideElement){
  $(slideElement).css('top', '100vh');
  $(slideElement).addClass('shoeshine-active');
  $(slideElement).animate({'top': '0vh'}, SLIDE_ANIMATION_TIME, function(){
    $(slideElement).find('input').focus();
  });
}

// Deactivate one slide, then activate the other
function switchActiveSlide(deActivateElement, activateElement){
  $('#shoeshine-slideshow').find('input').focus();
  $(deActivateElement).animate({'top': '-100vh'}, SLIDE_ANIMATION_TIME, function(){
    $(deActivateElement).removeClass('shoeshine-active');
    activateSlide(activateElement);
  });
}

function showInputError($input) {
  $error = $($input).next('.error')
  $error.stop().fadeIn(1);
  setTimeout(function () {
    $error.fadeOut(1800);
  }, 1000);
}

function continueButtonCopy(intendedPurchase) {
  return 'Buy' + ' ' + articleFor(intendedPurchase) + ' ' + intendedPurchase;
}

function articleFor(word) {
  return ['a', 'e', 'i', 'o', 'u'].includes(word.charAt(0)) ? 'an ' : 'a '
}

function changeContinueButtonCopy(copy) {
  $('.choice-continue .choice-button').text(continueButtonCopy(copy));
}

function pluralize(text) {
  text.split(" ").map(function(e){
    if (e.indexOf('$') > -1) {
      if (e.match(/\$/g).length == 1) {
        return e.replace("$", "s");
      } else {
        return e.split("$")[2];
      }
    } else {
      return e;
    }
  });
}

function changeDonateButtonCopy(price) {
  var charityKeys = Object.keys(costs);
  var charity = charityKeys[Math.floor(Math.random()*charityKeys.length)];
  var amountsList = Object.keys(costs[charity]["amounts"]);
  var i = amountsList.length - 1;
  while (i >= 0 && price/amountsList[i] < 1) {
    i--
  }
  if (i < 0) {
    //No items in the array matched. Ideally we would choose next charity but for
    // now let's show the generic string
    $('.choice-donate .choice-button').text(costs[charity]["no_match"]);
  } else {
    // The highest value that price can be divided by
    var amount = amountsList[i];
    // The highest amount multiplier before reaching price
    var quantity = Math.floor(price/amount);
    var text = costs[charity]["amounts"][amount].replace("%quantity%", quantity);
    pluralize(text);
    $('.choice-donate .choice-button').text(text);
  }
}

// Doing the things
$(document).ready(function(){
  var intendedPurchase = "";
  var intendedPurchasePrice = "";
  $('body').addClass('shoeshine-stop');
  $('.shoeshine-active input').focus();
  // Going from hello page to price page
  $('#shoeshine-hello input').keypress(function(e) {
    // If key pressed is enter key
    if (e.which == 13) {
      if (this.value.length > 0) {
        intendedPurchase = this.value;
        switchActiveSlide($('#shoeshine-hello'), $('#shoeshine-price'));
      } else {
          showInputError($(this));
      }
    }
  });

  $('#shoeshine-price input').keypress(function(e) {
    // Check that there are only numbers, periods and commas
    var isValid = /^[0-9,.]*$/.test(this.value)
    // If key pressed is enter key, isValid and is more than 0
    if (e.which == 13) {
      if (isValid && parseInt(this.value) > 0) {
        intendedPurchasePrice = this.value;
        changeContinueButtonCopy(intendedPurchase);
        changeDonateButtonCopy(intendedPurchasePrice);
        switchActiveSlide($('#shoeshine-price'), $('#shoeshine-choice'));
      } else {
        showInputError($(this));
      }
    }
  });

  // Remove shoeshine experience and allow scrolling if person chooses to buy
  $('.choice-continue a').click(function(){
    $('body').removeClass('shoeshine-stop');
    $('#shoeshine-main').remove();
  });
});
