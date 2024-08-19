import Player from "./Player.js";

let player;
beforeEach(() => {
  player = new Player();
});

test("Player defined", () => {
  expect(player).toBeTruthy();
});

test("Gameboard created", () => {
  expect(player.gameboard).toBeTruthy();
});
