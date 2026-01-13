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

  function checkCurrentRow(marker, row) {
    let positives = 0;

    for (let i = 0; i < 3; i++) {
      if (gameboard[row][i] === marker) {
        positives++;
      }
    }
    if (positives === 3) {
      gameOver();
    }
  }

  function checkDiagonals(marker) {
    let positives = 0;

    if (
      gameboard[0][0] === marker &&
      gameboard[1][1] === marker &&
      gameboard[2][2] === marker
    ) {
      positives = 3;
    } else if (
      gameboard[0][2] === marker &&
      gameboard[1][1] === marker &&
      gameboard[2][0] === marker
    ) {
      positives = 3;
    }
    if (positives === 3) {
      gameOver();
    }
  }

  function checkStatus(marker, row, col) {
    if (turns > 4) {
      checkCurrentCol(marker, col);
      checkCurrentRow(marker, row);
      checkDiagonals(marker);
    }
  }

  function setMarker(marker, row, col) {
    if (gameboard[row][col] === undefined) {
      gameboard[row][col] = marker;
      incrementTurn();
      checkStatus(marker, row, col);
    }
  }
})();
