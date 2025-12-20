export enum CellState {
  DEAD = 0,
  ALIVE = 1,
}

export class Cell {
  constructor(private state: CellState) {}

  regenerate(numberOfAliveNeighbours: number) {
    if (this.state === CellState.ALIVE && numberOfAliveNeighbours === 2) {
      this.state = CellState.ALIVE;
    } else if (this.state === CellState.ALIVE && (numberOfAliveNeighbours < 2 || numberOfAliveNeighbours > 3)) {
      this.state = CellState.DEAD;
    } else if (this.state === CellState.DEAD && numberOfAliveNeighbours === 3) {
      this.state = CellState.ALIVE;
    }
  }

  isAlive() {
    return this.state === CellState.ALIVE;
  }
}
