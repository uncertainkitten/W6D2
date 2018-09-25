class View {
  constructor(game, $el) {
    this.setupBoard();
    this.game = game;
    this.board = $el.html(this.setupBoard());
    this.bindEvents();
  }

  bindEvents() {
    const $listItems = $("li");
    $listItems.on("click", e => {
      const currentTarget = e.currentTarget;
      const $currentTarget = $(currentTarget);
      this.makeMove($currentTarget);
    });
  }

  makeMove($square) {

    let id = $square.attr('id');

    let cell = id.split("");

    try {
      $(`#${id}`).text(`${this.game.currentPlayer}`);
      this.game.playMove([cell[1], cell[3]]);
      $(`#${id}`).addClass("mark");
    }
    catch(err) {
      alert("Invalid Move! Try Again!");
    }

    if (this.game.isOver()) {
      let $winrar = $("#winrar");
      if (this.game.winner() === null) {
        $winrar.text(`It's a draw!?`);
      } else {
      $winrar.text(`You win, ${this.game.winner()}!!!!111`);
      }
      const $listItems = $("li");
      $listItems.off("click");
    }

  }

  setupBoard() {
    const $grid = $('<ul></ul>');
    $grid.addClass('grid');

    let $square;

    for (let r = 0; r <= 2; r++) {
      for (let c = 0; c <= 2; c++){
        $square = $('<li></li>');
        $square.addClass("square");
        $square.attr('id', `r${r}c${c}`);
        $grid.append($square);
      }
    }

    return $grid;

  }
}

module.exports = View;
