import Mobile from './Mobile';
import MoveState from './MoveState';

const paddleImg = './images/paddle.png';
const SHIFT_Y = 7;

export default class Paddle extends Mobile {

  static PADDLEHEIGHT = 84;
  static PADDLEWIDTH = 24;

  /**
   * A Paddle is a mobile representing a player in a Game.
   * Therefore, it also keeps track of the relevant score value.
   */
  constructor(x, y, theGame) {
    super(x, y, paddleImg, 0, 0);
    this.moving = MoveState.NONE;
    this.theGame = theGame;
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
    }
    else if (this.getDown()) {
      this.verticalSpeed = SHIFT_Y;
      this.y = Math.min(this.theGame.canvas.height - this.height, this.y + this.verticalSpeed);
    }
    super.updateCenter();
  }

}
