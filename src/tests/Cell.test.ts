import { Cell, CellState } from '../core/Cell';

const UNDERPOPULATION = 1;
const OVERCROWDING = 3;
const STABLE = [2, 3];

describe('a cell', () => {
  it('should be defined', () => {
    const cell = new Cell(CellState.ALIVE);
    expect(cell).toBeInstanceOf(Cell);
  });

  it('alive with fewer than two live neighbours dies, as if caused by underpopulation', () => {
    const cell = new Cell(CellState.ALIVE);
    cell.nextState(UNDERPOPULATION);
    expect(cell.isAlive()).toBe(false);
  });
  it('alive with with more than three live neighbours dies, as if by overcrowding', () => {
    const cell = new Cell(CellState.ALIVE);
    cell.nextState(OVERCROWDING);
    expect(cell.isAlive()).toBe(false);
  });
  it('alive with two or three live neighbours lives on to the next generation', () => {
    const cell = new Cell(CellState.ALIVE);
    STABLE.forEach((numberOfAliveNeighbours) => {
      cell.nextState(numberOfAliveNeighbours);
      expect(cell.isAlive()).toBe(true);
    });
  });
  it('dead with exactly three live neighbours becomes a live cell', () => {
    const cell = new Cell(CellState.DEAD);
    cell.nextState(3);
    expect(cell.isAlive()).toBe(true);
  });
});
