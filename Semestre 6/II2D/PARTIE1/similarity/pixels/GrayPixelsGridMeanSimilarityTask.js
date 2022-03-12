/*
GridMeanGrayPixelsSimilarityTask

Task that allows similarity measures between a source image and a collection of
images contained in a Dataset object. The similartiy is measured considering
the gray_pixels_features.grid_mean descriptor and
the  gray_pixels_metrics.grid_edist metric
in each cell of a rectangular Grid.

This task inherits from GenericSimilarityTask and, upon processing
an imgData object using GrayPixelsGridMeanSimilarityTask.prototype.process(imgData),
it provides the list of most similar images to imgData within the dataset.

Requires including the similarity/GenericSimilarityTask.js in the HTML page
*/

GrayPixelsGridMeanSimilarityTask=function(dataset,opt_options){
  this.generic_sim=new GenericSimilarityTask(
      dataset,
      GrayPixelsMeanGridFeature,
      gray_pixels_metrics.grid_edist,
      opt_options
    );
  this.dataset=dataset;
}

GrayPixelsGridMeanSimilarityTask.prototype.process_descriptor=
function(in_descriptor) {
  return this.generic_sim.process_descriptor(in_descriptor);
}

GrayPixelsGridMeanSimilarityTask.prototype.process=
function(in_imageData) {
  return this.generic_sim.process(in_imageData);
}
