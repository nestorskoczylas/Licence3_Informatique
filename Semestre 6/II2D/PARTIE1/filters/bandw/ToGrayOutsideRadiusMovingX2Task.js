ToGrayOutsideRadiusMovingX2Task = function (opt_options) {
  this.ctx = opt_options.ctx;
  this.canvas = opt_options.canvas;
  this.radius = opt_options.radius;
  this.pixel = opt_options.pixel;
  this.dx = opt_options.dx;
  this.dy = opt_options.dy;
};

ToGrayOutsideRadiusMovingX2Task.prototype.process = function (imageData) {
  var pixels = imageData.data;

  if (
    this.pixel[0] + this.radius > imageData.width ||
    this.pixel[0] - this.radius < 0
  ) {
    this.dx *= -1;
  }

  if (
    this.pixel[1] + this.radius > imageData.height ||
    this.pixel[1] - this.radius < 0
  ) {
    this.dy *= -1;
  }

  this.pixel[0] += this.dx;
  this.pixel[1] += this.dy;

  console.log(this.pixel[1] + ":" + imageData.height);

  for (let x = 0; x < imageData.width; x++) {
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
      else {
        pixels[pos + 0] = r;
        // pixels[pos + 1] = imageData.width * 2;
        // pixels[pos + 2] = imageData.width * 2;
      }
    }
  }
  this.ctx.putImageData(imageData, 0, 0);
};