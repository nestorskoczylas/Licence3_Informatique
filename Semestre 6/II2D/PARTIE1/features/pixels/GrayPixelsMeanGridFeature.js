/*
  GrayPixelsGridMeanFeature
  - computes Gray mean of all pixels having A>0 in all grid cells
  - grid params are defined as opt_options.nb_lines x opt_options.nb_columns
  - returns a generic_features.grid_descriptor (grid.cells - array)
*/
GrayPixelsMeanGridFeature=function(imageData, opt_options) {

  console.log("construct grid mean gray");
  console.log(opt_options);

  return GenericGridFeature(imageData,
    GrayPixelsMeanRegionFeature,
    opt_options);
}
