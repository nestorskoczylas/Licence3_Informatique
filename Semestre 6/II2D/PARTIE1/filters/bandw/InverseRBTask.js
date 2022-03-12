InverseRBTask = function (opt_options) {
  this.ctx = opt_options.ctx;
  this.canvas = opt_options.canvas;
  this.weight = opt_options.weight;
};

InverseRBTask.prototype.process = function (imageData) {
  var pixels = imageData.data;
  for (var x = 0; x < imageData.width; x++)
    for (var y = 0; y < imageData.height; y++) {
      var pos = (y * imageData.width + x) << 2;

      var r = pixels[pos + 0],
        //g = pixels[pos + 1],
        b = pixels[pos + 2];
        //a = pixels[pos + 3];

      pixels[pos + 0] = b;
      pixels[pos + 2] = r;
    }

  this.ctx.putImageData(imageData, 0, 0);
};
