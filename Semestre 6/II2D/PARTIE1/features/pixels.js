GetPixelRGBATask = function (opt_options) {
  this.x = opt_options.x;
  this.y = opt_options.y;
  this.output = opt_options.output;
};

GetPixelRGBATask.prototype.process = function (imageData) {
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
};

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

GetMeanPixelTask = function (opt_options) {
  this.output = opt_options.output;
};

GetMeanPixelTask.prototype.process = function (imageData) {
  let sumR = 0;
  let sumG = 0;
  let sumB = 0;
  let sumA = 0;
  let count = 0;
  let pixels = imageData.data;

  for (let x = 0; x < imageData.width; x++)
    for (let y = 0; y < imageData.height; y++) {
      let pos = (y * imageData.width + x) << 2;

      let r = pixels[pos + 0],
        g = pixels[pos + 1],
        b = pixels[pos + 2],
        a = pixels[pos + 3];

      sumR += r;
      sumG += g;
      sumB += b;
      sumA += a;
      count++;
    }

  this.output.innerHTML = "Mean pixel :";
  this.output.innerHTML +=
    "<font color='red'>" + Math.floor(sumR / count) + "</font> | ";
  this.output.innerHTML +=
    "<font color='green'>" + Math.floor(sumG / count) + "</font> | ";
  this.output.innerHTML +=
    "<font color='blue'>" + Math.floor(sumB / count) + "</font> | ";
  this.output.innerHTML +=
    "<font color='gray'>" + Math.floor(sumA / count) + "</font>";
};
