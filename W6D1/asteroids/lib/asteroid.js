// Spacerock. It inherits from MovingObject
const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');

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
