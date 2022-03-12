/*
GridMeanRGBPixelsSimilarityTask

Task that allows similarity measures between a source image and a collection of
images contained in a Dataset object. The similartiy is measured considering
the rgb_pixels_features.grid_mean descriptor and
the  rgb_pixels_metrics.grid_edist metric
in each cell of a rectangular Grid.

This task inherits from GenericSimilarityTask and, upon processing
an imgData object using RGBPixelsGridMeanSimilarityTask.prototype.process(imgData),
it provides the list of most similar images to imgData within the dataset.

Requires including the similarity/GenericSimilarityTask.js in the HTML page
*/

RGBPixelsGridMeanSimilarityTask=function(dataset,opt_options){
  this.generic_sim=new GenericSimilarityTask(
      dataset,
      RGBPixelsMeanGridFeature,
      rgb_pixels_metrics.grid_edist,
      opt_options
    );
  this.dataset=dataset;
}

RGBPixelsGridMeanSimilarityTask.prototype.process_descriptor=
function(in_descriptor) {
  return this.generic_sim.process_descriptor(in_descriptor);
}

RGBPixelsGridMeanSimilarityTask.prototype.process=
function(in_imageData) {
  return this.generic_sim.process(in_imageData);
}
