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

playersInputs.forEach((playerInput, id) =>
  playerInput.addEventListener("change", e => {
    eval(`player${id + 1}`).name = e.target.value;
  })
);

const Gameboard = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = player1;
  let gameMode = "friend";

  playersElements[0].classList.add("current");

  const playing = id => currentPlayer.play(id);

  boxElements.forEach((box, id) =>
    box.addEventListener("click", e => {
      if (gameboard[id] === "" && resultElement.innerHTML === "") playing(id);
    })
  );

  const checkIfWin = () => {
    const winOptions = {
      horizontal: {
        top:
          gameboard[0] === gameboard[1] &&
          gameboard[1] === gameboard[2] &&
          gameboard[2] !== "",
        center:
          gameboard[3] === gameboard[4] &&
          gameboard[4] === gameboard[5] &&
          gameboard[5] !== "",
        bottom:
          gameboard[6] === gameboard[7] &&
          gameboard[7] === gameboard[8] &&
          gameboard[8] !== "",
      },
      vertical: {
        left:
          gameboard[0] === gameboard[3] &&
          gameboard[3] === gameboard[6] &&
          gameboard[6] !== "",
        middle:
          gameboard[1] === gameboard[4] &&
          gameboard[4] === gameboard[7] &&
          gameboard[7] !== "",
        right:
          gameboard[2] === gameboard[5] &&
          gameboard[5] === gameboard[8] &&
          gameboard[8] !== "",
      },
      skew: {
        fromLeft:
          gameboard[0] === gameboard[4] &&
          gameboard[4] === gameboard[8] &&
          gameboard[8] !== "",
        fromRight:
          gameboard[2] === gameboard[4] &&
          gameboard[4] === gameboard[6] &&
          gameboard[6] !== "",
      },
    };
    if (winOptions.horizontal.top) {
      lineElement.classList.add("horizontal", "top");
      return true;
    }

    if (winOptions.horizontal.center) {
      lineElement.classList.add("horizontal", "center");
      return true;
    }

    if (winOptions.horizontal.bottom) {
      lineElement.classList.add("horizontal", "bottom");
      return true;
    }

    if (winOptions.vertical.left) {
      lineElement.classList.add("vertical", "left");

      return true;
    }

    if (winOptions.vertical.middle) {
      lineElement.classList.add("vertical", "middle");
      return true;
    }

    if (winOptions.vertical.right) {
      lineElement.classList.add("vertical", "right");
      return true;
    }

    if (winOptions.skew.fromLeft) {
      lineElement.classList.add("skew", "from-left");
      return true;
    }

    if (winOptions.skew.fromRight) {
      lineElement.classList.add("skew", "from-right");
      return true;
    }

    return false;
  };

  const checkIfTie = () => {
    const isNotEmpty = box => box !== "";
    return gameboard.every(isNotEmpty);
  };

  const handleWin = sign => {
    lineElement.classList.add("visible");
    resultElement.innerHTML = `${currentPlayer.name} (${sign}) wins!`;
  };

  const handleTie = () => {
    resultElement.innerHTML = `It's a tie!`;
  };

  const generateComputerMove = () => {
    let id;
    while (gameboard[id] !== "") {
      id = Math.floor(Math.random() * 8);
    }
    return id;
  };

  const fillGameboardBoxes = () => {
    gameboard.forEach((box, id) => {
      boxElements[id].innerHTML = box;
    });
  };

  const toggleGameMode = () => {
    gameMode = gameMode === "computer" ? "friend" : "computer";
    if (gameMode === "computer") {
      player2.name = "Computer";
      gameModeButtonElement.innerHTML = "Play with friend";
    }
    if (gameMode === "friend") {
      player2.name = "Player2";
      gameModeButtonElement.innerHTML = "Play with computer";
    }
    playersInputs[1].value = player2.name;
    if (!Array.from(playersElements[0].classList).includes("current")) {
      playersElements[0].classList.toggle("current");
      playersElements[1].classList.toggle("current");
    }
    resetGameboard();
    fillGameboardBoxes();
  };

  const toggleCurrentPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    playersElements[0].classList.toggle("current");
    playersElements[1].classList.toggle("current");
  };

  const resetGameboard = () => {
    gameboard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = player1;
    resultElement.innerHTML = "";
    lineElement.classList = "line";
  };

  const updateGameboardArray = (id, sign) => {
    gameboard[id] = sign;
    fillGameboardBoxes();
    if (checkIfWin()) return handleWin(sign);
    if (checkIfTie()) return handleTie();
    toggleCurrentPlayer();
    if (currentPlayer.name === "Computer") {
      setTimeout(() => {
        const id = generateComputerMove();
        if (gameboard[id] === "" && resultElement.innerHTML === "") playing(id);
      }, 1000);
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
