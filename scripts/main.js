const displayController = (() => {
  const renderMessage = (message) => {
    document.querySelector("#display-message").innerHTML = message;
  };
  return {
    renderMessage,
  };
})();

const GameBoard = (() => {
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
})();

// Factory responsible for creating a player
const createPlayer = (name, mark) => {
  return { name, mark };
};

// controls the logic of the game
const Game = (() => {
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
    if (gameOver) {
      return;
    }

    let index = parseInt(event.target.id.split("-")[1]);

    if (GameBoard.getGameBoard()[index] !== "") {
      return;
    }
    GameBoard.update(index, players[currentPlayer].mark);

    if (CheckForWin(GameBoard.getGameBoard(), players[currentPlayer].mark)) {
      gameOver = true;
      displayController.renderMessage(`${players[currentPlayer].name} Won!`);
    } else if (checkForTie(GameBoard.getGameBoard())) {
      gameOver = true;
      displayController.renderMessage("It's a Tie!");
    }

    // Switches the players values between "X" and "O"
    switch (currentPlayer) {
      case 0:
        currentPlayer = 1;
        break;
      case 1:
        currentPlayer = 0;
        break;
      default:
        currentPlayer = 0;
        break;
    }
  };

  // Restart/clear the GameBoard
  const restart = () => {
    for (let i = 0; i < 9; i++) {
      GameBoard.update(i, "");
      document.querySelector("#display-message").innerHTML = "";
      gameOver = false;
    }
    GameBoard.render();
  };

  return {
    start,
    handleClick,
    restart,
  };
})();

// This function checks for a Win
function CheckForWin(board) {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

// This Function Checks for a Tie
function checkForTie(board) {
  return board.every((cell) => cell !== "");
}

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
