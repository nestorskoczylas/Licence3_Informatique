MovingCircleHChangingColor=function(output_canvas_id,opt_options) {
  this.moving_circle=new MovingCircle(output_canvas_id,opt_options);

  this.fillColor0=opt_options&&opt_options.fillColor0?opt_options.fillColor0:[255,0,0,0];
  this.fillColor1=opt_options&&opt_options.fillColor1?opt_options.fillColor1:[0,255,0,0];
  this.fillColorNbSteps=opt_options&&opt_options.fillColorNbSteps?opt_options.fillColorNbSteps:5;
  this.fillColorIncrement=[];
  for (i=0;i<4;i++) {
    this.fillColorIncrement[i]=(this.fillColor1[i]-this.fillColor0[i])/this.fillColorNbSteps;
  };
  this.moving_circle.fillColor=this.fillColor0;
  this.fillColorStepCount=0;
  this.fillColorIncrementSign=1;

}

MovingCircleHChangingColor.prototype.move=function() {


  if (this.fillColorStepCount==this.fillColorNbSteps) {
    this.fillColorIncrementSign=-this.fillColorIncrementSign;
    this.fillColorStepCount=0;
  };

  for (i=0;i<4;i++) {
    this.moving_circle.fillColor[i]+=this.fillColorIncrementSign*this.fillColorIncrement[i];
  };
  this.fillColorStepCount++;

  this.moving_circle.move();
}

MovingCircleHChangingColor.prototype.draw=function() {
  this.moving_circle.draw();
}

MovingCircleHChangingColor.prototype.clean=function() {
  this.moving_circle.clean();
}

MovingCircleHChangingColor.prototype.animate=function() {
  this.clean();
  this.move();
  this.draw();
}
