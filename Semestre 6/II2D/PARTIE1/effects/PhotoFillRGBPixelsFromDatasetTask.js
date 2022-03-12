
PhotoFillRGBPixelsFromDatasetTask=function(dataset,opt_options){
  this.dataset=dataset;
  this.similarity_task=new RGBPixelsMeanSimilarityTask(_dataset,{});
;
}

PhotoFillRGBPixelsFromDatasetTask.prototype.process=function(in_imageData,out_imageData) {
  var w=0;
  for (var y=0;y<in_imageData.height;y++) {
    for (var x=0;x<in_imageData.width;x++,w+=4) {
      if (in_imageData.data[w+3]==0)
        continue;

      var rgb_pixel=[in_imageData.data[w],in_imageData.data[w+1],in_imageData.data[w+2]];

      var sim_res=this.similarity_task.process_descriptor(rgb_pixel);

      var min_idx=sim_res[1].idx;

      var pixel_image=this.similarity_task.dataset.imageDatas[min_idx];
      x_dest=x*pixel_image.width;
      y_dest=y*pixel_image.height;

      Tools.copy_imageData_into_imageData(pixel_image,out_imageData,x_dest,y_dest);
    }
  }
}
