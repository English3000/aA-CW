class HanoiView{
  constructor(game, rootEl){
    this.game = game;
    this.rootEl = rootEl;
    this.setupTowers();
    let firstClick;
    $('ul.tower').on("click", (event) => {
      console.log(firstClick);
      if (firstClick === undefined) {
        firstClick = parseInt($(event.currentTarget).data("num"));
        // console.log($(event.currentTarget).data("num"));
      } else {
        this.game.move(firstClick, parseInt($(event.currentTarget).data("num")));
        firstClick = undefined;
        this.render();
      }
    });
    this.render();
  }
  setupTowers() {
    for (let i = 0; i < 3; i++) {
      $('.hanoi').append($(`<ul class="tower" data-num="${i}"></ul>`));
    }
    const $firstTower = $('.tower').eq(0);
    for (let i = 0; i < 3; i++) {
      $firstTower.append($(`<li class="disc" id ='id${i}'></li>`));
    }
  }
  render() {

  }
  clickTower() {
  }
}

module.exports = HanoiView;
