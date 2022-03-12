scripts=[
  '/animation/MovingCircle.js',
  '/animation/MovingCircleHChangingColor.js',
  '/animation/MovingCircleHChangingColorChangingBackground.js'
]

scripts.forEach(script => Tools.loadJS(script,document.head));
