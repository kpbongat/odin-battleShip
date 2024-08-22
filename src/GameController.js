export default class GameController {
  static currentPlayer = 1;

  static nextPlayer() {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
  }
}
