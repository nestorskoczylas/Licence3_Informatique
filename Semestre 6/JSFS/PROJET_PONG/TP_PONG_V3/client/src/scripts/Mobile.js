import MoveState from './MoveState';

/**
  A mobile is defined by its coordinates, an image and a "speed" defined by horizontal and vertical shift values
*/
export default class Mobile {

  // static img = new Image();

  /**
   * builds a Mobile
   *
   * @param  {number} x               the x coordinate of this mobile
   * @param  {number} y               the y coordinate of this mobile
   * @param  {string} imgSrc          this mobile's image src
   * @param  {number} horizontalSpeed = 0 the horizontal shift "speed"
   * @param  {number} verticalSpeed   = 0 the vertical shift "speed"
   */
  constructor(x, y, imgSrc, horizontalSpeed = 0, verticalSpeed = 0) {
    this.y = y;
    this.x = x;
	  this.img = new Image();
    this.img.src = imgSrc;
    this.horizontalSpeed = horizontalSpeed;
    this.verticalSpeed = verticalSpeed;
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
    this.x += this.horizontalSpeed;
    this.y += this.verticalSpeed;
    this.updateCenter();
  }
  /** draw this mobile's image at its coordinates in the given context
  * @param {CanvasRenderingContext2D} ctxt - the drawing context
  */
  draw(context) {
    context.drawImage(this.img, this.x, this.y);
  }
  /** this mobile stops moving : speed becomes 0*/
  stopMoving() {
    this.horizontalSpeed = 0;
    this.verticalSpeed = 0;
    this.moving = MoveState.NONE;
  }

  getStop() {
    return this.moving === MoveState.NONE;
  }

  updateCenter() {
    this.center = (this.y*2 + this.height)/2;
  }
}
