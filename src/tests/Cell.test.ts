import { Cell, CellState } from '../core/Cell';

describe('a cell', () => {
  it('should be defined', () => {
    const cell = new Cell(CellState.ALIVE);
    expect(cell).toBeInstanceOf(Cell);
  });

  it('alive with fewer than two live neighbours dies, as if caused by underpopulation', () => {
    const cell = new Cell(CellState.ALIVE);
    cell.regenerate(1);
    expect(cell.isAlive()).toBe(false);
  });
  it('alive with with more than three live neighbours dies, as if by overcrowding', () => {
    const cell = new Cell(CellState.ALIVE);
    cell.regenerate(4);
    expect(cell.isAlive()).toBe(false);
  });
  it('alive with two or three live neighbours lives on to the next generation', () => {
    const cell = new Cell(CellState.ALIVE);
    [2, 3].forEach((numberOfAliveNeighbours) => {
      cell.regenerate(numberOfAliveNeighbours);
      expect(cell.isAlive()).toBe(true);
    });
  });
  it('dead with exactly three live neighbours becomes a live cell', () => {
    const cell = new Cell(CellState.DEAD);
    cell.regenerate(3);
    expect(cell.isAlive()).toBe(true);
  });
});
