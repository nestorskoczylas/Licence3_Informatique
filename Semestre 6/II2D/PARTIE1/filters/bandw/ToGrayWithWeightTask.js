ToGrayWithWeightTask = function (opt_options) {
  this.ctx = opt_options.ctx;
  this.canvas = opt_options.canvas;
  this.weight = opt_options.weight;
};

ToGrayWithWeightTask.prototype.process = function (imageData) {
  let pixels = imageData.data;
  for (let x = 0; x < imageData.width; x++)
    for (let y = 0; y < imageData.height; y++) {
      let pos = (y * imageData.width + x) << 2;

      let r = pixels[pos + 0],
        g = pixels[pos + 1],
        b = pixels[pos + 2];
        //a = pixels[pos + 3];

      let mean =
        (r * this.weight.r + g * this.weight.g + b * this.weight.b) /
        (this.weight.r + this.weight.g + this.weight.b);
      pixels[pos + 0] = mean;
      pixels[pos + 1] = mean;
      pixels[pos + 2] = mean;
    }

  this.ctx.putImageData(imageData, 0, 0);
};
