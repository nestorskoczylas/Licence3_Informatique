import Ball from './Ball.js';
import Paddle from './Paddle.js'
import MoveState from './MoveState';


/**
 * a Game animates a ball bouncing in a canvas
 */
export default class Game {

  static DISTANCE_FROM_BORDER = 30;

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
    this.randomDirectionFirstRound();
    this.paddleG = new Paddle(
      Game.DISTANCE_FROM_BORDER,
      (this.canvas.height - Paddle.PADDLEHEIGHT) / 2,
      this
    );
    this.paddleD = new Paddle(
      this.canvas.width - Game.DISTANCE_FROM_BORDER - Paddle.PADDLEWIDTH,
      (this.canvas.height - Paddle.PADDLEHEIGHT) / 2,
      this
    );
    this.state = this.onGoing();
  }

  randomDirectionFirstRound() {
    this.ball.horizontalSpeed *= Math.floor(Math.random() * 2) ? 1 : -1;
  }

  /** start this game animation */
  start() {
    document.getElementById('start').value = 'Stop';
    this.animate();
  }
  /** stop this game animation */
  stop() {
    document.getElementById('start').value = this.onGoing() ? 'Jouer' : 'Appuyez sur Espace';
    window.cancelAnimationFrame(this.raf);
  }

  /** animate the game : move and draw */
  animate() {
    this.moveAndDraw();
    this.raf = window.requestAnimationFrame(this.animate.bind(this));

    this.handleEndOfRound();
  }

  /** move then draw the bouncing ball and paddles */
  moveAndDraw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const paddles = [this.paddleG, this.paddleD];
    // draw the paddle
    paddles.forEach(paddle => paddle.draw(this.context));

    // draw and move the ball
    this.ball.draw(this.context);
    this.ball.move();    
    paddles.forEach(paddle => this.ball.checkForCollisionWith(paddle));

    // move the paddles
    paddles.forEach(paddle => paddle.move());
  }

  /* If the ball stopped moving, determines a winner, disables the play/stop button, and stops the animation */
  handleEndOfRound() {
    if (!this.onGoing()) {
      this.determineWinner();
      this.handleDocumentEndOfRound();
      this.stop();
    }
  }

  /* Returns whether the ball is moving or not */
  onGoing() {
    return !this.ball.getStop();
  }
  
  /* Updates this.lastWinner value and adds one point to the corresponding paddle. Called once at the end of a round */
  determineWinner() {
    this.lastWinner = this.ball.x <= 0 ? this.paddleD : this.paddleG;
    ++this.lastWinner.score;
  }

  /* Called at the end of round to prevent player from clicking the play/stop button until they pressed the spacebar */
  handleDocumentEndOfRound() {
    document.getElementById("score").textContent = `${this.paddleG.score} - ${this.paddleD.score}`;
    document.getElementById("start").disabled = true;
  }

  /* Called when round is over and player pressed the spacebar */
  reinitializeGame() {
    this.ball = new Ball(this.canvas.width / 2, (this.canvas.height - Ball.BALLHEIGHT) / 2, this);

    if (this.lastWinner == this.paddleG) {
      this.ball.horizontalSpeed = Ball.DEFAULT_SPEED;
      this.ball.x -= this.canvas.width / 4;
    }
    else {
      this.ball.horizontalSpeed = -Ball.DEFAULT_SPEED;
      this.ball.x += this.canvas.width / 4;
    }

    const paddles = [this.paddleG, this.paddleD];
    paddles.forEach(paddle => paddle.y = (this.canvas.height - Paddle.PADDLEHEIGHT) / 2);
    this.start();
    document.getElementById("start").disabled = false;
  }

  keyDownActionHandler(event) {
    switch (event.key) {
      case " ":
        if (!this.onGoing()) {
          this.reinitializeGame();
        }
        break;
      case "ArrowUp":
        this.paddleD.moveUp();
        break;
      case "ArrowDown":
        this.paddleD.moveDown();
        break;
      case "z":
        this.paddleG.moveUp();
        break;
      case "s":
        this.paddleG.moveDown();
        break;
     default: return;
   }
   event.preventDefault();
  }

  keyUpActionHandler(event) {
    switch (event.key) {
      case "ArrowUp":
        if (!this.paddleD.getDown()) {
          this.paddleD.stopMoving();
        }
        break;
      case "ArrowDown":
        if (!this.paddleD.getUp()) {
          this.paddleD.stopMoving();
        }
        break;
      case "z":
        if (!this.paddleG.getDown()) {
          this.paddleG.stopMoving();
        }
        break;
      case "s":
        if (!this.paddleG.getUp()) {
          this.paddleG.stopMoving();
        }
        break;  
     default: return;
   }
   event.preventDefault();
  }

}
