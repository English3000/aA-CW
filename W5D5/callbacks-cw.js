class Clock {
  constructor() {
    // 1. Create a Date object.
    this.date = new Date();
    // 2. Store the hours, minutes, and seconds.
    this.hours = this.date.getHours();
    this.minutes = this.date.getMinutes();
    this.seconds = this.date.getSeconds();
    // 3. Call printTime.
    this.printTime();
    // 4. Schedule the tick at 1 second intervals.
    setInterval(this._tick.bind(this), 1000);
  }

  printTime() {
    // Format the time in HH:MM:SS
    let hours = this.hours;
    let minutes = this.minutes;
    let seconds = this.seconds;
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (hours < 10) {
      hours = '0' + hours;
    }
    // Use console.log to print it.
    console.log(`${hours}:${minutes}:${seconds}`);
  }

  _tick() {
    // 1. Increment the time by one second.
    this.seconds++;
    if (this.seconds === 60) {
      this.seconds = 0;
      this.minutes++;
      if (this.minutes === 60) {
        this.minutes = 0;
        this.hours++;
        if (this.hours === 24) {
          this.hours = 0;
        }
      }
    }
    // 2. Call printTime.
    this.printTime();
  }
}

// const clock = new Clock();


const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, callback) {
  if (numsLeft > 0) {
    reader.question("Pick a number: ", (answer) => {
      sum += parseInt(answer);
      console.log(sum);
      numsLeft--;
      addNumbers(sum, numsLeft, callback);
    });
  } else {
    callback(sum);
    reader.close();
  }
}

// addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));

function absurdBubbleSort(arr, callback) {
  function outerBubbleSortLoop(madeAnySwaps) {
    if (madeAnySwaps) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    } else {
      callback(arr);
    }
  }
  outerBubbleSortLoop(true);
  // reader.close();
}

function askIfGreaterThan(el1, el2, callback) {
  reader.question(`Is ${el1} greater than ${el2}? `, (answer) => {
    if (answer[0].toLowerCase() === "y") {
      callback(true);
    } else {
      callback(false);
    }
  });
}
// askIfGreaterThan(2, 1, greater => console.log(greater));

function innerBubbleSortLoop(arr, i, madeAnySwaps, innerCallback) {
  if (i < arr.length - 1) {
    askIfGreaterThan(arr[i], arr[i +  1], (isGreaterThan) => {
      if (isGreaterThan) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        madeAnySwaps = true;
      }
      i++;
      innerBubbleSortLoop(arr, i, madeAnySwaps, innerCallback);
    });
  } else {
    innerCallback(madeAnySwaps);
    // console.log("In outer Bubble Sort!");
  }
}
// innerBubbleSortLoop([1,2,73,4], 0, false);

// absurdBubbleSort([3, 2, 1], function (arr) {
//   console.log("Sorted array: " + JSON.stringify(arr));
//   reader.close();
// });


Function.prototype.myBind = function(context) {
  // const that = this;
  return () => {
    this.apply(context);
    // that.apply(context);
  };
};


// class Lamp {
//   constructor() {
//     this.name = "a lamp";
//   }
// }
//
// const turnOn = function() {
//    console.log("Turning on " + this.name);
// }
//
// const lamp = new Lamp();
//
// turnOn(); // should not work the way we want it to
//
// const boundTurnOn = turnOn.bind(lamp);
// const myBoundTurnOn = turnOn.myBind(lamp);
//
// boundTurnOn(); // should say "Turning on a lamp"
// myBoundTurnOn(); // should say "Turning on a lamp"
