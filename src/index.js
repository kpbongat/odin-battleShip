import "./style.css";
import Player from "./Player.js";
import DOM from "./DOM";
import Ship from "./Ship.js";
import GameController from "./GameController.js";
const playerOne = new Player();
placeShips(playerOne, 1);
DOM.initializeBoard(playerOne, 1);
const playerTwo = new Player();

placeShips(playerTwo, 2);
DOM.initializeBoard(playerTwo, 2);
function placeShips(player, id) {
  const ships = [
    new Ship(1),
    new Ship(1),
    new Ship(1),
    new Ship(1),
    new Ship(2),
    new Ship(2),
    new Ship(2),
    new Ship(3),
    new Ship(3),
    new Ship(4),
  ];
  for (let ship of ships) {
    for (let i = 0; i < ship.length; i++) {
      let x;
      let y;
      if (id === 2) {
        [x, y] = GameController.getRandomMove();
      } else {
        const coords = prompt(
          `Placing ship length ${ship.length} ${i + 1}/${ship.length}`
        );
        [x, y] = coords.split(",");
      }

      player.gameboard.place(ship, [x, y]);
    }
  }
}
