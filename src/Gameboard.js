export default class Gameboard {
  board = [];
  constructor() {
    for (let x = 0; x < 10; x++) {
      this.board.push([]);
    }
  }

  place(ship, [x, y]) {
    this.board[x][y] = ship;
  }
}
