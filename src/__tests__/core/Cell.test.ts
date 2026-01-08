import { Cell, CellState } from '../../core/Cell';

describe('In the Game of Life, a Cell', () => {
  test('should be correctly instantiated with an initial state', () => {
    // Arrange
    const initialState = CellState.ALIVE;

    // Act
    const cell = new Cell(initialState);

    // Assert
    expect(cell).toBeInstanceOf(Cell);
    expect(cell.isAlive()).toBe(true);
  });

  test('dies when it is alive and has fewer than two alive neighbours (Underpopulation)', () => {
    // Arrange
    const aliveCell = new Cell(CellState.ALIVE);
    const numberOfAliveNeighbours = 1;

    // Act
    const nextGenerationCell = aliveCell.regenerate(numberOfAliveNeighbours);

    // Assert
    expect(nextGenerationCell.isAlive()).toBe(false);
  });

  test('dies when it is alive and has more than three alive neighbours (Overcrowding)', () => {
    // Arrange
    const aliveCell = new Cell(CellState.ALIVE);
    const numberOfAliveNeighbours = 4;

    // Act
    const nextGenerationCell = aliveCell.regenerate(numberOfAliveNeighbours);

    // Assert
    expect(nextGenerationCell.isAlive()).toBe(false);
  });

  describe('Survival (Balance)', () => {
    test.each([{ neighbours: 2 }, { neighbours: 3 }])(
      'stays alive when it has $neighbours alive neighbours',
      ({ neighbours }) => {
        // Arrange
        const aliveCell = new Cell(CellState.ALIVE);

        // Act
        const nextGenerationCell = aliveCell.regenerate(neighbours);

        // Assert
        expect(nextGenerationCell.isAlive()).toBe(true);
      }
    );
  });

  test('becomes alive when it is dead and has exactly three alive neighbours (Rebirth)', () => {
    // Arrange
    const deadCell = new Cell(CellState.DEAD);
    const numberOfAliveNeighbours = 3;

    // Act
    const nextGenerationCell = deadCell.regenerate(numberOfAliveNeighbours);

    // Assert
    expect(nextGenerationCell.isAlive()).toBe(true);
  });
});
