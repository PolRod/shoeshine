chrome.runtime.sendMessage({html: "initial"}, function(response) {
  console.log('message sent');
  console.log(response.html);
  var html = response.html;
  $('body').prepend(html);
  $('#shoeshine-overlay').css('z-index', 1000);
  $('.shoeshine-slide').each(function(){
    $(this).css('z-index', 1001);
  });
});

function activateSlide(slideElement){
  $(slideElement).addClass('shoeshine-active');
  $(slideElement).css('top', '140%');
  $(slideElement).show();
  $(slideElement).animate({top: '40%'}, 100);
  $(slideElement).find('input').focus();
}

function deActivateSlide(slideElement){
  $(slideElement).removeClass('shoeshine-active');
  $(slideElement).animate({top: '-140%'}, 100);
  $(slideElement).hide();
}

$(document).ready(function(){
  $('.shoeshine-active input').focus();
  // Going from hello page to price page
  $('.shoeshine-active input').keypress(function(e) {
    //If key pressed is enter key
    if (e.which == 13) {
      deActivateSlide($('#shoeshine-hello'));
      activateSlide($('#shoeshine-price'));
    }
  });
});
