/*
  GrayPixelsMeanImageFeature
  - computes Gray mean of all pixels having A>0 within imageData
*/
GrayPixelsMeanImageFeature=function(imageData,opt_options) {
  return GrayPixelsMeanRegionFeature(imageData,{x0:0,y0:0,dx:imageData.width,dy:imageData.height});
}
