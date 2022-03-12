/*
  RGBPixelsMeanImageFeature
  - computes RGB mean of all pixels having A>0 within imageData
*/
RGBPixelsMeanImageFeature=function(imageData,opt_options) {
  return RGBPixelsMeanRegionFeature(imageData,{x0:0,y0:0,dx:imageData.width,dy:imageData.height});
}
