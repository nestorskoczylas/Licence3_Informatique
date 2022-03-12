var processing = function (elementId, task, outputCanvasId) {
  this.element = document.getElementById(elementId);
  this.width = this.element.width;
  this.height = this.element.height;

  this.imageData = {};

  this.processing_canvas = document.createElement("canvas");
  this.processing_canvas.width = this.width;
  this.processing_canvas.height = this.height;

  this.processing_context = this.processing_canvas.getContext("2d");

  this.task = task;

  if (outputCanvasId) {
    this.output_canvas = document.getElementById(outputCanvasId);
    this.output_context = this.output_canvas.getContext("2d");
  }
};

processing.prototype.acquire_data_from_img = function () {
  this.processing_context.drawImage(
    this.element,
    0,
    0,
    this.width,
    this.height
  );
  this.imageData = this.processing_context.getImageData(
    0,
    0,
    this.width,
    this.height
  );
};

processing.prototype.acquire_data_from_video = function () {
  this.processing_context.drawImage(
    this.element,
    0,
    0,
    this.width,
    this.height
  );
  this.imageData = this.processing_context.getImageData(
    0,
    0,
    this.width,
    this.height
  );
};

processing.prototype.acquire_data_from_canvas = function () {
  this.processing_context.drawImage(
    this.element,
    0,
    0,
    this.width,
    this.height
  );
  this.imageData = this.processing_context.getImageData(
    0,
    0,
    this.width,
    this.height
  );
};

processing.prototype.acquire_data = function () {
  switch (this.element.nodeName.toLowerCase()) {
    case "canvas":
      this.acquire_data_from_canvas();
      break;
    case "img":
      this.acquire_data_from_img();
      break;
    case "video":
      this.acquire_data_from_video();
      break;
    default:
      throw new Error("Element not supported!");
  }
};

processing.prototype.do_process = function () {
  this.acquire_data();
  this.task.process(this.imageData);
  if (this.output_canvas) this.update_output();
};

processing.prototype.update_output = function () {
  this.output_context.putImageData(this.imageData, 0, 0);
};
