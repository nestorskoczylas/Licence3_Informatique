/*
  RGBPixelsGridMeanFeature
  - computes RGB mean of all pixels having A>0 in all grid cells
  - grid params are defined as opt_options.nb_lines x opt_options.nb_columns
  - returns a generic_features.grid_descriptor (grid.cells - array)
*/
RGBPixelsMeanGridFeature=function(imageData, opt_options) {

  console.log("construct grid mean rgb");
  console.log(opt_options);

  return GenericGridFeature(imageData,
    RGBPixelsMeanRegionFeature,
    opt_options);
}
