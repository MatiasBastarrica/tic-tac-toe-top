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

  return {
    player1,
    player2,
    gameboard,
    htmlGameboard,
    displayMarker,
  };
})();

game.player2.setMarker("x", 0, 0);
game.player1.setMarker("o", 1, 0);
game.player2.setMarker("x", 0, 1);
game.player1.setMarker("o", 2, 0);
game.player2.setMarker("x", 0, 2);
