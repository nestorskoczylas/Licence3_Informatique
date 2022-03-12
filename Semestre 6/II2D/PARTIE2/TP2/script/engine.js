import ParticleManager from './particleManager.js';
import Vector from './vector.js';
import Generator from './generator.js';
import ObstacleManager from './obstacleManager.js';
import Circle from './circle.js';
import Segment from './segment.js';

export default class Engine {

    
  constructor(ctx) {
    this.ctx=ctx;          // context of the canvas
    this.deltaTime = 0.2;  // time step for simulation
    this.particleManager = new ParticleManager(1000); // contains all the particles  
    this.vector = new Vector(0,0);     
    this.obstacleManager = new ObstacleManager();
    this.selected = null;
    this.selectable = [this.obstacleManager.obstacleList, this.particleManager.generatorList];
    this.oldMouse = null;
  }

  select(m) {
    let index = null;
    let minDist = null;
    let threshold = 50;
    let l = null;

    this.selected = null;
    
    this.selectable.forEach(list => {

      for(let i = 0; i < list.length; i++){
        let dist = list[i].distance(m);
        if(minDist == null && dist < threshold){
          l = list;
          index = i;
          minDist = dist;
        }
        else if(dist < minDist && dist < threshold){
          l = list;
          minDist = dist;
          index = i;
        }
      }
      });
      if(index != null && l != null) {
        this.selected = l[index];
        this.selected.selected();
    }
  }

  deselect() {
    if (this.selected != null) {
      this.selected.deselect();
      this.selected = null;
    }
  }

  // start = initialize the engine then start the main loop
  start() {
    this.initialize();
    this.loop();
  }
  
  // all initializations to be done (generators, obstacles, ...) before the main loop. Should be called once (from start)
  initialize() {
    let gen1 = new Generator(new Vector(0,0), new Vector(50,100)); // centre, dimensions
    let gen2 = new Generator(new Vector(200,200), new Vector(20,20));

    this.particleManager.add(gen1); // ajoute au tableau generatorList (faire la méthode add)
    this.particleManager.add(gen2);

    let obs1 = new Circle(new Vector(100, 100), 50);
    let obs2 = new Segment(new Vector(100, 200), new Vector(250, 300));

    this.obstacleManager.add(obs1);
    this.obstacleManager.add(obs2);
  }
  
  // update all data at each frame (called from the main loop)
  updateData() {
    this.particleManager.update();
  }
  
  // draw all data (on the canvas) at each frame (called from main loop)
  draw() {
    this.ctx.fillStyle='rgb(0,0,0)';
    this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height); // reset canvas
    //this.ctx.fillStyle='rgb(0,0,0)';
    //const ve = this.vector.setRandInt(new Vector(100, 150), new Vector(200, 360));
    //const height = 40;
    //const width = 20;
    //this.ctx.fillRect(ve.x , ve.y , width, height);
    this.particleManager.draw(this.ctx);
    this.obstacleManager.draw(this.ctx);

  }
  
  // main loop = updateData, then draw, then redo for each frame
  loop() {
    this.updateData();
    this.draw();
    window.requestAnimationFrame(this.loop.bind(this));
  }
  

  // called when the left mouse button is pressed
  // x,y : mouse position (relative to canvas of this.ctx)
  selectMouse(x,y) {
    this.select(new Vector(x, y));
    this.oldMouse = new Vector(x, y);
  }
  
  // called when the mouse moves **while** left button is pressed
  // x,y : mouse position (relative to canvas of this.ctx)
  moveMouse(x,y) {
    const deplacement = new Vector(this.oldMouse.x - x, this.oldMouse.y - y);
    if (this.selected != null) {
      this.selected.move(deplacement);
    }
    this.oldMouse = new Vector(x, y);
  }
  
  faster() {
    this.deltaTime *= 1.10;
    console.log(`deltaTime = ${this.deltaTime}`);
  }
    
  slower() {
    this.deltaTime *= 0.9;
    console.log(`deltaTime = ${this.deltaTime}`);
  }
  
}
