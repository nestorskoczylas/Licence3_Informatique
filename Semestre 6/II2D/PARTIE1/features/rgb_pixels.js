scripts=[
  '/features/pixels/RGBPixelsMeanRegionFeature.js',
  '/features/pixels/RGBPixelsMeanImageFeature.js',
  '/features/pixels/RGBPixelsMeanGridFeature.js',
  '/features/pixels/RGBPixelsMeanRegionFeatureAlphaFactor.js'
]

scripts.forEach(script => Tools.loadJS(script,document.head));
