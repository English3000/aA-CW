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
