import Ball from './Ball.js';
import Paddle from './Paddle.js'
import MoveState from './MoveState';

const DISTANCE_FROM_BORDER = 30;

/**
 * a Game animates a ball bouncing in a canvas
 */
export default class Game {


  /**
   * build a Game
   *
   * @param  {Canvas} canvas the canvas of the game
   */
  constructor(canvas) {
    this.raf = null;
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.ball = new Ball(this.canvas.width/2, (this.canvas.height - Ball.BALLHEIGHT)/2, this);
    this.paddle1 = new Paddle(DISTANCE_FROM_BORDER, (this.canvas.height - Paddle.PADDLEHEIGHT)/2, this);
    this.state = this.onGoing();
  }

  static get DISTANCE_FROM_BORDER() {return DISTANCE_FROM_BORDER;}

  /** start this game animation */
  start() {
    this.animate();
  }
  /** stop this game animation */
  stop() {
    window.cancelAnimationFrame(this.raf);
  }

  /** animate the game : move and draw */
  animate() {
    this.moveAndDraw();
    this.raf = window.requestAnimationFrame(this.animate.bind(this));

    this.handleEndOfRound();
  }

  handleEndOfRound() {
    if (!this.onGoing()) {
      const winningPaddle = this.determineWinner();
      //attribuer un point au gagnant?
    }
  }

  onGoing() {
    return !this.ball.getStop();
  }

  /** move then draw the bouncing ball */
  moveAndDraw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // draw the paddle
    this.paddle1.draw(this.context);
    // draw and move the ball
    this.ball.draw(this.context);
    this.ball.move();

    this.ball.checkForCollisionWith(this.paddle1);
    // move the paddle
    this.paddle1.move();
  }

  determineWinner() {
    //return this.ball.x == 0 ? this.paddle2 : this.paddle1;
    return this.paddle1; //pour le moment, car paddle2 pas défini
  }

  keyDownActionHandler(event) {
    switch (event.key) {
      case " ":
        if (!this.onGoing()) {
          this.ball = new Ball(this.canvas.width/2, this.canvas.height/2, this);
        }
        break;
      case "ArrowUp":
      case "Up":
        this.paddle1.moveUp();
        break;
      case "ArrowDown":
      case "Down":
        this.paddle1.moveDown();
        break;
     default: return;
   }
   event.preventDefault();
  }

  keyUpActionHandler(event) {
    switch (event.key) {
      case "ArrowUp":
      case "Up":
        if (!this.paddle1.getDown()) {
          this.paddle1.stopMoving();
        }
        break;
      case "ArrowDown":
      case "Down":
        if (!this.paddle1.getUp()) {
          this.paddle1.stopMoving();
        }
        break;
     default: return;
   }
   event.preventDefault();
  }

}
