scripts=[
  '/similarity/pixels/RGBPixelsMeanSimilarityTask.js',
  '/similarity/pixels/RGBPixelsGridMeanSimilarityTask.js'
]

scripts.forEach(script => Tools.loadJS(script,document.head));
