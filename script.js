const game = (function () {
  const gameboard = (function () {
    const board = [];
    for (let i = 0; i < 3; i++) {
      let column = [];
      for (let j = 0; j < 3; j++) {
        column[j] = undefined;
      }
      board[i] = column;
    }
    return board;
  })();

  function Player(marker) {
    function getMarker() {
      return marker;
    }

    return {
      getMarker,
    };
  }

  const player1 = Player("x");
  const player2 = Player("o");

  let turns = 0;

  function incrementTurn() {
    turns++;
  }

  function checkCurrentCol(marker, col) {
    let positives = 0;

    for (let i = 0; i < 3; i++) {
      if (gameboard[i][col] === marker) {
        positives++;
      }
    }
    if (positives === 3) {
      gameOver();
    }
  }
})();
