import { expect, it } from '@jest/globals';

import { CellState, GameOfLife } from '../core/GameOfLife';
describe('game of life', () => {
  it('universe containing one cell alive turns to one cell dead', () => {
    const gameOfLife = new GameOfLife([[CellState.ALIVE]]);

    gameOfLife.generateNextState();

    expect(gameOfLife.grid).toEqual([[CellState.DEAD]]);
  });
  it('universe containing a cell alive with two horizontal alive Neighbours survives', () => {
    const gameOfLife = new GameOfLife([[CellState.ALIVE, CellState.ALIVE, CellState.ALIVE]]);

    gameOfLife.generateNextState();

    expect(gameOfLife.grid).toEqual([[CellState.DEAD, CellState.ALIVE, CellState.DEAD]]);
  });
  it('universe containing a cell alive with two vertical alive Neighbours survives', () => {
    const gameOfLife = new GameOfLife([
      [CellState.ALIVE, CellState.DEAD, CellState.DEAD],
      [CellState.ALIVE, CellState.DEAD, CellState.DEAD],
      [CellState.ALIVE, CellState.DEAD, CellState.DEAD],
    ]);

    gameOfLife.generateNextState();

    // Red flag: cell(1,1) becomes alive but not expected in this test case
    expect(gameOfLife.grid).toEqual([
      [CellState.DEAD, CellState.DEAD, CellState.DEAD],
      [CellState.ALIVE, CellState.ALIVE, CellState.DEAD],
      [CellState.DEAD, CellState.DEAD, CellState.DEAD],
    ]);
  });
  it('universe containing a cell alive with two top-bottom diagonal alive Neighbours survives', () => {
    const gameOfLife = new GameOfLife([
      [CellState.ALIVE, CellState.DEAD, CellState.DEAD],
      [CellState.DEAD, CellState.ALIVE, CellState.DEAD],
      [CellState.DEAD, CellState.DEAD, CellState.ALIVE],
    ]);

    gameOfLife.generateNextState();

    expect(gameOfLife.grid).toEqual([
      [CellState.DEAD, CellState.DEAD, CellState.DEAD],
      [CellState.DEAD, CellState.ALIVE, CellState.DEAD],
      [CellState.DEAD, CellState.DEAD, CellState.DEAD],
    ]);
  });
  it('universe containing a cell alive with two bottom-top diagonal alive Neighbours survives', () => {
    const gameOfLife = new GameOfLife([
      [CellState.DEAD, CellState.DEAD, CellState.ALIVE],
      [CellState.DEAD, CellState.ALIVE, CellState.DEAD],
      [CellState.ALIVE, CellState.DEAD, CellState.DEAD],
    ]);

    gameOfLife.generateNextState();

    expect(gameOfLife.grid).toEqual([
      [CellState.DEAD, CellState.DEAD, CellState.DEAD],
      [CellState.DEAD, CellState.ALIVE, CellState.DEAD],
      [CellState.DEAD, CellState.DEAD, CellState.DEAD],
    ]);
  });
});
