/*
  rgb_pixels_features.mean_per_region
  - computes RGB mean of all pixels having A>0 within opt_options.x0 .y0 .dx .dy
  - if opt_options missing partially,
      replace partially with defaults 0, 0, imageData.width, imageData.height
  - returns undefined if none available
*/
RGBPixelsMeanCircleRegionFeatureAlphaFactor=function(imageData,opt_options) {
    x0=opt_options&&opt_options.x0?opt_options.x0:0;
    y0=opt_options&&opt_options.y0?opt_options.y0:0;
    dx=opt_options&&opt_options.dx?opt_options.dx:imageData.width;
    dy=opt_options&&opt_options.dy?opt_options.dy:imageData.height;
    
    let middleX = dx + x0 /2;
    let middleY = dy + y0 /2;
    
    // dx c'est le diametre 
    // ca peut etre aussi etre dy / 2 tant que c'est un cercle
    // 
    let rayon = dx / 2;
  
    //BLOC1
    // renvoie le tableau de la moyenne de pixels r g et b d'une zone uniquement pour les pixels avec alpha > 0
    var mean=[];
    let count;
    mean[0]=0; mean[1]=0; mean[2]=0;

    //(x - center_x)^2 + (y - center_y)^2 < radius^2 point dans cercle

    for (var y=y0;y<y0+dy;y++) 
        for (var x=x0;x<x0+dx;x++) {
            if ((x - middleX) ** 2 + (y - middleY) ** 2 < rayon ** 2 ){
                console.log("JE SUIS DANS LE CERCLE");
                pos=(y*imageData.width+x)<<2;
                for (var i=0;i<3;i++) {
                    mean[i]+=imageData.data[pos+i]*imageData.data[pos+3];
                }
        count+=3;
        }
    }
    if (count>0) {
        for (var i=0;i<3;i++) {
        mean[i]=Math.round(mean[i]/count);
        return mean;
        }
      return undefined;
    }
}
  