/**
*  define a controller to retrieve static resources
*/
export default class SocketController {

  #io;
  #players;

  constructor(io) {
    this.#io = io;
    this.#players = new Map();
    this.connexionAll();
  }

  connexionAll() {
    this.#io.on( 'connection', socket => this.handleConnexion(socket) );
  }
  
  /**
   * Receives each client's socket at their connexion to io, initializes 
   * some listeners for them, and calls the relevant function when 
   * said listener is triggered
   * - Handles client greeting and stocking in this.#players
   * - Handles client disconnexion
   * - Handles reception of client's movement messages
   * @param socket of the client which just connected
   */
  handleConnexion(socket) {
    const sId = socket.id;
    const nb = this.#players.size + 1;
    console.log(`Connected player #${nb} at ${sId}`);
    socket.emit('number', nb);
    console.log(`Sent ${nb} at ${sId}`);

    // If the new socket can be one of the two players
    if (nb < 3) {
      this.#players.set(nb, socket);

      socket.on( 'my paddle moved', (...mess) => this.handlePaddleMovement(socket, ...mess) );
      socket.on( 'disconnect', () => this.handleDisconnexion(sId) );      
      socket.on( 'espace', (mess) => this.handleReadyToStart(mess) );

      // First player's client will handle the ball's position
      if (nb == 1) {
        socket.on( 'ball moved', (...mess) => this.handleBallMovement(socket, ...mess) );
      }
      else {
        this.handleReadyToStart('ready to start');
      }
    }

    // If two players are already connected
    else {
      console.log(`Disconnecting ${sId} : too many players already connected`);
      socket.disconnect(true);
    }
  }

  handleDisconnexion(socketid) {
    console.log(`Disconnecting ${socketid} : one player disconnected. End of game.`);
    this.#io.emit('disconnect player');
    this.#io.disconnectSockets();
    this.#players.clear();
  }

  /**
   * Sends the new coordinates of the sender's paddle new x and y coordinates
   * @param socket informing of its client's movement
   * @param  {...any} message containing the client's paddle new x and y coordinates
   */
   handlePaddleMovement(socket, ...message) {
    try {
      this.getOtherClient(socket).emit('other moved', ...message);
    }
    catch {
      console.log("A movement happened before a second player joined...");
    }
  }

  /**
   * Sends the new coordinates of the ball's new x and y coordinates to player 2
   * @param socket informing of its client's movement
   * @param  {...any} message containing the client's ball new x and y coordinates
   */
  handleBallMovement(socket, ...message) {
    try {
      this.getOtherClient(socket).emit('move ball', ...message);
    }
    catch {
      console.log("A movement happened before a second player joined...");
    }
  }

  /**
   * Send when the game is restarted / begins
   * @param {*} mess contains the game launch or restart message 
   */
  handleReadyToStart(mess) {
    if(mess === " ") {
      this.#io.emit('restart game');
    }
    this.#io.emit(mess);
  }

  /**
   * 
   * @param {*} socket to filter out
   * @returns the socket that was not given as parameter, in this.#players
   */
  getOtherClient(socket) {
    let socketArray = new Array();
    this.#players.forEach((k, _) => socketArray.push(k));
    const otherSocket = socketArray.filter(sock => sock != socket)[0];
    return otherSocket;
  }
}
