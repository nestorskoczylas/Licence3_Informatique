/*
  Same behaviour as processing.js, but allows to work also only on parts of an image
*/
var processing2=function(elementId,task,outputCanvasId,opt_options) {


  this.element=document.getElementById(elementId);
  this.width = this.element.width;
  this.height = this.element.height;

  this.in_imageData = {};
  this.out_imageData = {};

  if (this.element.nodeName.toLowerCase()!="canvas") {
    this.processing_canvas=document.createElement('canvas');
    this.processing_canvas.width = this.width;
    this.processing_canvas.height = this.height;
  } else {
    this.processing_canvas=this.element;
  }

  this.processing_context=this.processing_canvas.getContext("2d");
  this.task=task;

  if (opt_options && opt_options.in_region)
    this.in_region=opt_options.in_region
  else
    this.in_region={x:0,y:0,width:this.width,height:this.height}

  if (outputCanvasId) {
    this.output_canvas=document.getElementById(outputCanvasId);
    this.output_context=this.output_canvas.getContext("2d");

    if (opt_options && opt_options.out_region)
      this.out_region=opt_options.out_region
    else
      this.out_region={x:0,y:0,width:this.output_canvas.width,height:this.output_canvas.height}
  }
  this.result={}
}

processing2.prototype.acquire_data_from_img=function() {
  this.processing_context.drawImage(this.element,0,0,this.width,this.height);
  this.in_imageData = this.processing_context.getImageData(0, 0, this.width, this.height);
}

processing2.prototype.acquire_data_from_video=function() {
  this.processing_context.drawImage(this.element,0,0,this.width,this.height);
  this.in_imageData = this.processing_context.getImageData(0, 0, this.width, this.height);
}

processing2.prototype.acquire_data_from_canvas=function() {
  this.in_imageData = this.processing_context.getImageData(this.in_region.x, this.in_region.y, this.in_region.width, this.in_region.height);
}

processing2.prototype.acquire_data=function() {
  if (this.output_canvas) {
    this.out_imageData=this.output_context.getImageData(this.out_region.x,this.out_region.y,this.out_region.width,this.out_region.height);
    this.out_imageData.ctxt=this.output_context;
  }

  switch (this.element.nodeName.toLowerCase()) {
      case 'canvas':
        this.acquire_data_from_canvas(); break;
      case 'img':
        this.acquire_data_from_img(); break;
      case 'video':
        this.acquire_data_from_video(); break;
      default:
        throw new Error('Element not supported!');
    }
    this.in_imageData.ctxt = this.processing_context;
}

processing2.prototype.do_process=function() {
  this.acquire_data();
  this.result=this.task.process(this.in_imageData,this.out_imageData);
  if (this.output_canvas) this.update_output();
}

processing2.prototype.update_output=function() {
  this.output_context.putImageData(this.out_imageData,this.out_region.x,this.out_region.y);
}

processing2.prototype.get_result=function() {
  return this.result;
}

processing2.prototype.get_processing_canvas=function() {
  return this.processing_canvas;
}

processing2.prototype.get_in_imageData=function() {
  return this.in_imageData;
}
