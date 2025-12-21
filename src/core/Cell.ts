export enum CellState {
  DEAD = 0,
  ALIVE = 1,
}

export class Cell {
  constructor(private state: CellState) {}

  nextState(numberOfAliveNeighbours: number) {
    if (this.isAlive() && numberOfAliveNeighbours === 2) {
      return CellState.ALIVE;
    } else if (this.isAlive() && (numberOfAliveNeighbours < 2 || numberOfAliveNeighbours > 3)) {
      return CellState.DEAD;
    } else if (!this.isAlive() && numberOfAliveNeighbours === 3) {
      return CellState.ALIVE;
    }
    return this.isAlive() ? CellState.ALIVE : CellState.DEAD;
  }

  isAlive() {
    return this.state === CellState.ALIVE;
  }
}
