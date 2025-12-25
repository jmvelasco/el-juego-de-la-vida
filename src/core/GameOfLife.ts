import { Cell } from './Cell';

export class World {
  constructor(private readonly grid: Cell[][]) {}

  generateNext() {
    const nextGeneration = this.grid.map((rows, rowIndex) => {
      return rows.map((cell, colIndex) => {
        const numberOfAliveNeighbours = this.countAliveNeighbours(rowIndex, colIndex);
        return cell.regenerate(numberOfAliveNeighbours);
      });
    });
    return new World(nextGeneration);
  }

  private countAliveNeighbours(rowIndex: number, colIndex: number): number {
    const previousRow = this.grid[rowIndex - 1];
    const sameRow = this.grid[rowIndex];
    const nextRow = this.grid[rowIndex + 1];

    return (
      this.countRowNeighbours(colIndex, previousRow) +
      this.countRowNeighbours(colIndex, sameRow) +
      this.countRowNeighbours(colIndex, nextRow)
    );
  }

  private countRowNeighbours(colIndex: number, rowCells: Cell[]) {
    let numberOfAliveNeighbours = 0;
    for (let col = colIndex - 1; col <= colIndex + 1; col++) {
      if (col !== colIndex && rowCells?.[col]?.isAlive()) {
        numberOfAliveNeighbours++;
      }
    }
    return numberOfAliveNeighbours;
  }
}
