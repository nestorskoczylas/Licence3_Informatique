scripts=[
  '/features/pixels/GrayPixelsMeanRegionFeature.js',
  '/features/pixels/GrayPixelsMeanImageFeature.js',
  '/features/pixels/GrayPixelsMeanGridFeature.js'
]

scripts.forEach(script => Tools.loadJS(script,document.head));
