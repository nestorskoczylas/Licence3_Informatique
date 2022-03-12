/*

Similar to processing.js but allows the processing of multiple images at the same time.

*/
var multi_processing=function(elementIds,task_multi,outputCanvasId) {
  this.elementIds=elementIds;
  this.element=[]; this.width=[]; this.height=[];
  this.processing_canvas=[]; this.processing_context=[];
  this.imageDatas=[];
  var lastCanvasElt={};
  for (idx in elementIds) {

    this.element[idx]=document.getElementById(elementIds[idx]);

    this.width[idx] = this.element[idx].width;
    this.height[idx] = this.element[idx].height;
    this.processing_canvas[idx]=document.createElement('canvas');
    this.processing_canvas[idx].width = this.width[idx];
    this.processing_canvas[idx].height = this.height[idx];
    this.processing_context[idx]=this.processing_canvas[idx].getContext("2d");

    this.imageDatas[idx] = {};
    lastCanvasElt = this.processing_canvas[idx];
  }
  this.task_multi=task_multi;

  if (outputCanvasId) {
    this.processing_canvas_fused=document.createElement('canvas');
    this.processing_canvas_fused.width=lastCanvasElt.width;
    this.processing_canvas_fused.height=lastCanvasElt.height;
    this.processing_context_fused=this.processing_canvas_fused.getContext("2d");

    this.imageData_fused = this.processing_context_fused.getImageData(0,0,
                                this.processing_canvas_fused.width,
                                this.processing_canvas_fused.height);

    this.output_canvas=document.getElementById(outputCanvasId);
    this.output_context=this.output_canvas.getContext("2d");
  }
}

multi_processing.prototype.acquire_data_from_img=function(id) {
  this.processing_context[id].drawImage(this.element[id],0,0,this.width[id],this.height[id]);
  this.imageDatas[id] = this.processing_context[id].getImageData(0, 0, this.width[id], this.height[id]);
}

multi_processing.prototype.acquire_data_from_video=function(id) {
  this.processing_context[id].drawImage(this.element[id],0,0,this.width[id],this.height[id]);
  this.imageDatas[id] = this.processing_context[id].getImageData(0, 0, this.width[id], this.height[id]);
}

multi_processing.prototype.acquire_data_from_canvas=function(id) {
  this.processing_context[id].drawImage(this.element[id],0,0,this.width[id],this.height[id]);
  this.imageDatas[id] = this.processing_context.getImageData(0, 0, this.width[id], this.height[id]);
}

multi_processing.prototype.acquire_data=function() {
  for (id in this.elementIds) {
    switch (this.element[id].nodeName.toLowerCase()) {
        case 'canvas':
          this.acquire_data_from_canvas(id); break;
        case 'img':
          this.acquire_data_from_img(id); break;
        case 'video':
          this.acquire_data_from_video(id); break;
        default:
          throw new Error('Element not supported!');
      }
  }
}

multi_processing.prototype.do_process=function() {
  this.acquire_data();
  this.task_multi.process_multi(this.imageDatas,this.imageData_fused);
  if (this.output_canvas) this.update_output();
}

multi_processing.prototype.update_output=function() {
  this.output_context.putImageData(this.imageData_fused,0,0);
}
