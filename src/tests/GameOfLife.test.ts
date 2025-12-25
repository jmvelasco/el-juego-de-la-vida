import { expect } from '@jest/globals';

import { Cell, CellState } from '../core/Cell';
import { GameOfLife } from '../core/GameOfLife';
describe('In the game of life', () => {
  test('An universe containing one cell alive turns to one cell dead', () => {
    const gameOfLife = new GameOfLife([[new Cell(CellState.ALIVE)]]);

    const nextGeneration = gameOfLife.generateNextState();

    expect(nextGeneration).toEqual(new GameOfLife([[new Cell(CellState.DEAD)]]));
  });
  test('An universe containing a cell alive with two horizontal alive Neighbours survives', () => {
    const gameOfLife = new GameOfLife([
      [new Cell(CellState.ALIVE), new Cell(CellState.ALIVE), new Cell(CellState.ALIVE)],
    ]);

    const nextGeneration = gameOfLife.generateNextState();

    expect(nextGeneration).toEqual(
      new GameOfLife([[new Cell(CellState.DEAD), new Cell(CellState.ALIVE), new Cell(CellState.DEAD)]])
    );
  });
  test('An universe containing a cell alive with two vertical alive Neighbours survives', () => {
    const gameOfLife = new GameOfLife([
      [new Cell(CellState.ALIVE), new Cell(CellState.DEAD), new Cell(CellState.DEAD)],
      [new Cell(CellState.ALIVE), new Cell(CellState.DEAD), new Cell(CellState.DEAD)],
      [new Cell(CellState.ALIVE), new Cell(CellState.DEAD), new Cell(CellState.DEAD)],
    ]);

    const nextGeneration = gameOfLife.generateNextState();

    // Red flag: cell(1,1) becomes alive but not expected in this test case
    expect(nextGeneration).toEqual(
      new GameOfLife([
        [new Cell(CellState.DEAD), new Cell(CellState.DEAD), new Cell(CellState.DEAD)],
        [new Cell(CellState.ALIVE), new Cell(CellState.ALIVE), new Cell(CellState.DEAD)],
        [new Cell(CellState.DEAD), new Cell(CellState.DEAD), new Cell(CellState.DEAD)],
      ])
    );
  });
  test('An universe containing a cell alive with two top-bottom diagonal alive Neighbours survives', () => {
    const gameOfLife = new GameOfLife([
      [new Cell(CellState.ALIVE), new Cell(CellState.DEAD), new Cell(CellState.DEAD)],
      [new Cell(CellState.DEAD), new Cell(CellState.ALIVE), new Cell(CellState.DEAD)],
      [new Cell(CellState.DEAD), new Cell(CellState.DEAD), new Cell(CellState.ALIVE)],
    ]);

    const nextGeneration = gameOfLife.generateNextState();

    expect(nextGeneration).toEqual(
      new GameOfLife([
        [new Cell(CellState.DEAD), new Cell(CellState.DEAD), new Cell(CellState.DEAD)],
        [new Cell(CellState.DEAD), new Cell(CellState.ALIVE), new Cell(CellState.DEAD)],
        [new Cell(CellState.DEAD), new Cell(CellState.DEAD), new Cell(CellState.DEAD)],
      ])
    );
  });
  test('An universe containing a cell alive with two bottom-top diagonal alive Neighbours survives', () => {
    const gameOfLife = new GameOfLife([
      [new Cell(CellState.DEAD), new Cell(CellState.DEAD), new Cell(CellState.ALIVE)],
      [new Cell(CellState.DEAD), new Cell(CellState.ALIVE), new Cell(CellState.DEAD)],
      [new Cell(CellState.ALIVE), new Cell(CellState.DEAD), new Cell(CellState.DEAD)],
    ]);

    const nextGeneration = gameOfLife.generateNextState();

    expect(nextGeneration).toEqual(
      new GameOfLife([
        [new Cell(CellState.DEAD), new Cell(CellState.DEAD), new Cell(CellState.DEAD)],
        [new Cell(CellState.DEAD), new Cell(CellState.ALIVE), new Cell(CellState.DEAD)],
        [new Cell(CellState.DEAD), new Cell(CellState.DEAD), new Cell(CellState.DEAD)],
      ])
    );
  });
});
