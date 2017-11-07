// Stores a Game instance.
const Game = require('./game.js');
// Stores a canvas context to draw the game into.
// Installs key listeners to move the ship and fire bullets.
// Installs a timer to call Game.prototype.step.
function GameView(canvas) {
  this.game = new Game(canvas);
  this.canvas = canvas;
}

GameView.prototype.start = function start() {
  let that = this;
  function moveAllAsteroids() {
    // that.game.asteroids.forEach((ctx) => {
      // debugger;
      // debugger
    that.game.moveObjects();
    that.game.draw(that.canvas);
    // });
  }
  setInterval(moveAllAsteroids, 100);
};

module.exports = GameView;
