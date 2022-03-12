/*
  GenericGridFeature
  - generates grid-like features considering for each cell descriptor_func
  as a descriptor extractor
  - it requires opt_options.nb_columns and opt_options.nb_lines for grid
    construction
  - opt_options may contain other options related to param extraction
  - on each subsequent cell based descriptor called, x0,y0,dx,dy opt_options
    are set
  - it returns a grid object containing grid.nb_columns x grid.nb_lines
    grid.cells array, where each grid.cells[i] corresponds to
    the i-th cell descriptor
*/
GenericGridFeature=function(imageData,descriptor_func,opt_options) {

  var grid={};
  grid.cells=[];

  grid.nb_columns=opt_options.nb_columns;
  grid.nb_lines=opt_options.nb_lines;

  cell_width=imageData.width/grid.nb_columns;

  cell_height=imageData.height/grid.nb_lines;

  console.log("construct generic grid features "+cell_width+"x"+cell_height+"px");

  for (var i=0; i<grid.nb_columns; i++)
    for (var j=0; j<grid.nb_lines; j++) {

      console.log("constructing cell "+i+"x"+j);

      opt_options.x0=i*cell_width;
      opt_options.y0=j*cell_height;
      opt_options.dx=cell_width;
      opt_options.dy=cell_height;

      var cell_desc=descriptor_func(imageData,opt_options);
      console.log(cell_desc);

      grid.cells.push(cell_desc);
    }

  return grid;
}
