import GameController from "./GameController";

test("Change current player", () => {
  GameController.nextPlayer();
  expect(GameController.currentPlayer).toBe(2);
  GameController.nextPlayer();
  expect(GameController.currentPlayer).toBe(1);
});
