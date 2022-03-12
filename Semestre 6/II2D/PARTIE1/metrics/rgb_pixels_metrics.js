var rgb_pixels_metrics = {};

/*
    rgb_pixels_metrics.edist - computes euclidian distance between two rgb pixels
*/
rgb_pixels_metrics.edist = function (pixel_rgb1, pixel_rgb2) {
  var dist_fun = function (x, y) {
    return x - y;
  };

  //BLOC1
  // Calcule la distance euclidienne entre deux pixels RVB

  return generic_metrics.euclidian_distance_btw_feature_vectors(
    pixel_rgb1,
    pixel_rgb2,
    dist_fun
  );
};

/*
    rgb_pixels_metrics.grids_edist - computes euclidian distance between two grids
    containing in each cell an rgb pixel
*/
rgb_pixels_metrics.grid_edist = function (pixels_rgb_grid1, pixels_rgb_grid2) {
  var dist_fun = rgb_pixels_metrics.edist;

  //BLOC2
  // Calcule la distance euclidienne entre deux grilles contenant dans chaque cellule un pixel RVB

  return generic_metrics.euclidian_distance_btw_feature_vectors(
    pixels_rgb_grid1.cells,
    pixels_rgb_grid2.cells,
    dist_fun
  );
};
