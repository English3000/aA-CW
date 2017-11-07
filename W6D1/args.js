function sumWithArgs() {
  const argsArr = Array.from(arguments);
  return argsArr.reduce((acc, el) => {
    return acc + el;
  });
}

function sumWithRest(...allArgs) {
  return allArgs.reduce((acc, el) => {
    return acc + el;
  });
}
// console.log(sumWithRest(1,2,3));


// class Cat {
//   constructor(name) {
//     this.name = name;
//   }
//
//   says(sound, person) {
//     console.log(`${this.name} says ${sound} to ${person}!`);
//     return true;
//   }
// }
//
// const markov = new Cat("Markov");
// const breakfast = new Cat("Breakfast");
Object.prototype.myBindWithArgs = function myBindWithArgs(setToThis) {
  const argsArr = Array.from(arguments);
  const method = this;
  return function boundFunction() {
    const innerArgsArr = Array.from(arguments);
    return method.apply(setToThis, argsArr.slice(1).concat(innerArgsArr));
  };
};

Object.prototype.myBindWithRest = function myBindWithRest(...allArgs) {
  const setToThis = allArgs.shift();
  const method = this;
  return function binder(...newArgs) {
    return method.apply(setToThis, allArgs.concat(newArgs));
  };
};
// markov.says.myBindWithRest(breakfast, "meow", "Kush")();
// markov.says.myBindWithRest(breakfast)("meow", "a tree");
// markov.says.myBindWithRest(breakfast, "meow")("Markov");
// const notMarkovSays = markov.says.myBindWithRest(breakfast);
// notMarkovSays("meow", "me");

function curriedSum(numArgs) {
  const numbers = [];
  function _curriedSum(number) {
    numbers.push(number);
    if (numbers.length === numArgs) {
      return numbers.reduce(function(accumulator, currentValue) {
        return accumulator + currentValue;
      });
    }
    return _curriedSum;
  }
  return _curriedSum;
}
const sum = curriedSum(4);
// console.log(sum(5)(30)(20)(1)); // => 56
//
// console.log(curriedSum(2)(10)(10));

// -------

Function.prototype.curry = function ourCurry(numArgs) {
  const receivedArgs = [];
  const method = this;
  function curried(arg) {
    receivedArgs.push(arg);
    if (receivedArgs.length === numArgs) {
      // return method.apply(method, receivedArgs);
      return method.call(method, ...receivedArgs);
    }
    return curried;
  }
  // console.log(this);
  return curried;
};

function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}
console.log(sumThree.curry(3)(4)(20)(6)); // == 30
