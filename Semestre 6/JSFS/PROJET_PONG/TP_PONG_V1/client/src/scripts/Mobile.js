/**
  A mobile is defined by its coordinates, an image and a "speed" defined by horizontal and vertical shift values
*/
export default class Mobile {
  /**
   * buils a Mobile
   *
   * @param  {number} x          the x coordinate of this mobile
   * @param  {number} y          the y coordinate of this mobile
   * @param  {string} imgSrc     this mobile's image src
   * @param  {number} shiftX = 0 the horizontal shift "speed"
   * @param  {number} shiftY = 0 the vertical shift "speed"
   */
  constructor(x, y, imgSrc, shiftX = 0, shiftY = 0) {
    this.y = y;
    this.x = x;
	  this.img = new Image();
    this.img.src = imgSrc;
    this.shiftX = shiftX;
    this.shiftY = shiftY;
  }

  /** @return {number} the width of the mobile, ie. its images's width */
  get width() {
    return this.img.width;
  }
  /** @return {number} the width of the mobile, ie. its images's height */
  get height() {
    return this.img.height;
  }
  /** this mobile moves : horizontal and vertical shifts are added to coordinates */
  move() {
    this.x = this.x + this.shiftX;
    this.y = this.y + this.shiftY;
  }
  /** draw this mobile's image at its coordinates in the given context
  * @param {CanvasRenderingContext2D} ctxt - the drawing context
  */
  draw(ctxt) {
    ctxt.drawImage(this.img,this.x,this.y);
  }
  /** this mobile stops moving : speed becomes 0 */
  stopMoving() {
    this.shiftX = 0;
    this.shiftY = 0;
  }
}
