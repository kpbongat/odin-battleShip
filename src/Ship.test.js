import Ship from "./Ship";

let ship;
beforeEach(() => {
  ship = new Ship(4);
});

test("Ship defined", () => {
  expect(ship).toBeTruthy();
});

test("Hit decrements hits", () => {
  ship.hit();
  ship.hit();
  expect(ship.hits).toBe(2);
});

test("Ship sunken", () => {
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBeTruthy();
});
