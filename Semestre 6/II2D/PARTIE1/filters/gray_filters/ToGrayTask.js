ToGrayTask=function(opt_options) { }

ToGrayTask.prototype.process=function(imageData) {
  var pixels=imageData.data;
  var w=0;
  for (var i = 0; i < imageData.height; i++)
      for (var j = 0; j < imageData.width; j++) {
        var mean=(pixels[w+1]+pixels[w+2]+pixels[w+3])/3;
        pixels[w]=mean; pixels[w+1]=mean; pixels[w+2]=mean;
        w+=4;
      }
}
