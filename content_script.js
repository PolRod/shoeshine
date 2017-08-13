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

$(document).ready(function(){
  $('body').addClass('shoeshine-stop');
  $('.shoeshine-active input').focus();
  // Going from hello page to price page
  $('#shoeshine-hello input').keypress(function(e) {
    // If key pressed is enter key
    if (e.which == 13) {
      switchActiveSlide($('#shoeshine-hello'), $('#shoeshine-price'));
    }
  });

  $('#shoeshine-price input').keypress(function(e) {
    // If key pressed is enter key
    if (e.which == 13) {
      switchActiveSlide($('#shoeshine-price'), $('#shoeshine-choice'));
    }
  });

  // Remove shoeshine experience and allow scrolling if person chooses to buy
  $('.choice-continue a').click(function(){
    $('body').removeClass('shoeshine-stop');
    $('#shoeshine-main').remove();
  });
});
