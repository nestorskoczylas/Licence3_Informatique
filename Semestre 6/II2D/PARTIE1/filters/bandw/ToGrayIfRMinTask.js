ToGrayIfRMinTask = function (opt_options) {
  this.ctx = opt_options.ctx;
  this.canvas = opt_options.canvas;
};

ToGrayIfRMinTask.prototype.process = function (imageData) {
  let pixels = imageData.data;
  for (let x = 0; x < imageData.width; x++)
    for (let y = 0; y < imageData.height; y++) {
      let pos = (y * imageData.width + x) << 2;

      let r = pixels[pos + 0],
        g = pixels[pos + 1],
        b = pixels[pos + 2];
        //a = pixels[pos + 3];

      let mean = (r + g + b) / 3;
      let gray = r < b || r < g;
      if (gray) {
        pixels[pos + 0] = mean;
        pixels[pos + 1] = mean;
        pixels[pos + 2] = mean;
      }
    }

  this.ctx.putImageData(imageData, 0, 0);
};
