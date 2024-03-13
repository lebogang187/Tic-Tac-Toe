const GameBoard = () => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  const render = () => {
    let boardHTML = "";
    gameBoard.forEach((square, index) => {
      boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
    });
    document.querySelector("#display-board").innerHTML = boardHTML;
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", Game.handleClick);
    });
  };

  const update = (index, value) => {
    gameBoard[index] = value;
    render();
  };

  // This function's purpose is to return gameboard so that it cant be re-used
  const getGameBoard = () => gameBoard;

  return {
    render,
    update,
    getGameBoard,
  };
};

// Factory responsible for creating a player
const createPlayer = (name, mark) => {
  return { name, mark };
};

// controls the logic of the game
const Game = () => {
  let players = [];
  let currentPlayer;
  let gameOver;

  const start = () => {
    players = [
      createPlayer(document.querySelector("#player1").value, "X"),
      createPlayer(document.querySelector("#player2").value, "O"),
    ];
    currentPlayer = 0;
    gameOver = false;
    GameBoard.render();
  };

  const handleClick = (event) => {
    let index = parseInt(event.target.id.split("-")[1]);

    if (GameBoard.getGameBoard()[index] !== "") {
      return;
    }
    GameBoard.update(index, players[currentPlayer].mark);

    switch (currentPlayer) {
      case 0:
        currentPlayer == 1;
        break;
      case 1:
        currentPlayer == 0;
        break;
    }
  };

  const restart = () => {
    for (let i = 0; i < 9; i++) {
      GameBoard.update(i, "");
    }
    GameBoard.render();
  };

  return {
    start,
    handleClick,
    restart,
  };
};

const startButton = document
  .querySelector("#start-btn")
  .addEventListener("click", () => {
    Game.start();
  });

const restartButton = document
  .querySelector("#restart-btn")
  .addEventListener("click", () => {
    Game.restart();
  });
