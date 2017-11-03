// class TowersOfHanoi {
//   run() {
//     // until all disks on one tower (that is not starting tower)
//       // until valid move,
              // get disk move
//       // make disk move

//   }
// }

const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Game {
  constructor() {
    this.board = [
      [3, 2, 1],
      [],
      []
    ];
  }
  promptMove(callback) {
    console.log(this.board);
    reader.question("Select a tower to move a disk from: ", (from) => {
      reader.question("Select which tower to move the disk to: ", (to) => {
        callback.bind(this)(parseInt(from), parseInt(to));
      });
    });
  }
  isValidMove(from, to) {
    let fromDisk = this.board[from].length - 1;
    let toDisk = this.board[to].length - 1;
    if (this.board[from][fromDisk]) {
      if (!this.board[to][toDisk] ||
      this.board[from][fromDisk] < this.board[to][toDisk] ) {
        this.board[to].push(this.board[from].pop());
      }
    } else {
      console.log("Invalid move!");
    }
  }
  // move(from, to) {
  //   if (game.isValidMove(from, to)) {
  //
  //   }
  // }
  gameOver() {
    return this.board[1].length === 3 || this.board[2].length === 3;
  }
  run() {
    console.log(this.gameOver());
    while (!this.gameOver()) {
      this.promptMove(this.isValidMove);
      console.log(this.board);
    }
    reader.close();
  }
}

const game = new Game;
//
game.run();
