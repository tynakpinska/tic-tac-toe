const gameboardElement = document.querySelector(".gameboard");
const currentPlayerElement = document.querySelector(".currentPlayer");

const Player = (name, sign) => {
  const play = id => Gameboard.updateGameboard(id, sign);
  return { name, sign, play };
};

const player1 = Player("Tyna", "X");
const player2 = Player("Rek", "O");

const Gameboard = (() => {
  const gameboard = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = player1;
  currentPlayerElement.innerHTML = `${currentPlayer.name} - ${currentPlayer.sign}`;
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
  const toggleCurrentPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    currentPlayerElement.innerHTML = `${currentPlayer.name} - ${currentPlayer.sign}`;
  };
  const updateGameboard = (id, sign) => {
    gameboard[id] = sign;
    resetGameboard();
    buildGameboard();
    toggleCurrentPlayer();
  };
  const resetGameboard = () => (gameboardElement.innerHTML = "");
  buildGameboard();

  return {
    updateGameboard,
  };
})();
