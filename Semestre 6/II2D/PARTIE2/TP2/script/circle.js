import Vector, { distanceVector } from './vector.js';

export default class Circle {

    
  constructor(center, radius) {
    this.center = new Vector(center.x, center.y);
    this.radius = radius;
    this.color = 'rgb(255, 0, 0)';
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
    ctx.strokeStyle= this.color;
    ctx.stroke();
  }

  distance(m) {
    let distanceCentre = distanceVector(this.center, m);
    if (distanceCentre < this.radius) {
      return this.radius - distanceCentre;
    }
    return distanceCentre - this.radius;
  }

  move(m) {
    this.center.setXY(this.center.x - m.x, this.center.y - m.y);
  }

  selected() {
    this.color = 'rgb(0, 255, 0)';
  }

  deselect() {
    this.color = 'rgb(255, 0, 0)';
  }
}
