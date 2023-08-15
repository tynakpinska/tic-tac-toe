const gameboardElement = document.querySelector(".gameboard");
const playersElements = document.querySelectorAll(".player");
const resultElement = document.querySelector(".result");
const resetButtonElement = document.querySelector(".resetButton");

const Player = (name, sign) => {
  const play = id => Gameboard.updateGameboard(id, sign);
  return { name, sign, play };
};

const player1 = Player("Tyna", "X");
const player2 = Player("Rek", "O");

playersElements[0].innerHTML = `${player1.name} - ${player1.sign}`;
playersElements[1].innerHTML = `${player2.name} - ${player2.sign}`;

const Gameboard = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = player1;
  playersElements[0].classList.add("current");

  const buildGameboard = () => {
    gameboard.forEach((box, id) => {
      const boxElement = document.createElement("div");
      boxElement.innerHTML = box;
      boxElement.className = "box";
      boxElement.id = id;
      gameboardElement.append(boxElement);
      if (box === "") {
        boxElement.addEventListener("click", () => currentPlayer.play(id));
      }
    });
  };

  const checkIfWin = () => {
    if (
      (gameboard[0] === gameboard[1] &&
        gameboard[1] === gameboard[2] &&
        gameboard[2] !== "") ||
      (gameboard[3] === gameboard[4] &&
        gameboard[4] === gameboard[5] &&
        gameboard[5] !== "") ||
      (gameboard[6] === gameboard[7] &&
        gameboard[7] === gameboard[8] &&
        gameboard[8] !== "") ||
      (gameboard[0] === gameboard[3] &&
        gameboard[3] === gameboard[6] &&
        gameboard[6] !== "") ||
      (gameboard[1] === gameboard[4] &&
        gameboard[4] === gameboard[7] &&
        gameboard[7] !== "") ||
      (gameboard[2] === gameboard[5] &&
        gameboard[5] === gameboard[8] &&
        gameboard[8] !== "") ||
      (gameboard[0] === gameboard[4] &&
        gameboard[4] === gameboard[8] &&
        gameboard[8] !== "") ||
      (gameboard[2] === gameboard[4] &&
        gameboard[4] === gameboard[6] &&
        gameboard[6] !== "")
    ) {
      return true;
    } else {
      return false;
    }
  };

  const toggleCurrentPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    playersElements[0].classList.toggle("current");
    playersElements[1].classList.toggle("current");
  };

  const resetGameboard = () => {
    deleteGameboard();
    gameboard = ["", "", "", "", "", "", "", "", ""];
    resultElement.innerHTML = "";
    buildGameboard();
  };

  const deleteGameboard = () => {
    gameboardElement.innerHTML = "";
  };
  buildGameboard();

  const updateGameboard = (id, sign) => {
    gameboard[id] = sign;
    deleteGameboard();
    buildGameboard();
    const ifWin = checkIfWin();
    ifWin ? (resultElement.innerHTML = `${sign} wins!`) : toggleCurrentPlayer();
  };

  return {
    updateGameboard,
    resetGameboard,
  };
})();

resetButtonElement.addEventListener("click", Gameboard.resetGameboard);
