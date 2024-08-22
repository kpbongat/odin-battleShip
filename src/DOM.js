import GameController from "./GameController";

export default class DOM {
  static initializeBoard(player, id) {
    const targetDiv = document.querySelector(`.main > .grid.player-${id}`);
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const square = document.createElement("div");
        const squareContent = player.gameboard.board[x][y];
        if (squareContent) {
          square.classList.add("ship");
        } else {
          square.classList.add("empty");
        }
        square.addEventListener("click", () => {
          if (GameController.currentPlayer === id) {
            if (player.gameboard.receiveAttack([x, y])) {
              square.classList.add("hit");
            } else {
              square.classList.add("miss");
            }
            this.refreshBoard(player, targetDiv);
            GameController.nextPlayer();
            this.displayCurrentPlayer();
          }
        });

        targetDiv.appendChild(square);
      }
    }
    this.displayCurrentPlayer();
  }

  static refreshBoard(player, board) {
    const targetDivs = board.querySelectorAll(`div`);
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const gridIndex = x * 10 + y;
        const square = targetDivs[gridIndex];
        const squareContent = player.gameboard.board[x][y];
        if (typeof squareContent === "object") {
          if (squareContent.isSunk()) {
            this.blockIllegalMoves(targetDivs, [
              ...this.getAdjacents(gridIndex),
              ...this.getCorners(gridIndex),
            ]);
          } else if (
            squareContent.hits > 0 &&
            square.classList.contains("hit")
          ) {
            this.blockIllegalMoves(targetDivs, [...this.getCorners(gridIndex)]);
          }
        }
      }
    }
  }
  static blockIllegalMoves(targetDivs, indices) {
    for (let i of indices) {
      if (!targetDivs[i].classList.contains("hit")) {
        targetDivs[i].classList.add("miss");
      }
    }
  }
  static getCorners(squareIndex) {
    return [
      squareIndex - 11,
      squareIndex - 9,
      squareIndex + 9,
      squareIndex + 11,
    ];
  }
  static getAdjacents(squareIndex) {
    return [
      squareIndex - 10,
      squareIndex - 1,
      squareIndex + 1,
      squareIndex + 10,
    ];
  }

  static displayCurrentPlayer() {
    const currentPlayer = document.querySelector(".current-player");
    currentPlayer.textContent = `Player ${GameController.currentPlayer} to move!`;
  }
}
