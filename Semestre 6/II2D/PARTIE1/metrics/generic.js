var generic_metrics={};

/*
  generic_metrics.euclidian_distance_btw_feature_vectors
  - computes the euclidian distance between two feature vectors sharing
    a common structure
  - it requires feature_distance_func which computes the distance between
    individual components of the descriptor
  - return the euclidian distance in the R^n space,
    where n is descriptor_array_1.length
*/
generic_metrics.euclidian_distance_btw_feature_vectors=function(
  descriptor_array_1,
  descriptor_array_2,
  feature_distance_func) {

  //BLOC1
  //...  
  var sum=0, count=0;
  for (var idx in descriptor_array_1) {
    var dist=feature_distance_func(descriptor_array_1[idx],descriptor_array_2[idx]);
    sum+=dist*dist;
    count++;
  }
  if (count>0) {
    return Math.sqrt(sum);
  } else
    return undefined;
}
