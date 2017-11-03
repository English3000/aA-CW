Array.prototype.uniq = function uniq() {
  const uniques = [];
  this.forEach(el => {
    if (!uniques.includes(el)) {
      uniques.push(el);
    }
  });
  return uniques;
};




Array.prototype.twoSum = function twoSum() {
  const pairs = [];
  for (var i = 0; i < this.length; i++) {
    for (var j = i + 1; j < this.length; j++) {
      if (this[i] + this[j] === 0) {
        pairs.push([i, j]);
      }
    }
  }
  return pairs;
};



// for nested array
Array.prototype.transpose = function transpose() {
  const transposed = [];
  let times = this[0].length;
  // push [] into transpose via for loop w/ times
  for (times; times > 0; times--) {
    transposed.push([]);
  }
  for (var i = 0; i < this.length; i++) {
    for (var j = 0; j < this[0].length; j++) {
      // assign traponsposed values w/ push
      transposed[j].push(this[i][j]);
    }
  }
  return transposed;
};

const grid = [
  [1,2,3,4],
  [5,6,7,8],
  [9,10,11,12]
];
// grid.transpose();
/*[
  [1,5,9],
  [2,6,10],
  [3,7,11],
  [4,8,12]
];*/

// const print = function print(arg) {
//   console.log(arg);
//   return arg;
// };

Array.prototype.myEach = function myEach(callback) {
  for (var i = 0; i < this.length; i++) {
    callback(this[i]);
  }
};


Array.prototype.myMap = function myMap(callback) {
  const mapped = [];
  for (var i = 0; i < this.length; i++) {
    mapped.push( callback(this[i]) );
  }
  return mapped;
};


Array.prototype.myReduce = function myReduce(callback, acc) {
  if (!acc) {
    acc = this.shift();
  }
  for (var i = 0; i < this.length; i++) {
    acc = callback(acc, this[i]);
  }
  return acc;
};

// [1, 2, 3].myReduce(function(acc, el) {
//   return acc + el;
// });
// [1, 2, 3].myReduce(function(acc, el) {
//   return acc + el;
// }, 25);

Array.prototype.bubbleSort = function bubbleSort() {
  const dupThis = this;

  let changed = true;
  while (changed) {
    changed = false;
    for (var i = 0; i < dupThis.length - 1; i++) {
      if (dupThis[i] > dupThis[i+1]) {
        const temp = dupThis[i];
        dupThis[i] = dupThis[i+1];
        dupThis[i+1] = temp;
        changed = true;
      }
    }
  }
  return dupThis;
};

// const unsorted = [3,8,1,4,7];
// console.log(unsorted.bubbleSort());

String.prototype.substrings = function substrings() {
  const subs = [];
  for (var i = 0; i < this.length; i++) {
    for (var j = i + 1; j <= this.length; j++) {
      // console.log(`Starts @${i}, Ends @${j}`)
      // console.log(this.slice(i, j));
      subs.push(this.slice(i, j));
    }
  }
  return subs.uniq();
}

// const testStr = "Hello"
// console.log(testStr.substrings());

function range(start, end) {
  let nums = end;
  if (start === end) {
    return [start];
  }
  return range(start, end - 1).concat(nums);
}

// console.log(range(2, 7));

function sumRec(arr) {
  let sum = arr[arr.length - 1];
  if (arr.length === 1) {
    return arr[0];
  }
  return sum + sumRec(arr.slice(0, arr.length -1));
}

// console.log(sumRec([11,2,3,4,5]));

function exponent(base, exp) {
  if (exp === 0 || base === 1) {
    return 1;
  }
  return base * exponent(base, exp - 1);
}

// console.log(exponent(2, 3));

function quirkyExponent(base, exp) {
  if (exp === 0) {
    return 1;
  } else if (exp%2 === 1) {
    const result = quirkyExponent(base, (exp - 1) / 2)
    return base * result * result;
  } else {
    const result = quirkyExponent(base, exp / 2);
    return result * result;
  }
}
// console.log(quirkyExponent(3,3));

function fibonacci(n) {
  if (n === 1) {
    return [0];
  } else if (n === 2) {
    return [0, 1];
  } else {
    const lastFib = fibonacci(n-1);
    return lastFib.concat(lastFib[lastFib.length - 1] + lastFib[lastFib.length - 2]);
  }
}
// console.log(fibonacci(6));

// receives sorted array
function bsearch(arr, target) {
  if (!arr.includes(target)) {
    return -1;
  }
  const midPoint = arr.length / 2;
  if (target === midPoint) {
    return midPoint;
  } else if (target < midPoint) {
    bsearch(arr.slice(0, midPoint), target);
  } else {
    bsearch(arr.slice(midPoint), target);
  }
}


// returns sorted copy of array
function mergesort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const midPoint = arr.length / 2;

  const left = mergesort(arr.slice(0, midPoint));
  const right = mergesort(arr.slice(midPoint));

  return merge(left, right);
}

function merge(left, right) {
  const sortSides = [];


  while (left.length > 0 && right.length > 0) {
    if (right[0] < left[0]) {
      sortSides.push(right.shift());
    } else {
      sortSides.push(left.shift());
    }
  }
  if (left.length === 0) {
    return sortSides.concat(right);
  } else if (right.length === 0) {
    return sortSides.concat(left);
  }
  return sortSides;
}

console.log(mergesort([2, 3, 1, 4, 9, 7, 1, 8]));

function subsets(array) {

}
