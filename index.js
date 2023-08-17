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
    /*   if (
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
      // add displaying line at accurate position
      return true;
    } else {
      return false;
    } */

    if (
      gameboard[0] === gameboard[1] &&
      gameboard[1] === gameboard[2] &&
      gameboard[2] !== ""
    ) {
      lineElement.style.width = "300px";
      lineElement.style.height = "5px";
      lineElement.style.top = "15%";
      return true;
    }

    if (
      gameboard[3] === gameboard[4] &&
      gameboard[4] === gameboard[5] &&
      gameboard[5] !== ""
    ) {
      lineElement.style.width = "300px";
      lineElement.style.height = "5px";
      lineElement.style.top = "50%";
      return true;
    }

    if (
      gameboard[6] === gameboard[7] &&
      gameboard[7] === gameboard[8] &&
      gameboard[8] !== ""
    ) {
      console.log("to");
      lineElement.style.width = "300px";
      lineElement.style.height = "5px";
      lineElement.style.top = "83%";
      return true;
    }

    if (
      gameboard[0] === gameboard[3] &&
      gameboard[3] === gameboard[6] &&
      gameboard[6] !== ""
    ) {
      lineElement.style.width = "5px";
      lineElement.style.height = "300px";
      lineElement.style.left = "15%";
      return true;
    }

    if (
      gameboard[1] === gameboard[4] &&
      gameboard[4] === gameboard[7] &&
      gameboard[7] !== ""
    ) {
      lineElement.style.width = "5px";
      lineElement.style.height = "300px";
      lineElement.style.left = "50%";
      return true;
    }

    if (
      gameboard[2] === gameboard[5] &&
      gameboard[5] === gameboard[8] &&
      gameboard[8] !== ""
    ) {
      lineElement.style.width = "5px";
      lineElement.style.height = "300px";
      lineElement.style.left = "83%";
      return true;
    }

    if (
      gameboard[0] === gameboard[4] &&
      gameboard[4] === gameboard[8] &&
      gameboard[8] !== ""
    ) {
      lineElement.style.width = "5px";
      lineElement.style.height = "350px";
      lineElement.style.top = "-5%";
      lineElement.style.left = "52%";
      lineElement.style.transform = "rotate(-45deg)";
      return true;
    }

    if (
      gameboard[2] === gameboard[4] &&
      gameboard[4] === gameboard[6] &&
      gameboard[6] !== ""
    ) {
      lineElement.style.width = "5px";
      lineElement.style.height = "350px";
      lineElement.style.top = "-5%";
      lineElement.style.left = "47%";
      lineElement.style.transform = "rotate(45deg)";
      return true;
    }

    return false;
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
    lineElement.style.width = "0";
    lineElement.style.height = "0";
    lineElement.style.left = "0";
    lineElement.style.top = "0";
    lineElement.style.transform = "rotate(0)";
    lineElement.style.display = "none";
  };

  const updateGameboardArray = (id, sign) => {
    if (gameboard[id] === "" && resultElement.innerHTML === "") {
      gameboard[id] = sign;
      fillGameboard();
      if (checkIfWin()) {
        resultElement.innerHTML = `${currentPlayer.name} (${sign}) wins!`;
        lineElement.style.display = "block";
      } else if (checkIfTie()) resultElement.innerHTML = `It's a tie!`;
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
