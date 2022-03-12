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
