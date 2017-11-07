const GameView = require('./game_view.js');

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("game-canvas");
  canvasEl.width = 300;
  canvasEl.height = 300;

  const ctx = canvasEl.getContext("2d");

  const currentGame = new GameView(ctx);
  currentGame.start();
});
