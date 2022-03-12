
MovingCircle=function(output_canvas_id,opt_options) {
  this.radius=opt_options&&opt_options.radius?opt_options.radius:5;

  this.x0=opt_options&&opt_options.x0?opt_options.x0:5;
  this.y0=opt_options&&opt_options.y0?opt_options.y0:5;

  this.step_x=opt_options&&opt_options.step_x?opt_options.step_x:1;
  this.step_y=opt_options&&opt_options.step_x?opt_options.step_y:0;

  this.random=opt_options&&opt_options.random?true:false;

  this.output_cvs=document.getElementById(output_canvas_id);
  this.output_ctxt=this.output_cvs.getContext("2d");
  this.fillColor=opt_options&&opt_options.fillColor?opt_options.fillColor:[255,0,0,255];

}

MovingCircle.prototype.move=function() {
  var local_dx=Math.round(this.step_x*(!this.random?1:Math.random()));
  var local_dy=Math.round(this.step_y*(!this.random?1:Math.random()));

  this.x0+=local_dx; this.y0+=local_dy;

  if ((this.x0+this.radius)>this.output_cvs.width) {
    this.x0=this.output_cvs.width-this.radius; this.step_x=-this.step_x;
  } else if (this.x0 < this.radius ) {
      this.x0=this.radius; this.step_x=-this.step_x;
  }

  if ((this.y0+this.radius) > this.output_cvs.height) {
    this.y0=this.output_cvs.height-this.radius; this.step_y=-this.step_y;
  } else if (this.y0 < this.radius ) {
    this.y0=this.radius; this.step_y=-this.step_y;
  }
}

MovingCircle.prototype.draw=function() {
  this.output_ctxt.fillStyle="rgba("+this.fillColor.join(",")+")";
  this.output_ctxt.beginPath();
  this.output_ctxt.arc(this.x0,this.y0,this.radius,0,2*Math.PI);
  this.output_ctxt.fill();
}
MovingCircle.prototype.clean=function() {
  this.output_ctxt.beginPath();
  this.output_ctxt.clearRect(this.x0-this.radius,this.y0-this.radius,this.radius*2,this.radius*2);
}

MovingCircle.prototype.animate=function() {
  this.clean();
  this.move();
  this.draw();
}
