import Ball from './Ball.js';
import Paddle from './Paddle.js'


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
    this.socket = null;
    this.raf = null;
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.ball = new Ball(this.canvas.width/2, (this.canvas.height - Ball.BALLHEIGHT)/2, this);
    this.randomDirectionFirstRound();
    this.paddles = this.initPaddles();
    this.player = null;
    this.otherPlayer = null;
    this.state = this.onGoing();
  }

  initPaddles() {
    const paddleG = new Paddle(
      Game.DISTANCE_FROM_BORDER,
      (this.canvas.height - Paddle.PADDLEHEIGHT) / 2,
      this
    );

    const paddleD = new Paddle(
      this.canvas.width - Game.DISTANCE_FROM_BORDER - Paddle.PADDLEWIDTH,
      (this.canvas.height - Paddle.PADDLEHEIGHT) / 2,
      this
    );

    return [paddleG, paddleD];
  }

  randomDirectionFirstRound() {
    this.ball.horizontalSpeed *= Math.floor(Math.random() * 2) ? 1 : -1;
  }

  /** start this game animation */
  start() {
    document.getElementById('start').value = 'Disconnect';
    this.animate();
  }

  /** stop this game animation */
  stop() {
    const startBtn = document.getElementById('start');
    startBtn.value = this.socket.disabled ? "Déconnecté" : this.onGoing() ? 'Jouer' : 'Appuyez sur Espace';
    startBtn.disabled = true;
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

    // draw the paddles
    this.paddles.forEach(paddle => paddle.draw(this.context));

    // draw the ball
    this.ball.draw(this.context);

    // move the ball
    this.ball.move();
    this.paddles.forEach(paddle => this.ball.checkForCollisionWith(paddle));
    if(this.pNumber==1) this.declareBallMovement(this.ball);

    // move the paddles
    this.paddles.forEach(paddle => paddle.move());
    if (this.player != null) this.declarePaddleMovement(this.player);
  }

  /* If the ball stopped moving, determines a winner, disables the play/stop button, and stops the animation */
  handleEndOfRound() {
    if (!this.onGoing()) {
      this.determineWinner();
      this.handleDocumentEndOfRound();
      this.stop();
    }
  }

  /* Returns whether the ball is moving or not 
  * Will also return true if the game was never started so far (so at startup)
  */
  onGoing() {
    return !this.ball.getStop();
  }

  /* Updates this.lastWinner value and adds one point to the corresponding paddle. Called once at the end of a round */
  determineWinner() {
    this.lastWinner = this.ball.x <= 0 ? this.paddles[1] : this.paddles[0];
    ++this.lastWinner.score;
  }

  /* Called at the end of round to prevent player from clicking the play/stop button until they pressed the spacebar */
  handleDocumentEndOfRound() {
    document.getElementById("score").textContent = `${this.paddles[0].score} - ${this.paddles[1].score}`;
    document.getElementById("start").disabled = true;
  }

  /* Called when round is over and player pressed the spacebar */
  reinitializeGame() {
    this.ball = new Ball(this.canvas.width / 2, (this.canvas.height - Ball.BALLHEIGHT) / 2, this);

    if (this.lastWinner == this.paddles[0]) {
      this.ball.horizontalSpeed = Ball.DEFAULT_SPEED;
      this.ball.x -= this.canvas.width / 4;
    }
    else {
      this.ball.horizontalSpeed = -Ball.DEFAULT_SPEED;
      this.ball.x += this.canvas.width / 4;
    }

    this.paddles.forEach(paddle => paddle.y = (this.canvas.height - Paddle.PADDLEHEIGHT) / 2);
    
    const startBtn = document.getElementById('start');
    startBtn.value = 'Disconnect';
    startBtn.disabled = false;
    this.animate();
  }

  // ne pas bouger avant d'avoir connecté un player
  keyDownActionHandler(event) {
    try {
      switch (event.key) {
        case " ":
          if (!this.onGoing()) {
            this.socket.emit('espace', event.key);
          }
          break;
        case "ArrowUp":
          this.player.moveUp();
          break;
        case "ArrowDown":
          this.player.moveDown();
          break;
        default: return;
      }
      event.preventDefault();
    }
    catch {
      console.log("Can't move if game hasn't started");
    }
  }

  keyUpActionHandler(event) {
    try {
      switch (event.key) {
        case "ArrowUp":
          if (!this.player.getDown()) {
            this.player.stopMoving();
          }
          break;
        case "ArrowDown":
          if (!this.player.getUp()) {
            this.player.stopMoving();
          }
          break;
        default: return;
      }
      event.preventDefault();
    }
    catch {
      console.log("Can't move if game hasn't started");
    }
  }

  handleSocket() {
    this.socket = io();
    this.socket.on('number', (message) => this.welcomingMessage(message) );
    this.socket.on('ready to start', () => this.start() );
    this.socket.on('restart game', () => this.reinitializeGame() );
    this.socket.on('other moved', (...message) => this.handleMobileMovement(this.otherPlayer, ...message) );
    this.socket.on('move ball', (...message) => this.handleMobileMovement(this.ball, ...message) );
    this.socket.on('disconnect player', () => this.stop() );
  }

  /**
   * 
   * @param {*} message for player connection
   */
  welcomingMessage(message) {
    this.pNumber = message;
    if (message < 3) {
      this.player = this.paddles[this.pNumber - 1];
      this.otherPlayer = this.paddles[this.pNumber == 1 ? 1 : 0];
      console.log(`Welcome, player ${message}`);
      // afficher sur la page le numéro de joueur plutôt que dans la console
    }
    else {
      console.log("Connexion refused : too many players are already connected.")
      this.stop();
    }
  }

  /**
   * 
   * @param {*} paddle send x and y postion to move paddle
   */
  declarePaddleMovement(paddle) {
    this.socket.emit('my paddle moved', paddle.x, paddle.y);
  }

  /**
   * 
   * @param {*} ball send x and y position to move this ball
   */
  declareBallMovement(ball) {
    this.socket.emit('ball moved', ball.x, ball.y);
  }

  /**
   * 
   * @param {*} mobile either the other client's paddle, or the ball
   * @param  {...any} message the mobile's x and y coordinates to updated
   */
  handleMobileMovement(mobile, ...message) {
    const x = message[0];
    const y = message[1];
    mobile.x = x;
    mobile.y = y;
  }

}
