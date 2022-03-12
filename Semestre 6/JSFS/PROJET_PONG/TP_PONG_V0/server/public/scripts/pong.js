'use strict';

import Game from './Game.js';

const init = () => {
  const theField = document.getElementById("field");
  const theGame = new Game(theField);

  document.getElementById('start').addEventListener("click", () => startGame(theGame) );
}

window.addEventListener("load",init);

// true iff game is started
let started = false;
/** start and stop a game
 * @param {Game} theGame - the game to start and stop
 */
const startGame = theGame => {
  if (!started) {
    theGame.start();
    document.getElementById('start').value = 'stop';
  }
  else {
    document.getElementById('start').value = 'jouer';
    theGame.stop();
  }
  started = ! started;
}
