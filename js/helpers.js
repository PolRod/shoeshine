Array.prototype.randomElement = function() {
  return this[Math.floor(Math.random() * this.length)];
}
