export enum CellState {
  DEAD = 0,
  ALIVE = 1,
}

export class GameOfLife {
  grid: CellState[][];
  constructor(grid: CellState[][]) {
    this.grid = grid;
  }
  generateNextState() {
    const newGrid: CellState[][] = Array.from({ length: this.grid.length }, () =>
      Array.from({ length: this.grid[0].length }, () => CellState.DEAD)
    );
    this.grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const numberOfAliveNeighbours = this.countAliveNeighbours(rowIndex, colIndex);
        if (cell === CellState.ALIVE && numberOfAliveNeighbours === 2) {
          newGrid[rowIndex][colIndex] = CellState.ALIVE;
        } else if (cell === CellState.ALIVE && (numberOfAliveNeighbours < 2 || numberOfAliveNeighbours > 3)) {
          newGrid[rowIndex][colIndex] = CellState.DEAD;
        } else if (cell === CellState.DEAD && numberOfAliveNeighbours === 3) {
          newGrid[rowIndex][colIndex] = CellState.ALIVE;
        }
      });
    });
    this.grid = newGrid;
  }

  private countAliveNeighbours(rowIndex: number, colIndex: number): number {
    let count = 0;
    if (rowIndex > 0 && colIndex > 0 && this.grid[rowIndex - 1]?.[colIndex - 1] === CellState.ALIVE) count++; // Top-left
    if (rowIndex > 0 && this.grid[rowIndex - 1]?.[colIndex] === CellState.ALIVE) count++; // Top
    if (rowIndex > 0 && this.grid[rowIndex - 1]?.[colIndex + 1] === CellState.ALIVE) count++; // Top-right
    if (colIndex > 0 && this.grid[rowIndex][colIndex - 1] === CellState.ALIVE) count++; // Left
    if (this.grid[rowIndex][colIndex + 1] === CellState.ALIVE) count++; // Right
    if (colIndex > 0 && this.grid[rowIndex + 1]?.[colIndex - 1] === CellState.ALIVE) count++; // Bottom-left
    if (this.grid[rowIndex + 1]?.[colIndex] === CellState.ALIVE) count++; // Bottom
    if (this.grid[rowIndex + 1]?.[colIndex + 1] === CellState.ALIVE) count++; // Bottom-right
    return count;
  }
}
