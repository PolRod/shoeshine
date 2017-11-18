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

  // When pressing enter on the price input
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
