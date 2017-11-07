/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(1);

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("game-canvas");
  canvasEl.width = 300;
  canvasEl.height = 300;

  const ctx = canvasEl.getContext("2d");

  const currentGame = new GameView(ctx);
  currentGame.start();
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// Stores a Game instance.
const Game = __webpack_require__(2);
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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// Holds collections of the asteroids, bullets, and your ship.
const Asteroid = __webpack_require__(3);
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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// Spacerock. It inherits from MovingObject
const Util = __webpack_require__(4);
const MovingObject = __webpack_require__(5);

Util.inherits(Asteroid, MovingObject);
// function Asteroid(pos, RADIUS = 5, COLOR = 'green') {
function Asteroid(game, pos) {
  this.RADIUS = 5;
  this.COLOR = 'green';
  return new MovingObject({game: game,
                           pos: pos,
                           vel: Util.randomVec(2*this.RADIUS),
                           radius: this.RADIUS,
                           color: this.COLOR});
}


// const as1 = new Asteroid({ pos: [30, 30] });
// console.log(as1);


module.exports = Asteroid;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// Utility code, especially vector math stuff.

// Dist([x_1, y_1], [x_2, y_2]) = sqrt((x_1 - x_2) ** 2 + (y_1 - y_2) ** 2)
// Norm([x_1, y_1]) = Dist([0, 0], [x_1, y_1])

const Util = {
  inherits (childClass, parentClass) {
    childClass.prototype = Object.create(parentClass.prototype);
    childClass.prototype.constructor = childClass;
  },

  // Return a randomly oriented vector with the given length.
  randomVec (length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  
  // Scale the length of a vector by the given amount.
  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  }
};

module.exports = Util;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

// Base class for anything that moves.
// Most important methods are MovingObject.prototype.move, MovingObject.prototype.draw(ctx), MovingObject.prototype.isCollidedWith(otherMovingObject).
function MovingObject(paramsObj) {
  this.game = paramsObj.game;
  this.pos = paramsObj.pos;
  this.vel = paramsObj.vel;
  this.radius = paramsObj.radius;
  this.color = paramsObj.color;
}

// const mo = new MovingObject(
//   { pos: [30, 30], vel: [10, 10], radius: 5, color: "#00FF00"}
// );
//
// console.log(mo);

MovingObject.prototype.draw = function draw(ctx) {
  // debugger;
  ctx.beginPath();
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI, true);
  // ctx.strokeStyle = 'this.color';
  ctx.lineWidth = 5;
  // ctx.stroke();
  ctx.fillStyle = 'yellow';
  ctx.fill();
};

MovingObject.prototype.move = function move() {
  // ctx.pos[0] += ctx.vel[0];
  // ctx.pos[1] += ctx.vel[1];
  // debugger;
  this.game.wrap(this.pos);
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
};

module.exports = MovingObject;


/***/ })
/******/ ]);