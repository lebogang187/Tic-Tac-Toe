const Gameboard = () => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
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
  };
};

const startButton = document
  .querySelector("#start-btn")
  .addEventListener("click", () => {
    alert("Start button works!");
  });
const restartButton = document
  .querySelector("#restart-btn")
  .addEventListener("click", () => {
    alert("Restart button woks!!!");
  });
