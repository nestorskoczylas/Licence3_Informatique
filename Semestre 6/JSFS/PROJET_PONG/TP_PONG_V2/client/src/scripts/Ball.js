import Game from './Game.js';
import Mobile from './Mobile.js';
import Paddle from './Paddle.js';


// default values for a Ball : image and shifts
const BALL_IMAGE_SRC = './images/balle24.png';
const SHIFT_X = 6;
const SHIFT_Y = 0;
const MAX_SPEED = 6;
const MIN_SPEED = 3;


/**
 * a Ball is a mobile with a ball as image and that bounces in a Game (inside the game's canvas)
 */
export default class Ball extends Mobile {

  static BALLHEIGHT = 22;

  /**  build a ball
   *
   * @param  {number} x       the x coordinate
   * @param  {number} y       the y coordinate
   * @param  {Game} theGame   the Game this ball belongs to
   */
  constructor(x, y, theGame) {
    super(x, y, BALL_IMAGE_SRC , SHIFT_X, SHIFT_Y);
    this.theGame = theGame;
  }
  
  adjust_verticalSpeed(adjustment) {
    const verticalSum = Math.abs(this.verticalSpeed) + Math.abs(adjustment);
    const horizontalSum = Math.abs(this.horizontalSpeed) + Math.abs(adjustment);
    if (verticalSum <= MAX_SPEED) {
      this.verticalSpeed += adjustment;
    }
    if (MIN_SPEED <= horizontalSum && horizontalSum <= MAX_SPEED) {
      this.horizontalSpeed = - this.horizontalSpeed - adjustment;
    }
    else this.horizontalSpeed =- this.horizontalSpeed;
  }

  /**
   * when moving a ball bounces inside the limit of its game's canvas
   */
  move() {
    if (this.x + this.horizontalSpeed <= 0) {
      this.x = 0;
      super.stopMoving();
    }
    if (this.y + this.verticalSpeed <= 0 || this.y + this.height >= this.theGame.canvas.height) {
      this.verticalSpeed = - this.verticalSpeed;    // rebond en haut ou en bas
    }
    if (this.x + this.width >= this.theGame.canvas.width) {
      this.horizontalSpeed = - this.horizontalSpeed;    // rebond en gauche ou à droite
    }
    super.move();
  }

  checkForCollisionWith(paddle) {
    let b2x = paddle.x + paddle.width;
    let b2y = paddle.y + paddle.height;

    let p1x = Math.max(this.x, paddle.x + 2*paddle.width/3);
    let p1y = Math.max(this.y, paddle.y + 2*paddle.height/3);

    let p2x = Math.min(this.x + paddle.width, b2x);
    let p2y = Math.min(this.y + paddle.height, b2y);

    let collision = (p1x < p2x) && (p1y < p2y);
    if (collision)
      this.handleCollision(paddle);
    return collision;
  }

  handleCollision(paddle) {
    const difference = Math.floor((this.center - paddle.center)/10);

    const moveAway = (paddle.x === Game.DISTANCE_FROM_BORDER) ? paddle.x + paddle.width + 1 : paddle.x - 1;
    this.x = moveAway;

    this.adjust_verticalSpeed(difference);
  }

}
