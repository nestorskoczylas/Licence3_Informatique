ToBlackWhiteTask = function (opt_options) {
  this.threshold = opt_options.threshold;
  this.ctx = opt_options.ctx;
  this.canvas = opt_options.canvas;
};

ToBlackWhiteTask.prototype.process = function (imageData) {
  let pixels = imageData.data;

  for (let x = 0; x < imageData.width; x++)
    for (let y = 0; y < imageData.height; y++) {
      let pos = (y * imageData.width + x) << 2;

      let r = pixels[pos + 0],
        g = pixels[pos + 1],
        b = pixels[pos + 2];
        //a = pixels[pos + 3];

      let mean = (r + g + b) / 3;
      let v = 0;

      if (mean >= this.threshold) {
        v = 255;
      }
      
      pixels[pos + 0] = v;
      pixels[pos + 1] = v;
      pixels[pos + 2] = v;
    }

  this.ctx.putImageData(imageData, 0, 0);
};
