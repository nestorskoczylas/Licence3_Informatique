
RandomPartialGrayTask=function(opt_options) {
  this.reg_x=opt_options.reg_x; this.reg_y=opt_options.reg_y;
  this.reg_w=opt_options.reg_w; this.reg_h=opt_options.reg_h;
  this.cvs_w=opt_options.cvs_w; this.cvs_h=opt_options.csv_h;
}

RandomPartialGrayTask.prototype.process=function(imageData) {
  var pixels=imageData.data;
  for (var i = this.reg_y; i < this.reg_y+this.reg_h; i++)
      for (var j = this.reg_x; j < this.reg_x+this.reg_w; j++) {
        var pos=(i*imageData.width+j)<<2;
        var mean=(pixels[pos+1]+pixels[pos+2]+pixels[pos+3])/3;
        pixels[pos]=mean; pixels[pos+1]=mean; pixels[pos+2]=mean;
      }
}

RandomPartialGrayTask.prototype.random_focus=function() {
    this.reg_y=Math.trunc(Math.random()*(this.cvs_h-this.reg_h));
    this.reg_x=Math.trunc(Math.random()*(this.cvs_w-this.reg_w));
}
