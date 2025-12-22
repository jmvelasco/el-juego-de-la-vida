export enum CellState {
  DEAD = 0,
  ALIVE = 1,
}

export class Cell {
  constructor(private state: CellState) {}

  nextState(numberOfAliveNeighbours: number) {
    if (this.isAlive() && numberOfAliveNeighbours === 2) {
      return new Cell(CellState.ALIVE);
    } else if (this.isAlive() && (numberOfAliveNeighbours < 2 || numberOfAliveNeighbours > 3)) {
      return new Cell(CellState.DEAD);
    } else if (!this.isAlive() && numberOfAliveNeighbours === 3) {
      return new Cell(CellState.ALIVE);
    }
    return this.isAlive() ? new Cell(CellState.ALIVE) : new Cell(CellState.DEAD);
  }

  isAlive() {
    return this.state === CellState.ALIVE;
  }
}
