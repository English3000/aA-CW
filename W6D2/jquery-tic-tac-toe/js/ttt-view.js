class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el; //display grid
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    $(".grid").on("click",".square",(event)=>{
      // debugger
      // console.log($(event.currentTarget).data("id"));
      $(event.currentTarget).addClass("white");
      this.makeMove($(event.currentTarget));
    });
  }

  makeMove($square) {
    $square.text(this.game.currentPlayer);
    this.game.playMove($square.data("id").split(','));
    if (this.game.winner()) {
      // this.game.swapTurn();
      $('.ttt').append($(`<h2>Winner: ${this.game.winner()}</h2>`));
      $('.grid').off("click",".square");
    }
  }

  setupBoard() {
    let grid = $('<ul class="grid"></ul>');
    for (var i = 0; i < 9; i++) {
      let row = Math.floor(i / 3);
      let column = i % 3;
      const pos = `${row},${column}`;
      grid.append($(`<li class="square" data-id="${pos}"></li>`));
    }
    this.$el.append(grid);
  }
}

module.exports = View;
