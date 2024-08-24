export default class GameController {
  static currentPlayer = 1;

  static nextPlayer() {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
  }

  static getRandomMove() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    return [x, y];
  }

  static checkGameEnd(player) {
    if (player.gameboard.sunkenShips === 10) {
      return player;
    }

    return false;
  }
}
