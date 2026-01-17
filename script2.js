const startRestartBtn = document.querySelector(".start-restart-btn");
const player1Btn = document.querySelector(".player-1-btn");
const player2Btn = document.querySelector(".player-2-btn");
const resultsDisplay = document.querySelector(".results");

const game = function () {
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

  function Player(marker, name) {
    function getMarker() {
      return marker;
    }

    function getName() {
      return name;
    }

    function setMarker(marker, row, col) {
      if (gameboard[row][col] === undefined) {
        gameboard[row][col] = marker;
        displayMarker(row, col, marker);
        incrementTurn();
        checkStatus(marker, row, col, name);
      }
    }

    return {
      getMarker,
      setMarker,
      getName,
    };
  }

  const player1 = Player("x", "player 1");
  const player2 = Player("o", "player 2");

  let turns = 0;

  function incrementTurn() {
    turns++;
  }

  function checkCurrentCol(marker, col, player) {
    let positives = 0;

    for (let i = 0; i < 3; i++) {
      if (gameboard[i][col] === marker) {
        positives++;
      }
    }
    if (positives === 3) {
      gameOver(player);
    }
  }

  function checkCurrentRow(marker, row, player) {
    let positives = 0;

    for (let i = 0; i < 3; i++) {
      if (gameboard[row][i] === marker) {
        positives++;
      }
    }
    if (positives === 3) {
      gameOver(player);
    }
  }

  function checkDiagonals(marker, player) {
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
      gameOver(player);
    }
  }

  function checkStatus(marker, row, col, player) {
    if (turns > 4) {
      checkCurrentCol(marker, col, player);
      checkCurrentRow(marker, row, player);
      checkDiagonals(marker, player);
    }
  }

  function gameOver(player) {
    return console.log(`The WINNER is ${player.toUpperCase()}`);
  }

  const htmlGameboard = (function () {
    const cells = document.querySelectorAll(".cell");

    function getCellRow(cellIndex) {
      if (-1 < cellIndex && cellIndex < 3) {
        return 0;
      } else if (2 < cellIndex && cellIndex < 6) {
        return 1;
      } else {
        return 2;
      }
    }

    function getCellCol(cellIndex) {
      switch (cellIndex) {
        case 0:
        case 3:
        case 6:
          return 0;
          break;
        case 1:
        case 4:
        case 7:
          return 1;
          break;
        case 2:
        case 5:
        case 8:
          return 2;
          break;
        default:
          break;
      }
    }

    cells.forEach(function (cell, index) {
      cell.addEventListener("click", function (e) {
        let row = getCellRow(index);
        let col = getCellCol(index);
        if (turns % 2 === 0) {
          player1.setMarker(player1.getMarker(), row, col);
        } else {
          player2.setMarker(player2.getMarker(), row, col);
        }
      });
    });

    const board = [];

    for (let k = 0; k < cells.length; k++) {
      let cellCount = 0;
      for (let i = 0; i < 3; i++) {
        let column = [];

        for (let j = 0; j < 3; j++) {
          column[j] = cells[cellCount];
          cellCount++;
        }
        board[i] = column;
      }
    }

    // function clearTables() {
    //   gameboard.forEach(function (row) {
    //     row.forEach(function (col) {
    //       col = undefined;
    //     });
    //   });

    //   htmlGameboard.forEach(function (cell) {
    //     cell.removeChild(cell.firstChild);
    //   });
    // }

    return board;
  })();

  function clearTables() {
    gameboard.forEach(function (rowCells, row) {
      rowCells.forEach(function (col, colIndex) {
        gameboard[row][colIndex] = undefined;
      });
    });

    htmlGameboard.forEach(function (rowCells) {
      rowCells.forEach(function (cell) {
        if (cell.firstChild) {
          cell.removeChild(cell.firstChild);
        }
      });
    });
  }

  function displayMarker(row, col, marker) {
    switch (marker) {
      case "x":
        const crossImgElement = document.createElement("img");
        crossImgElement.setAttribute("src", "./assets/cross-marker.png");
        htmlGameboard[row][col].appendChild(crossImgElement);
        break;
      case "o":
        const circleImgElement = document.createElement("img");
        circleImgElement.setAttribute("src", "./assets/circle-marker.png");
        htmlGameboard[row][col].appendChild(circleImgElement);
      default:
        break;
    }
  }

  return {
    player1,
    player2,
    gameboard,
    htmlGameboard,
    displayMarker,
    clearTables,
  };
};

(function () {
  let restart = false;

  startRestartBtn.addEventListener("click", function () {
    let startGame = game();
    if (!restart) {
      restart = true;
    } else {
      startGame.clearTables();
    }
  });
})();

// let game1 = game();

// game.player2.setMarker("x", 0, 0);
// game.player1.setMarker("o", 1, 0);
// game.player2.setMarker("x", 0, 1);
// game.player1.setMarker("o", 2, 0);
// game.player2.setMarker("x", 0, 2);
