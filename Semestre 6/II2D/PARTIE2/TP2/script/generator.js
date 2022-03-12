import Vector, { randint, distanceVector } from './vector.js';

export default class Generator {

    
  constructor(center, size) {
    this.center = center;
    this.size = size;
    this.birthRate = 0.5;
    this.nbBirth = 0;
    this.longeviteMin = 10;
    this.longeviteMax = 100;
  }

  initParticle(p){
    let point1 = new Vector(this.center.x - (this.size.x / 2), this.center.y - (this.size.y / 2));
    let point2 = new Vector(this.center.x + (this.size.x / 2), this.center.y + (this.size.y / 2));
    p.position.setRandInt(point1, point2);
    p.color.r = randint(0,255);
    p.color.g = randint(0,255);
    p.color.b = randint(0,255);
    p.isAlive = true;
    p.life = randint(this.longeviteMin, this.longeviteMax);
  }

  distance(m) {
    return Math.abs(distanceVector(this.center, m));
  }

  move(m) {
    this.center.setXY(this.center.x - m.x, this.center.y - m.y);
  }

  selected() {
    
  }

  deselect() {
    
  }
}