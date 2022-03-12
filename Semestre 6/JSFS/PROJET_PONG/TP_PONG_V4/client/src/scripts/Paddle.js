import Mobile from './Mobile';
import MoveState from './MoveState';

const PADDLE_IMAGE_SRC = "./images/paddle.png";
const SHIFT_Y = 7;

export default class Paddle extends Mobile {

  static PADDLEHEIGHT = 84;
  static PADDLEWIDTH = 24;

  /**
   * A Paddle is a mobile representing a player in a Game.
   * Therefore, it also keeps track of the relevant score value.
   * 
   * @param  {number} x       the x coordinate
   * @param  {number} y       the y coordinate
   * @param  {Game} theGame   the Game this paddle belongs to
   */
  constructor(x, y, theGame) {
    super(x, y, PADDLE_IMAGE_SRC, 0, 0);
    this.theGame = theGame;
    this.moving = MoveState.NONE;
    this.score = 0;
  }

  getUp() {
    return this.moving === MoveState.UP;
  }

  getDown() {
    return this.moving === MoveState.DOWN;
  }

  moveUp() {
    this.moving = MoveState.UP;
  }

  moveDown() {
    this.moving = MoveState.DOWN;
  }

  move() {
    if (this.getUp()) {
      this.verticalSpeed = -SHIFT_Y;
      this.y = Math.max(0, this.y + this.verticalSpeed);
    } else if (this.getDown()) {
      this.verticalSpeed = SHIFT_Y;
      this.y = Math.min(
        this.theGame.canvas.height - this.height,
        this.y + this.verticalSpeed
      );
    }
    super.updateCenter();
  }

}
