export default class Gameboard {
  sunkenShips = 0;
  board = [];
  constructor() {
    for (let x = 0; x < 10; x++) {
      this.board.push([]);
    }
  }

  place(ship, [x, y]) {
    this.board[x][y] = ship;
  }

  receiveAttack([x, y]) {
    const ship = this.board[x][y];
    if (ship) {
      ship.hit();
      if (ship.isSunk()) {
        this.sunkenShips += 1;
      }
    }
  }
}
