import Gameboard from "./Gameboard.js";
import Ship from "./Ship.js";

let gameboard;
beforeEach(() => {
  gameboard = new Gameboard();
});

test("Gameboard defined", () => {
  expect(gameboard).toBeTruthy();
});

test("Place ship to board", () => {
  const ship = new Ship(4);
  gameboard.place(ship, [0, 0]);
  expect(gameboard.board[0][0]).toEqual(ship);
});

test("Receive attack sucessfully", () => {
  const ship = new Ship(4);
  gameboard.place(ship, [0, 0]);
  gameboard.receiveAttack([0, 0]);
  expect(gameboard.board[0][0].hits).toBe(1);
});

test("Record sunken ships", () => {
  const ship = new Ship(4);
  gameboard.place(ship, [0, 0]);
  gameboard.place(ship, [0, 1]);
  gameboard.place(ship, [0, 2]);
  gameboard.place(ship, [0, 3]);
  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([0, 1]);
  gameboard.receiveAttack([0, 2]);
  gameboard.receiveAttack([0, 3]);
  expect(gameboard.sunkenShips).toBe(1);
});
