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
        square.addEventListener(
          "click",
          () => {
            if (GameController.currentPlayer === id) {
              if (player.gameboard.receiveAttack([x, y])) {
                square.classList.add("hit");
              } else {
                square.classList.add("miss");
              }
              this.refreshBoard(player, targetDiv);
              if (GameController.checkGameEnd(player)) {
                this.endGame();
              } else {
                GameController.nextPlayer();
                this.displayCurrentPlayer();
                if (GameController.currentPlayer === 2) {
                  while (true) {
                    const [cpuX, cpuY] = GameController.getRandomMove();
                    const randomSquare = document.querySelectorAll(
                      `.main > .grid.player-2 > div`
                    )[cpuX * 10 + cpuY];
                    if (
                      !randomSquare.classList.contains("hit") &&
                      !randomSquare.classList.contains("miss")
                    ) {
                      randomSquare.click();
                      break;
                    }
                  }
                }
              }
            }
          },
          { once: true }
        );

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
              ...this.getAdjacents([x, y]),
              ...this.getCorners([x, y]),
            ]);
          } else if (
            squareContent.hits > 0 &&
            square.classList.contains("hit")
          ) {
            this.blockIllegalMoves(targetDivs, [...this.getCorners([x, y])]);
          }
        }
      }
    }
  }
  static blockIllegalMoves(targetDivs, indices) {
    for (let i of indices) {
      const [x, y] = i;
      const gridIndex = x * 10 + y;
      if (!targetDivs[gridIndex].classList.contains("hit")) {
        targetDivs[gridIndex].classList.add("miss");
      }
    }
  }
  static getCorners([x, y]) {
    const corners = [];
    corners.push([x - 1, y - 1]);
    corners.push([x - 1, y + 1]);
    corners.push([x + 1, y - 1]);
    corners.push([x + 1, y + 1]);
    return corners.filter((i) => {
      const [x, y] = i;
      if (x < 0 || x > 9 || y < 0 || y > 9) {
        return false;
      }
      return true;
    });
  }
  static getAdjacents([x, y]) {
    const adjacents = [];
    adjacents.push([x - 1, y]);
    adjacents.push([x + 1, y]);
    adjacents.push([x, y - 1]);
    adjacents.push([x, y + 1]);
    return adjacents.filter((i) => {
      const [x, y] = i;
      if (x < 0 || x > 9 || y < 0 || y > 9) {
        return false;
      }
      return true;
    });
  }

  static displayCurrentPlayer() {
    const currentPlayer = document.querySelector(".current-player");
    currentPlayer.textContent = `Player ${GameController.currentPlayer} to move!`;
  }

  static endGame() {
    const currentPlayer = document.querySelector(".current-player");
    currentPlayer.textContent = `Player ${GameController.currentPlayer} wins!`;
  }
}
