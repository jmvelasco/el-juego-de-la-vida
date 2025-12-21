import { Cell } from './Cell';

export class GameOfLife {
  grid: Cell[][];
  constructor(grid: Cell[][]) {
    this.grid = grid;
  }
  generateNextState() {
    const nextGrid = this.grid.map((rows, rowIndex) => {
      return rows.map((cell, colIndex) => {
        const numberOfAliveNeighbours = this.countAliveNeighbours(rowIndex, colIndex);
        return new Cell(cell.nextState(numberOfAliveNeighbours));
      });
    });
    this.grid = nextGrid;
  }

  private countAliveNeighbours(rowIndex: number, colIndex: number): number {
    let count = 0;
    if (this.grid[rowIndex - 1]?.[colIndex - 1]?.isAlive()) count++; // Top-left
    if (this.grid[rowIndex - 1]?.[colIndex]?.isAlive()) count++; // Top
    if (this.grid[rowIndex - 1]?.[colIndex + 1]?.isAlive()) count++; // Top-right
    if (this.grid[rowIndex][colIndex - 1]?.isAlive()) count++; // Left
    if (this.grid[rowIndex][colIndex + 1]?.isAlive()) count++; // Right
    if (this.grid[rowIndex + 1]?.[colIndex - 1]?.isAlive()) count++; // Bottom-left
    if (this.grid[rowIndex + 1]?.[colIndex]?.isAlive()) count++; // Bottom
    if (this.grid[rowIndex + 1]?.[colIndex + 1]?.isAlive()) count++; // Bottom-right
    return count;
  }
}
