export default class DOM {
  static renderBoard(player, id) {
    const oldDiv = document.querySelector(`.main > .grid.player-${id}`);
    const newDiv = oldDiv.cloneNode();
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const square = document.createElement("div");
        const squareContent = player.gameboard.board[x][y];
        if (squareContent) {
          square.classList.add("ship");
        } else {
          square.classList.add("empty");
        }

        newDiv.appendChild(square);
      }
    }
    oldDiv.replaceWith(newDiv);
  }
}
