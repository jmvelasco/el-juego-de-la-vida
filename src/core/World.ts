import { Cell } from './Cell';

export class World {
  constructor(private readonly grid: Cell[][]) {}

  get cells(): Cell[][] {
    return this.grid;
  }

  generateNext(): World {
    const nextGeneration = this.grid.map((row, rowIndex) =>
      row.map((cell, columnIndex) => {
        const aliveNeighbours = this.countAliveNeighbours(rowIndex, columnIndex);
        return cell.regenerate(aliveNeighbours);
      })
    );
    return new World(nextGeneration);
  }

  isDead(): boolean {
    return this.grid.every((row) => row.every((cell) => !cell.isAlive()));
  }

  private countAliveNeighbours(rowIndex: number, columnIndex: number): number {
    const neighbourOffsets = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    return neighbourOffsets.reduce((count, [rowOffset, columnOffset]) => {
      const neighbourRowIndex = rowIndex + rowOffset;
      const neighbourColumnIndex = columnIndex + columnOffset;
      const neighbour = this.grid[neighbourRowIndex]?.[neighbourColumnIndex];

      return neighbour?.isAlive() ? count + 1 : count;
    }, 0);
  }
}
