chrome.runtime.sendMessage({html: "initial"}, function(response) {
  console.log('message sent');
  console.log(response.html);
  var html = response.html;
  $('body').prepend(html);
  $('#shoeshine-overlay').css('z-index', 1000);
  $('#shoeshine-hello').css('z-index', 1001);
});

$(document).ready(function(){
  $('.shoeshine-active input').focus();
  $('.shoeshine-active input').keypress(function(e) {
    if (e.which == 13) {
      console.log( "Handler for .keypress() called." );
    }
  });
});
