const boxElements = document.querySelectorAll(".box");
const playersElements = document.querySelectorAll(".player");
const playersInputs = document.querySelectorAll(".playerInput");
const lineElement = document.querySelector(".line");
const resultElement = document.querySelector(".result");
const resetButtonElement = document.querySelector(".resetButton");

const Player = (name, sign) => {
  const play = id => Gameboard.updateGameboardArray(id, sign);
  return { name, sign, play };
};

let player1 = Player("Tyna", "X");
let player2 = Player("Rek", "O");

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
  playersElements[0].classList.add("current");
  const playing = id => event => currentPlayer.play(id);
  boxElements.forEach((box, id) =>
    box.addEventListener("click", playing(id), true)
  );

  const fillGameboard = () => {
    gameboard.forEach((box, id) => {
      boxElements[id].innerHTML = box;
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
      lineElement.style.display = "block";
      // add displaying line at accurate position
      return true;
    } else {
      return false;
    }
  };

  const checkIfTie = () => {
    const isNotEmpty = box => box !== "";
    return gameboard.every(isNotEmpty);
  };

  const toggleCurrentPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    playersElements[0].classList.toggle("current");
    playersElements[1].classList.toggle("current");
  };

  const resetGameboard = () => {
    gameboard = ["", "", "", "", "", "", "", "", ""];
    resultElement.innerHTML = "";
    lineElement.style.display = "none";
  };

  const updateGameboardArray = (id, sign) => {
    if (gameboard[id] === "" && resultElement.innerHTML === "") {
      gameboard[id] = sign;
      fillGameboard();
      if (checkIfWin())
        resultElement.innerHTML = `${currentPlayer.name} (${sign}) wins!`;
      else if (checkIfTie()) resultElement.innerHTML = `It's a tie!`;
      else toggleCurrentPlayer();
    }
  };

  return {
    fillGameboard,
    updateGameboardArray,
    resetGameboard,
  };
})();

Gameboard.fillGameboard();

resetButtonElement.addEventListener("click", () => {
  Gameboard.resetGameboard();
  Gameboard.fillGameboard();
});
