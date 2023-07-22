const gameboard = document.querySelector(".gameboard");

const Gameboard = (() => {
  const gameboard = ["x", "x", "x", "x", "x", "x", "x", "x", "x"];
  const players = ["player1", "player2"];
  const currentPlayer = players[0];
  const toggleCurrentPlayer = () => {
    currentPlayer === "player1" ? "player2" : "player1";
  };
  const resetGameboard = () => {};

  return { gameboard, currentPlayer, toggleCurrentPlayer, resetGameboard };
})();

const Player = (name, sign) => {
  const play = () => {};
  return { name, sign, play };
};

const player1 = Player("Tyna", "X");
const player2 = Player("Rek", "O");

Gameboard.gameboard.forEach((box, id) => {
  const boxElement = document.createElement("div");
  boxElement.innerHTML = box;
  boxElement.className = "box";
  boxElement.id = id;
  gameboard.append(boxElement);
});
