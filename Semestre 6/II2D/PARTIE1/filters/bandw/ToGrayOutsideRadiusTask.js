ToGrayOutsideRadiusTask = function (opt_options) {
  this.ctx = opt_options.ctx;
  this.canvas = opt_options.canvas;
  this.radius = opt_options.radius;
  this.pixel = opt_options.pixel;
};

ToGrayOutsideRadiusTask.prototype.process = function (imageData) {
  let pixels = imageData.data;
  for (let x = 0; x < imageData.width; x++)
    for (let y = 0; y < imageData.height; y++) {
      let pos = (y * imageData.width + x) << 2;

      let r = pixels[pos + 0],
        g = pixels[pos + 1],
        b = pixels[pos + 2];
        //a = pixels[pos + 3];

      let dist = Math.sqrt(
        Math.pow(this.pixel[0] - x, 2) + Math.pow(this.pixel[1] - y, 2)
      );
      if (dist >= this.radius) {
        let mean = (r + g + b) / 3;
        pixels[pos + 0] = mean;
        pixels[pos + 1] = mean;
        pixels[pos + 2] = mean;
      }
    }

  this.ctx.putImageData(imageData, 0, 0);
};
