function continueButtonCopy(intendedPurchase) {
  return 'Buy' + ' ' + articleFor(intendedPurchase) + ' ' + intendedPurchase;
}

function articleFor(word) {
  return ['a', 'e', 'i', 'o', 'u'].includes(word.charAt(0)) ? 'an ' : 'a '
}

function changeContinueButtonCopy(copy) {
  $('.choice-continue .choice-button').text(continueButtonCopy(copy));
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
    text = pluralize(text, quantity);
    $('.choice-donate .choice-button').text(text);
  }
}
