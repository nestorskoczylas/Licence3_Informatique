'use strict';

import Game from './Game.js';

const init = () => {
  const theField = document.getElementById("field");
  const theGame = new Game(theField);
  const startButton = document.getElementById("start");

  startButton.addEventListener("click", () => {
    startGame(theGame);
    startButton.disabled = true;
    
  });

  window.addEventListener('keydown', theGame.keyDownActionHandler.bind(theGame));
  window.addEventListener('keyup', theGame.keyUpActionHandler.bind(theGame));
}

window.addEventListener("load", init);


// true iff game is started
let started = false;
/** start and stop a game
 * @param {Game} theGame - the game to start and stop
 */
const startGame = theGame => {
  if (!started) {
    theGame.handleSocket();
    theGame.socket.on('number', (message) => {
      const welcomeMess = document.getElementById('player');
      welcomeMess.textContent = message < 3 ? `Bienvenue, joueur ${message}` : "Connexion refusée : trop de joueurs déjà connectés";
      switch(message) {
        case 1 :
          welcomeMess.style.color = "blue";
          document.getElementById("start").value = "En attente d'un second joueur";
          break;
        case 2 :
          welcomeMess.style.color = "green";
          break;
        case 3 :
          welcomeMess.style.color = "red";
          break;
      }
    });
  }
  else {
    theGame.socket.disconnect(true);
    theGame.handleDisconnection();
  }
  started = ! started;
}
