DetectionPlansTask = function(opt_options) {
    this.output = opt_options.output;
    this.meanPixelLast = [0, 0, 0];
    this.seuil = opt_options.seuil;
  }
  
DetectionPlansTask.prototype.process = function(imageData) {
  
  let meanR = 0;
  let meanG = 0;
  let meanB = 0;
  let meanA = 0;
  
  var pixels = imageData.data;
  for (var x = 0; x < imageData.width ; x++) {

    for (var y = 0; y < imageData.height; y++) {
      var pos = (y * imageData.width + x) << 2;
      meanR += pixels[pos + 0], meanG += pixels[pos + 1], meanB += pixels[pos + 2], meanA += pixels[pos + 3];

    }
  }

  let nbPixel = imageData.height * imageData.width; 
  meanR = Math.floor(meanR / nbPixel);
  meanG = Math.floor(meanG / nbPixel);
  meanB = Math.floor(meanB / nbPixel);

  let r0 = this.meanPixelLast[0];
  let r1 = meanR;
  let g0 = this.meanPixelLast[1];
  let g1 = meanG;
  let b0 = this.meanPixelLast[2];
  let b1 = meanB;

  let dist = Math.sqrt((r0-r1)*(r0-r1)+(b0-b1)*(b0-b1)+(g0-g1)*(g0-g1))

  if (dist > this.seuil){
    this.output.innerHTML = "changement de plan : " + Math.floor(dist) + "<br>";
    this.output.innerHTML += "<font color='red'>" + meanR + "</font> | " + "<font color='green'>" + meanG + "</font> | " + "<font color='blue'>" + meanB + "</font> | " + "<font color='gray'>" + 255 + "</font>" + "<br>" ;
  }
  this.meanPixelLast =  [meanR, meanG, meanB];

}

