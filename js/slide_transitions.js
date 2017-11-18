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
