export enum CellState {
  DEAD = 0,
  ALIVE = 1,
}

export class Cell {
  constructor(private state: CellState) {}

  regenerate(numberOfAliveNeighbours: number) {
    return this.aliveCellWillSurvive(numberOfAliveNeighbours) || this.deadCellWillReborn(numberOfAliveNeighbours)
      ? new Cell(CellState.ALIVE)
      : new Cell(CellState.DEAD);
  }

  private deadCellWillReborn(numberOfAliveNeighbours: number): boolean {
    return !this.isAlive() && this.reborn(numberOfAliveNeighbours);
  }

  private aliveCellWillSurvive(numberOfAliveNeighbours: number) {
    return this.isAlive() && this.stable(numberOfAliveNeighbours);
  }

  private stable(numberOfAliveNeighbours: number) {
    return numberOfAliveNeighbours === 2 || numberOfAliveNeighbours === 3;
  }

  private reborn(numberOfAliveNeighbours: number) {
    return numberOfAliveNeighbours === 3;
  }

  isAlive() {
    return this.state === CellState.ALIVE;
  }
}
