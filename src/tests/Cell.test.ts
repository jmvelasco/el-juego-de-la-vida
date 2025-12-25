import { Cell, CellState } from '../core/Cell';

const UNDERPOPULATION = 1;
const OVERCROWDING = 4;
const REBIRTH = 3;
const STABLE = [2, 3];

describe('a cell', () => {
  it('should be defined', () => {
    const cell = new Cell(CellState.ALIVE);
    expect(cell).toBeInstanceOf(Cell);
  });
  it('alive with fewer than two live neighbours dies, as if caused by underpopulation', () => {
    const cell = new Cell(CellState.ALIVE);
    const nextState = cell.regenerate(UNDERPOPULATION);
    expect(nextState.isAlive()).toBe(false);
  });
  it('alive with with more than three live neighbours dies, as if by overcrowding', () => {
    const cell = new Cell(CellState.ALIVE);
    const nextState = cell.regenerate(OVERCROWDING);
    expect(nextState.isAlive()).toBe(false);
  });
  it('alive with two or three live neighbours lives on to the next generation', () => {
    const cell = new Cell(CellState.ALIVE);
    STABLE.forEach((numberOfAliveNeighbours) => {
      const nextState = cell.regenerate(numberOfAliveNeighbours);
      expect(nextState.isAlive()).toBe(true);
    });
  });
  it('dead with exactly three live neighbours becomes a live cell', () => {
    const cell = new Cell(CellState.DEAD);
    const nextState = cell.regenerate(REBIRTH);
    expect(nextState.isAlive()).toBe(true);
  });
});
