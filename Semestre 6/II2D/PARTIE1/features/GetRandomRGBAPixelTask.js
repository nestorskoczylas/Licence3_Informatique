GetRandomRGBAPixelTask = function (opt_options) {
  this.output = opt_options.output;
};

GetRandomRGBAPixelTask.prototype.process = function (imageData) {
  this.x = Math.floor(Math.random() * imageData.width);
  this.y = Math.floor(Math.random() * imageData.height);

  let pos = (this.y * imageData.width + this.x) << 2;
  let r = imageData.data[pos];
  let g = imageData.data[pos + 1];
  let b = imageData.data[pos + 2];
  let a = imageData.data[pos + 3];

  this.output.innerHTML = this.x + "x" + this.y + " : ";
  this.output.innerHTML += "<font color='red'>" + r + "</font> | ";
  this.output.innerHTML += "<font color='green'>" + g + "</font> | ";
  this.output.innerHTML += "<font color='blue'>" + b + "</font> | ";
  this.output.innerHTML += "<font color='gray'>" + a + "</font>";
};
