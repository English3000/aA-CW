// Holds collections of the asteroids, bullets, and your ship.
const Asteroid = require('./asteroid.js');
// const Bullet = require('./bullet.js');
// const Ship = require('./ship.js');

// Game.prototype.step method calls Game.prototype.move on all the objects, and Game.prototype.checkCollisions checks for colliding objects.
// Game.prototype.draw(ctx) draws the game.
// Keeps track of dimensions of the space; wraps objects around when they drift off the screen.


function Game(ctx) {
  this.ctx = ctx;
  this.asteroids = [];
  this.addAsteroids();
}

Game.DIM_X = 300;
Game.DIM_Y = 300;
Game.NUM_ASTEROIDS = 15;

Game.prototype.addAsteroids = function addAsteroids() {
  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    let pos = [Math.floor(Math.random()*Game.DIM_X),
               Math.floor(Math.random()*Game.DIM_Y)]; //inconsistent
    const asteroid = new Asteroid(this, pos);
    // this.draw(asteroid);
    this.asteroids.push(asteroid);
  }
  return this.asteroids;
};

Game.prototype.draw = function draw(ctx) {
  // do for all objects
  this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.ctx.fillStyle = 'black';
  this.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.asteroids.forEach((asteroid) => {
    asteroid.draw(ctx);
  });
};

Game.prototype.moveObjects = function moveObjects() {
  this.asteroids.forEach((asteroid) => {
    asteroid.move();
  });
};

Game.prototype.wrap = function wrap(pos) {
  if (pos[0] > Game.DIM_X) {
    pos[0] -= Game.DIM_X;
  }
  if (pos[1] > Game.DIM_Y) {
    pos[1] -= Game.DIM_Y;
  }
};

module.exports = Game;
