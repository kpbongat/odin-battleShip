import GameController from "./GameController";
import Gameboard from "./Gameboard";

test("Change current player", () => {
  GameController.nextPlayer();
  expect(GameController.currentPlayer).toBe(2);
  GameController.nextPlayer();
  expect(GameController.currentPlayer).toBe(1);
});

test("Get random legal move", () => {
  expect(
    GameController.getRandomMove(new Gameboard())[0]
  ).toBeGreaterThanOrEqual(0);
  expect(GameController.getRandomMove(new Gameboard())[1]).toBeLessThan(10);
});
