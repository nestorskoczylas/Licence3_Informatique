// send mouse event to an engine (passed to constructor)
// engine should have methods :
// - selectMouse(x,y) : when left mouse button is pressed
// - moveMouse(x,y)   : when the mouse is dragged (while left button pressed)
export default class InteractEngine {
  
  engine = null;        // the object that can receive the messages moveMouse, selectMouse. The object should have a context canvas.
  
  leftMousePressed = false; // true while left mouse is pressed
  rightMousePressed = false; // true while right mouse is pressed

  constructor(engine) {
    this.engine = engine;
    
    let canvas=this.engine.ctx.canvas;
    
    canvas.oncontextmenu = (e) => e.preventDefault(); // to have right mouse button interaction without the default context menu of the web navigator


    canvas.addEventListener('mousedown',this.mouseDown.bind(this));
    canvas.addEventListener('mousemove',this.mouseMove.bind(this));
    canvas.addEventListener('mouseup',this.mouseUp.bind(this));
    window.addEventListener('keydown',this.keyDown.bind(this));
    
    
  }
    
  // mouse click in the canvas
  mouseDown(event) {
    let mouseX = event.layerX-canvas.offsetLeft;
    let mouseY = (event.layerY-canvas.offsetTop)-1.0;

    switch(event.button) {
      case 0: // left button
        this.leftMousePressed = true;
        this.engine.selectMouse(mouseX,mouseY);
        break;
      case 2: // right button
        //
        this.rightMousePressed = true;
        break;
      default:break;
    }
    
  }
  
  // mouse move in the canvas (called even if a mouse button is not pressed). Engine method is called only if a mouse button is pressed.
  mouseMove(event) { 
    let mouseX = event.layerX-canvas.offsetLeft;
    let mouseY = (event.layerY-canvas.offsetTop)-1.0;
    if (this.leftMousePressed) { // the mouse is considered in motion for the engine only if the left mouse is pressed
      this.engine.moveMouse(mouseX,mouseY);
    }
    if (this.rightMousePressed) { // same for the right mouse button
      //
    }
  }
    
  // mouse button is released (mouseMove will not affect the engine if mouse button is not pressed : [Left|Right]MousePressed set to false)
  mouseUp(event) {
    switch(event.button) {
      case 0:this.leftMousePressed=false;break;
      case 2:this.rightMousePressed=false;break;
      default:break;
    }    
  }
  
  // keydown
  keyDown(event) {
    switch(event.key) {
      case 'a': case 'A': this.engine.slower();break;
      case 'z': case 'Z': this.engine.faster();break;
      default:break;
    }
  }
  
  
  
  
}
