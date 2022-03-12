

// @return an int between the ints a and b (included)
export const randint=(a,b) => Math.floor(Math.random()*(b-a+1)+a);


export default class Vector {
  x=0;
  y=0;
  
  constructor(x,y) {
    this.x=x;
    this.y=y;
  }

  // set this to p (Vector)
  set(p) {
    this.x=p.x;
    this.y=p.y;
    return this; // allows chain operation
  }

  // @return a copy of this
  copy() {
    return new Vector(this.x,this.y);
  }
    
  // set this to x,y
  setXY(x,y) {
    this.x = x;
    this.y = y;
    return this; // allows chain
  }
  
  // add u to this (i.e. this += u)
  add(u) {
    this.x+=u.x;
    this.y+=u.y;
    return this; // allows chain
  }
  
  // @return the (new) vector p1+p2  
  static add(p1,p2) {    
    return new Vector(p1.x+p2.x,p1.y+p2.y);
  }

  setRandInt(p1, p2){
    this.setXY(randint(p1.x, p2.x), randint(p1.y, p2.y));
    return this;
  }
    
  // @return a string that represents this
  toString() {
	  return "("+this.x+","+this.y+")";
  }
  
  

}
