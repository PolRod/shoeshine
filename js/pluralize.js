const QUANT_REGEXP = /%quant%\d*/;

function multiplyQuantity(text, quantity) {
  // Get the possible multiplier for quantity, located after the last % (eg %quant%1000)
  multiplier = text.match(QUANT_REGEXP)[1];
  if (!multiplier) { multiplier = 1 };
  return quantity*multiplier;
}

function quantifyText(text, quantity) {
  // Add a space at the end because the regex we are using for
  // .replace targets the trailing space as well
  return text.replace(QUANT_REGEXP, quantity);
}


function pluralize(text, quantity) {
  quantity = multiplyQuantity(text, quantity);
  text = quantifyText(text, quantity);

  return text.split(" ").map(function(e){
    pluralizerIndex = e.indexOf('$');
    if (pluralizerIndex > -1) {
      if (pluralizerIndex == e.length -1) {
        return quantity > 1 ? e.replace("$", "s") : e.slice(0, -1);
      } else {
        return quantity > 1 ? e.split("$")[1] : e.split("$")[0];
      }
    } else {
      return e;
    }
  }).join(" ");
}
