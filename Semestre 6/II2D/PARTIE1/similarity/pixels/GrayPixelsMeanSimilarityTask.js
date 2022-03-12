/*
GrayPixelsMeanSimilarityTask

Task that allows similarity measures between a source image and a collection of
images contained in a Dataset object. The similartiy is measured considering
the GrayPixelsMeanImageFeature descriptor and the pixel_metrics.gray_edist metric.

This task inherits from GenericSimilarityTask and, upon processing
an imgData object using
GrayPixelsMeanSimilarityTask.prototype.process(imgData),
it provides the list of most similar images to imgData within the dataset.

Requires including the similarity/GenericSimilarityTask.js in the HTML page
*/

GrayPixelsMeanSimilarityTask=function(dataset,opt_options) {
  this.generic_sim=new GenericSimilarityTask(
    dataset,
    GrayPixelsMeanImageFeature,
    gray_pixels_metrics.edist,
    opt_options
  );
  this.dataset=dataset;
}

GrayPixelsMeanSimilarityTask.prototype.process=function(in_imageData) {
  return this.generic_sim.process(in_imageData);
}

GrayPixelsMeanSimilarityTask.prototype.process_descriptor=function(in_descriptor) {
  return this.generic_sim.process_descriptor(in_descriptor);
}
