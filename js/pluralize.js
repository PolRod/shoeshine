const QUANT_REGEXP = /%quant%\d*/g;
const PLURALIZE_REGEXP = /\S*\$\S*/g;

function multiplyQuantity(text, quantity) {
  // Get the possible multiplier for quantity, located after the last % (eg %quant%1000)
  var multiplier = text.match(QUANT_REGEXP)[1];
  if (!multiplier) { multiplier = 1 };
  return quantity*multiplier;
}

function quantifyText(text, quantity) {
  return text.replace(QUANT_REGEXP, quantity);
}

function pluralizeWord(text, plural) {
  var modes = text.split('$');
  var singular = modes[0];
  if (modes.length == 1) { return singular }
  var plural = modes[1];
  if (plural == "") { return singular + 's' }
  return plural;
}

function pluralize(text, quantity) {
  var quantity = multiplyQuantity(text, quantity);
  var text = quantifyText(text, quantity);

  var pluralizableWords = text.match(PLURALIZE_REGEXP);

  if (pluralizableWords) {
    for (var i = 0; i < pluralizableWords.length; i++) {
      text = text.replace(pluralizableWords[i], pluralizeWord(pluralizableWords[i], quantity > 1))
    }
  }
  return text;
}
