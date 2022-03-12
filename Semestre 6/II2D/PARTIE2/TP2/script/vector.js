
// @return an int between the ints a and b (included)
export const randint=(a, b) => Math.floor(Math.random()*(b - a + 1) + a);

export const distanceVector = (p1, p2) => Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p2.y - p1.y, 2));

export default class Vector {
  x = 0;
  y = 0;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // set this to p (Vector)
  set(p) {
    this.x = p.x;
    this.y = p.y;
    return this; // allows chain operation
  }

  // @return a copy of this
  copy() {
    return new Vector(this.x, this.y);
  }

  // set this to x,y
  setXY(x, y) {
    this.x = x;
    this.y = y;
    return this; // allows chain
  }

  // add u to this (i.e. this += u)
  add(u) {
    this.x += u.x;
    this.y += u.y;
    return this; // allows chain
  }

  // @return the (new) vector p1+p2
  static add(p1, p2) {
    return new Vector(p1.x + p2.x, p1.y + p2.y);
  }

  static substract(p1, p2) {
    return new Vector(p2.x - p1.x, p2.y - p1.y);
  }

  static produitScalaire(u, v) {
    return u.x * v.x + u.y * v.y;
  }

  static normal(a, b) {
    return new Vector(-(b.y - a.y), b.x - a.x);
  }

  static div(a, b) {
    return a / b;
  }

  static multVectorConstante(cst, v) {
    return new Vector(Math.round(cst * v.x), Math.round(cst * v.y));
  }

  setRandInt(p1, p2) {
    this.setXY(randint(p1.x, p2.x), randint(p1.y, p2.y));
    return this;
  }

  length() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  substract(x) {
    this.x -= x.x;
    this.y -= x.y;
    return this;
  }

  div(x) {
    this.x /= x;
    this.y /= x;
  }

  produitScalaire(x) {
    return this.x * x.x + this.y * x.y;
  }

  // @return a string that represents this
  toString() {
    return "(" + this.x + "," + this.y + ")";
  }
}
