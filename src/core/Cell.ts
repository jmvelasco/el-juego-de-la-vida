export enum CellState {
  dead = 0,
  alive = 1,
}

export class Cell {
  constructor(private state: CellState) {}

  regenerate(numberOfAliveNeighbours: number) {
    return this.aliveCellWillSurvive(numberOfAliveNeighbours) || this.deadCellWillReborn(numberOfAliveNeighbours)
      ? new Cell(CellState.alive)
      : new Cell(CellState.dead);
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
    return this.state === CellState.alive;
  }

  render() {
    return this.isAlive() ? 'X' : 'O';
  }
}
