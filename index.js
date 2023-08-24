const boxElements = document.querySelectorAll(".box");
const playersElements = document.querySelectorAll(".player");
const playersInputs = document.querySelectorAll(".playerInput");
const gameModeButtonElement = document.querySelector(".gameModeButton");
const lineElement = document.querySelector(".line");
const resultElement = document.querySelector(".result");
const resetButtonElement = document.querySelector(".resetButton");

const Player = (name, sign) => {
  const play = id => Gameboard.updateGameboardArray(id, sign);
  return { name, sign, play };
};

let player1 = Player("Player1", "X");
let player2 = Player("Player2", "O");

playersInputs[0].value = player1.name;
playersInputs[1].value = player2.name;

playersInputs.forEach((player, id) =>
  player.addEventListener("change", e => {
    eval(`player${id + 1}`).name = e.target.value;
  })
);

const Gameboard = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = player1;
  let gameMode = "friend";
  playersElements[0].classList.add("current");
  const playing = id => event => currentPlayer.play(id);
  boxElements.forEach((box, id) =>
    box.addEventListener("click", playing(id), true)
  );

  const fillGameboardBoxes = () => {
    gameboard.forEach((box, id) => {
      boxElements[id].innerHTML = box;
    });
  };

  const checkIfWin = () => {
    if (
      gameboard[0] === gameboard[1] &&
      gameboard[1] === gameboard[2] &&
      gameboard[2] !== ""
    ) {
      lineElement.classList.add("horizontal", "top");
      return true;
    }

    if (
      gameboard[3] === gameboard[4] &&
      gameboard[4] === gameboard[5] &&
      gameboard[5] !== ""
    ) {
      lineElement.classList.add("horizontal", "center");
      return true;
    }

    if (
      gameboard[6] === gameboard[7] &&
      gameboard[7] === gameboard[8] &&
      gameboard[8] !== ""
    ) {
      lineElement.classList.add("horizontal", "bottom");
      return true;
    }

    if (
      gameboard[0] === gameboard[3] &&
      gameboard[3] === gameboard[6] &&
      gameboard[6] !== ""
    ) {
      lineElement.classList.add("vertical", "left");
      return true;
    }

    if (
      gameboard[1] === gameboard[4] &&
      gameboard[4] === gameboard[7] &&
      gameboard[7] !== ""
    ) {
      lineElement.classList.add("vertical", "middle");
      return true;
    }

    if (
      gameboard[2] === gameboard[5] &&
      gameboard[5] === gameboard[8] &&
      gameboard[8] !== ""
    ) {
      lineElement.classList.add("vertical", "right");
      return true;
    }

    if (
      gameboard[0] === gameboard[4] &&
      gameboard[4] === gameboard[8] &&
      gameboard[8] !== ""
    ) {
      lineElement.classList.add("skew", "from-left");
      return true;
    }

    if (
      gameboard[2] === gameboard[4] &&
      gameboard[4] === gameboard[6] &&
      gameboard[6] !== ""
    ) {
      lineElement.classList.add("skew", "from-right");
      return true;
    }

    return false;
  };

  const checkIfTie = () => {
    const isNotEmpty = box => box !== "";
    return gameboard.every(isNotEmpty);
  };

  const toggleGameMode = () => {
    gameMode = gameMode === "computer" ? "friend" : "computer";
    gameModeButtonElement.innerHTML = `Play with ${
      gameMode === "computer" ? "friend" : "computer"
    }`;
    if (gameMode === "computer") {
      player2.name = "Computer";
    }
    if (gameMode === "friend") {
      player2.name = "Player2";
    }
    playersInputs[1].value = player2.name;
  };

  const toggleCurrentPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    playersElements[0].classList.toggle("current");
    playersElements[1].classList.toggle("current");
  };

  const resetGameboard = () => {
    gameboard = ["", "", "", "", "", "", "", "", ""];
    resultElement.innerHTML = "";
    lineElement.classList = "line";
  };

  const updateGameboardArray = (id, sign) => {
    if (gameboard[id] === "" && resultElement.innerHTML === "") {
      gameboard[id] = sign;
      fillGameboardBoxes();
      if (checkIfWin()) {
        lineElement.classList.add("visible");
        resultElement.innerHTML = `${currentPlayer.name} (${sign}) wins!`;
        return;
      }
      if (checkIfTie()) {
        resultElement.innerHTML = `It's a tie!`;
        return;
      }
      toggleCurrentPlayer();
    }
  };

  return {
    fillGameboardBoxes,
    updateGameboardArray,
    resetGameboard,
    toggleGameMode,
  };
})();

Gameboard.fillGameboardBoxes();

gameModeButtonElement.addEventListener("click", Gameboard.toggleGameMode);

resetButtonElement.addEventListener("click", () => {
  Gameboard.resetGameboard();
  Gameboard.fillGameboardBoxes();
});
