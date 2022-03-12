scripts=[
  '/similarity/pixels/GrayPixelsMeanSimilarityTask.js',
  '/similarity/pixels/GrayPixelsGridMeanSimilarityTask.js'
]

scripts.forEach(script => Tools.loadJS(script,document.head));
