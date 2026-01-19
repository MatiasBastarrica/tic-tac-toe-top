const startRestartBtn = document.querySelector(".start-restart-btn");
const player1Display = document.querySelector(".player-1__name");
const player2Display = document.querySelector(".player-2__name");
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

    function changeName(newName) {
      name = newName;
    }

    function setMarker(marker, row, col) {
      if (gameboard[row][col] === undefined && !finished && started) {
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
      changeName,
    };
  }

  const player1 = Player("x", player1Display.textContent);
  const player2 = Player("o", player2Display.textContent);

  let turns = 0;
  let finished = false;
  let started = false;

  function startOver() {
    finished = false;
    turns = 0;
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
      return true;
    } else {
      return false;
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
      return true;
    } else {
      return false;
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
      return true;
    } else {
      return false;
    }
  }

  function checkStatus(marker, row, col, player) {
    if (turns > 4) {
      if (checkCurrentCol(marker, col, player)) {
        return;
      } else if (checkCurrentRow(marker, row, player)) {
        return;
      } else if (checkDiagonals(marker, player)) {
        return;
      }
    }
  }

  function gameOver(player) {
    finished = true;
    resultsDisplay.textContent = `The WINNER is ${player.toUpperCase()}`;
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

    return board;
  })();

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

  const playerBtns = (function () {
    function handleRename(e) {
      if (e.target.classList.contains("player-1-btn")) {
        let newName = prompt(`Write a name for ${player1.getName()}`);
        player1.changeName(newName);
        player1Display.textContent = newName;
      } else if (e.target.classList.contains("player-2-btn")) {
        let newName = prompt(`Write a name for ${player1.getName()}`);
        player2.changeName(newName);
        player2Display.textContent = newName;
      }
    }
    player1Btn.addEventListener("click", handleRename);

    player2Btn.addEventListener("click", handleRename);
  })();

  function start() {
    started = true;
  }

  return {
    player1,
    player2,
    gameboard,
    htmlGameboard,
    displayMarker,
    playerBtns,
    start,
    startOver,
  };
};

(function () {
  let games = 0;

  let startGame = game();

  startRestartBtn.addEventListener("click", function () {
    if (games === 0) {
      startGame.start();
      games++;
    } else {
      startGame.startOver();
    }
  });
})();
