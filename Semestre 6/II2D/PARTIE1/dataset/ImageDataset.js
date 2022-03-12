/*
  ImageDataset
  - constructs a collection of images (this.imageDatas) based on image_ids
  - ALL IMAGES SHOULD HAVE THE SAME WIDTH and HEIGHT
  - it exports this.imageDatas and this.image_ids for accessing image information
*/
ImageDataset=function(image_ids){
  this.image_ids=image_ids;
  this.imageDatas=[];
  for (var idx in this.image_ids) {
    this.imageDatas[idx]=Tools.get_imageData_from_imgEltId(this.image_ids[idx]);
  }
}
