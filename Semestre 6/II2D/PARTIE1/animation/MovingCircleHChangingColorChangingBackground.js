MovingCircleHChangingColorChangingBackground=function(output_canvas_id,opt_options) {
  this.moving_circle=new MovingCircleHChangingColor(output_canvas_id,opt_options);

  this.output_cvs=document.getElementById(output_canvas_id);
  this.output_ctxt=this.output_cvs.getContext("2d");

  this.bgColor0=opt_options&&opt_options.bgColor0?opt_options.bgColor0:[255,0,0,255];
  this.bgColor1=opt_options&&opt_options.bgColor1?opt_options.bgColor1:[0,255,0,255];
  this.bgColorNbSteps=opt_options&&opt_options.bgColorNbSteps?opt_options.bgColorNbSteps:5;
  this.bgColorIncrement=[];
  for (i=0;i<4;i++) {
    this.bgColorIncrement[i]=(this.bgColor1[i]-this.bgColor0[i])/this.bgColorNbSteps;
  };
  this.bgColor=this.bgColor0;
  this.bgColorStepCount=0;
  this.bgColorIncrementSign=1;

}

MovingCircleHChangingColorChangingBackground.prototype.draw=function() {
  this.output_ctxt.fillStyle="rgba("+this.bgColor.join(",")+")";
  this.output_ctxt.beginPath();
  this.output_ctxt.fillRect(0,0,this.output_cvs.width,this.output_cvs.height);

  this.moving_circle.draw();
}

MovingCircleHChangingColorChangingBackground.prototype.move=function() {

  if (this.bgColorStepCount==this.bgColorNbSteps) {
    this.bgColorIncrementSign=-this.bgColorIncrementSign;
    this.bgColorStepCount=0;
  };

  for (i=0;i<4;i++) {
    this.bgColor[i]+=this.bgColorIncrementSign*this.bgColorIncrement[i];
  };
  this.bgColorStepCount++;

  this.moving_circle.move();
}

MovingCircleHChangingColorChangingBackground.prototype.clean=function(){
  this.moving_circle.clean();
}

MovingCircleHChangingColorChangingBackground.prototype.animate=function(){
  this.clean();
  this.move();
  this.draw();
}
