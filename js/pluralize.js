function pluralize(text, quantity) {
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
