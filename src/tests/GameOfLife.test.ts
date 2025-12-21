import { expect, it } from '@jest/globals';

import { Cell, CellState } from '../core/Cell';
import { GameOfLife } from '../core/GameOfLife';
describe('game of life', () => {
  it('universe containing one cell alive turns to one cell dead', () => {
    const gameOfLife = new GameOfLife([[new Cell(CellState.ALIVE)]]);

    gameOfLife.generateNextState();

    expect(gameOfLife.grid).toEqual([[new Cell(CellState.DEAD)]]);
  });
  it('universe containing a cell alive with two horizontal alive Neighbours survives', () => {
    const gameOfLife = new GameOfLife([
      [new Cell(CellState.ALIVE), new Cell(CellState.ALIVE), new Cell(CellState.ALIVE)],
    ]);

    gameOfLife.generateNextState();

    expect(gameOfLife.grid).toEqual([[new Cell(CellState.DEAD), new Cell(CellState.ALIVE), new Cell(CellState.DEAD)]]);
  });
  it('universe containing a cell alive with two vertical alive Neighbours survives', () => {
    const gameOfLife = new GameOfLife([
      [new Cell(CellState.ALIVE), new Cell(CellState.DEAD), new Cell(CellState.DEAD)],
      [new Cell(CellState.ALIVE), new Cell(CellState.DEAD), new Cell(CellState.DEAD)],
      [new Cell(CellState.ALIVE), new Cell(CellState.DEAD), new Cell(CellState.DEAD)],
    ]);

    gameOfLife.generateNextState();

    // Red flag: cell(1,1) becomes alive but not expected in this test case
    expect(gameOfLife.grid).toEqual([
      [new Cell(CellState.DEAD), new Cell(CellState.DEAD), new Cell(CellState.DEAD)],
      [new Cell(CellState.ALIVE), new Cell(CellState.ALIVE), new Cell(CellState.DEAD)],
      [new Cell(CellState.DEAD), new Cell(CellState.DEAD), new Cell(CellState.DEAD)],
    ]);
  });
  it('universe containing a cell alive with two top-bottom diagonal alive Neighbours survives', () => {
    const gameOfLife = new GameOfLife([
      [new Cell(CellState.ALIVE), new Cell(CellState.DEAD), new Cell(CellState.DEAD)],
      [new Cell(CellState.DEAD), new Cell(CellState.ALIVE), new Cell(CellState.DEAD)],
      [new Cell(CellState.DEAD), new Cell(CellState.DEAD), new Cell(CellState.ALIVE)],
    ]);

    gameOfLife.generateNextState();

    expect(gameOfLife.grid).toEqual([
      [new Cell(CellState.DEAD), new Cell(CellState.DEAD), new Cell(CellState.DEAD)],
      [new Cell(CellState.DEAD), new Cell(CellState.ALIVE), new Cell(CellState.DEAD)],
      [new Cell(CellState.DEAD), new Cell(CellState.DEAD), new Cell(CellState.DEAD)],
    ]);
  });
  it('universe containing a cell alive with two bottom-top diagonal alive Neighbours survives', () => {
    const gameOfLife = new GameOfLife([
      [new Cell(CellState.DEAD), new Cell(CellState.DEAD), new Cell(CellState.ALIVE)],
      [new Cell(CellState.DEAD), new Cell(CellState.ALIVE), new Cell(CellState.DEAD)],
      [new Cell(CellState.ALIVE), new Cell(CellState.DEAD), new Cell(CellState.DEAD)],
    ]);

    gameOfLife.generateNextState();

    expect(gameOfLife.grid).toEqual([
      [new Cell(CellState.DEAD), new Cell(CellState.DEAD), new Cell(CellState.DEAD)],
      [new Cell(CellState.DEAD), new Cell(CellState.ALIVE), new Cell(CellState.DEAD)],
      [new Cell(CellState.DEAD), new Cell(CellState.DEAD), new Cell(CellState.DEAD)],
    ]);
  });
});
