const Gameboard = () => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  const render = () => {
    let boardHTML = "";
    gameBoard.forEach((square, index) => {
      boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
    });
    document.querySelector("#display-board").innerHTML = boardHTML;
    const squares = document.querySelector(".square");
    squares.forEach((square) => {
      square.addEventListener("click", Game.handleClick);
    });
  };
  return {
    render,
  };
};

const createPlayer = (name, mark) => {
  return { name, mark };
};

const Game = () => {
  let players = [];
  let currentPlayer;
  let gameOver;

  const startGame = () => {
    players = [
      createPlayer(document.querySelector("#player1").value, "X"),
      createPlayer(document.querySelector("#player2").value, "O"),
    ];
    currentPlayer = 0;
    gameOver = false;
    Gameboard.render();
  };
  const handleClick = (event) => {
    let index = event.target.id;
    prompt(index);
  };

  return {
    startGame,
    handleClick,
  };
};

const startButton = document
  .querySelector("#start-btn")
  .addEventListener("click", () => {
    Game.startGame();
  });
const restartButton = document
  .querySelector("#restart-btn")
  .addEventListener("click", () => {
    alert("Restart button woks!!!");
  });
