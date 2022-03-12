/*
  Generic task that allows similarity measures between a source image and a
  collection of images contained in a Dataset object.

  The similarity is evaluated considering descriptors that are extracted with
  descriptor_func from the source imageData and all images in the dataset.

  The similarity is measured using the distance_metric_func that should be a
  dapted with regard to descriptor_func.

  == The lower the distance_metric_func the more similar the images are.
  == Indeed, the distance_metric_func computes a distance between descriptors.
  == Similar descriptors will generate small distances and, hence, small
  == distance_metric_func values.

  opt_options contains :
    * optional opt_options.desc_opt_options parameters for the descriptor_func
    * optional opt_options.distance_metric_opt_options parameters for distance_metric_func

*/
GenericSimilarityTask = function (
  dataset,
  descriptor_func,
  distance_metric_func,
  opt_options
) {
  this.dataset = dataset;

  this.descriptor_func = descriptor_func;
  this.desc_opt_options = opt_options.desc_opt_options;

  console.log(
    "constructing generic similarity task using the bellow descriptor and options (2 lines)"
  );
  console.log("descriptor function : " + descriptor_func);
  console.log("descriptor opt options : " + opt_options.desc_opt_options);

  //BLOC1
  // ajoute à l'index les données de l'imge
  this.dataset_descriptors = [];
  for (var idx in this.dataset.imageDatas) {
    this.dataset_descriptors[idx] = this.descriptor_func(
      this.dataset.imageDatas[idx],
      this.desc_opt_options
    );
    console.log(
      "descriptor for image " +
        idx +
        " in dataset : " +
        this.dataset_descriptors[idx]
    );
  }

  this.distance_metric_func = distance_metric_func;
  this.distance_metric_opt_options = opt_options.distance_metric_opt_options;
};

GenericSimilarityTask.prototype.process_descriptor = function (in_descriptor) {
  //BLOC2
  // calcule la distance metric
  var dist = [],
    order = [];
  for (var idx in this.dataset_descriptors) {
    dist[idx] = this.distance_metric_func(
      in_descriptor,
      this.dataset_descriptors[idx],
      this.metric_opt_options
    );
    order[idx] = idx;
  }

  //BLOC3
  // trie les éléments du tableau en fonction si i < j et i > j
  order.sort(function (i, j) {
    if (dist[i] < dist[j]) return -1;
    if (dist[i] > dist[j]) return 1;
    return 0;
  });

  //BLOC4
  // renvoi le tableau res
  var res = [];
  for (var idx in order) res[idx] = { idx: order[idx], dist: dist[order[idx]] };
  return res;
};

GenericSimilarityTask.prototype.process = function (in_imageData) {
  //BLOC5
  // renvoi 
  var in_descriptor = this.descriptor_func(in_imageData, this.desc_opt_options);
  return this.process_descriptor(in_descriptor);
};

GenericSimilarityTask.prototype.get_dataset_descriptor = function (idx) {
  //BLOC6
  // renvoi une donnée à l'index précisé en paramètre
  return this.dataset_descriptors[idx];
};
