import Vector from './vector.js';

export default class Particle {
  
  constructor() {
    this.position = new Vector(0, 0);
    this.color = {r : 0, g : 0, b :0, a : 1};
    this.isAlive = false;
    this.life = 0;
  }

  // draw a particule in the canvas context ctx
  draw(ctx) {
    ctx.fillStyle=`rgb(${this.color.r},${this.color.g},${this.color.b}, ${this.color.a})`; 
    ctx.fillRect(this.position.x, this.position.y, 5, 5); // reset canvas
  }
}
