GetPixelRGBATask = function(opt_options) {
  this.x = opt_options.x;
  this.y = opt_options.y;
  this.output = opt_options.output;
}

GetPixelRGBATask.prototype.process = function(imageData) {
  var pos = (this.y * imageData.width + this.x) << 2;
  var r = imageData.data[pos];
  var g = imageData.data[pos + 1];
  var b = imageData.data[pos + 2];
  var a = imageData.data[pos + 3];

  this.output.innerHTML = this.x + "x" + this.y + " : ";
  this.output.innerHTML += "<font color='red'>" + r + "</font> | ";
  this.output.innerHTML += "<font color='green'>" + g + "</font> | ";
  this.output.innerHTML += "<font color='blue'>" + b + "</font> | ";
  this.output.innerHTML += "<font color='gray'>" + a + "</font>";
}