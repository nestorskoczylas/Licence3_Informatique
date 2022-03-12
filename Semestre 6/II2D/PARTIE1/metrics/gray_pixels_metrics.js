var gray_pixels_metrics = {};


gray_pixels_metrics.edist = function (pixel_gray1, pixel_gray2) {
  return Math.abs(pixel_gray1 - pixel_gray2);
};

/*
    gray_pixels_metrics.grids_edist - computes euclidian distance between two grids
    containing in each cell an gray pixel
*/
gray_pixels_metrics.grid_edist = function (pixels_gray_grid1, pixels_gray_grid2) {
  var dist_fun = gray_pixels_metrics.edist;

  return generic_metrics.euclidian_distance_btw_feature_vectors(
    pixels_gray_grid1.cells,
    pixels_gray_grid2.cells,
    dist_fun
  );
};
