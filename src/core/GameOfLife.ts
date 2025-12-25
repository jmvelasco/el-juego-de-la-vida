import { Cell } from './Cell';

export class GameOfLife {
  constructor(private readonly grid: Cell[][]) {}

  generateNextState() {
    const nextGrid = this.grid.map((rows, rowIndex) => {
      return rows.map((cell, colIndex) => {
        const numberOfAliveNeighbours = this.countAliveNeighbours(rowIndex, colIndex);
        return cell.nextState(numberOfAliveNeighbours);
      });
    });
    return new GameOfLife(nextGrid);
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
