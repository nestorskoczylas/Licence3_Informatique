import Vector, { distanceVector } from "./vector.js";

export default class Segment {
  constructor(a, b) {
    this.a = a;
    this.b = b;
    this.color = "rgb(255, 0, 0)";
    this.zone = null;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.a.x, this.a.y);
    ctx.lineTo(this.b.x, this.b.y);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }

  distance(m) {
    // ZONE A
    this.zone = this.getZone(m);
    if (this.zone == "A") {
      console.log("Zone A");
      return distanceVector(this.a, m);
    }
    // ZONE B
    else if (this.zone == "B") {
      console.log("Zone B");
      return distanceVector(this.b, m);
    }
    // ZONE OTHER
    else {
      console.log("Other");
      this.zone = "O";
      let ab = Vector.substract(this.b, this.a);
      let am = Vector.substract(m, this.a);
      let n = new Vector(-ab.y, ab.x);
      let am_n = Vector.produitScalaire(am, n);
      let n_n = Vector.produitScalaire(n, n);
      let div_AMN_NN = Vector.div(am_n, n_n);
      let h = Vector.multVectorConstante(div_AMN_NN, n);
      return h.length();
    }
  }

  move(m) {
    // ZONE A
    if (this.zone == "A") {
      this.a.setXY(this.a.x - m.x, this.a.y - m.y);
    }
    // ZONE B
    else if (this.zone == "B") {
      this.b.setXY(this.b.x - m.x, this.b.y - m.y);
    }
    // ZONE OTHER
    else if (this.zone == "O") {
      this.a.setXY(this.a.x - m.x, this.a.y - m.y);
      this.b.setXY(this.b.x - m.x, this.b.y - m.y);
    }
  }

  getZone(m) {
    // ZONE A
    let am = Vector.substract(m, this.a);
    let ab = Vector.substract(this.b, this.a);
    if (Vector.produitScalaire(am, ab) < 0) return "A";

    // ZONE B
    let bm = Vector.substract(m, this.b);
    let ba = Vector.substract(this.a, this.b);
    if (Vector.produitScalaire(bm, ba) < 0) return "B";
  }


  selected() {
    this.color = "rgb(0, 255, 0)";
  }

  deselect() {
    this.color = "rgb(255, 0, 0)";
  }
}
