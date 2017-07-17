$(document).ready(function() {
  var html = '<div id="shoeshine-hello"><p>WHAT ARE YOU BUYING TODAY?</p><input type="text"></div><div id="shoeshine-overlay"></div>';
  $('body').prepend(html);
  $('#shoeshine-overlay').css('z-index', 1000);
  $('#shoeshine-hello').css('z-index', 1001);
});
