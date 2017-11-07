Function.prototype.inherits = function inherit(SuperClass) {
  // function Surrogate() {}
  // Surrogate.prototype = SuperClass.prototype;
  // this.prototype = new Surrogate();
  this.prototype = Object.create(SuperClass.prototype);
  this.prototype.constructor = this;
};


function MovingObject () {}

MovingObject.prototype.moveObj = "method1";

const mo = new MovingObject;
console.log(mo.__proto__);


function Ship () {}
Ship.inherits(MovingObject);

const sh1 = new Ship;
console.log(sh1.moveObj);


// console.log(Object.getPrototypeOf(Ship));


// function Asteroid () {}
// Asteroid.inherits(MovingObject);
