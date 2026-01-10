import { expect } from '@jest/globals';
import { Cell, CellState } from '../../core/Cell';
import { World } from '../../core/World';

class Descriptor {
  static createCellRowFrom(descriptor: string): Cell[] {
    return Array.from(descriptor).map((char) => {
      if (char !== '*' && char !== '-') throw new Error('No valid descriptor');
      return new Cell(char === '*' ? CellState.alive : CellState.dead);
    });
  }

  static createWorldFrom(rows: string[]): World {
    return new World(rows.map((row) => this.createCellRowFrom(row)));
  }
}

describe('In the Game of Life', () => {
  describe('Atomic rules of evolution', () => {
    test('an alive cell dies when it has fewer than two alive neighbours (Underpopulation)', () => {
      // Arrange
      const initialLayout = ['---', '-*-', '---'];
      const initialWorld = Descriptor.createWorldFrom(initialLayout);

      // Act
      const nextGenerationWorld = initialWorld.generateNext();

      // Assert
      const expectedGenerationLayout = ['---', '---', '---'];
      expect(nextGenerationWorld).toEqual(Descriptor.createWorldFrom(expectedGenerationLayout));
    });

    test('an alive cell survives when it has two or three alive neighbours (Balance)', () => {
      // Arrange
      const initialLayout = ['---', '***', '---'];
      const initialWorld = Descriptor.createWorldFrom(initialLayout);

      // Act
      const nextGenerationWorld = initialWorld.generateNext();

      // Assert
      const expectedGenerationLayout = ['-*-', '-*-', '-*-'];
      expect(nextGenerationWorld).toEqual(Descriptor.createWorldFrom(expectedGenerationLayout));
    });

    test('an alive cell dies when it has more than three alive neighbours (Overpopulation)', () => {
      // Arrange
      const plusPatternLayout = ['-*-', '***', '-*-'];
      const initialWorld = Descriptor.createWorldFrom(plusPatternLayout);

      // Act
      const nextGenerationWorld = initialWorld.generateNext();

      // Assert
      const expectedGenerationLayout = ['***', '*-*', '***'];
      expect(nextGenerationWorld).toEqual(Descriptor.createWorldFrom(expectedGenerationLayout));
    });

    test('a dead cell becomes alive when it has exactly three alive neighbours (Reproduction)', () => {
      // Arrange
      const initialLayout = ['**-', '*--', '---'];
      const initialWorld = Descriptor.createWorldFrom(initialLayout);

      // Act
      const nextGenerationWorld = initialWorld.generateNext();

      // Assert
      const expectedGenerationLayout = ['**-', '**-', '---'];
      expect(nextGenerationWorld).toEqual(Descriptor.createWorldFrom(expectedGenerationLayout));
    });
  });

  describe('Degenerate and finite worlds (Boundary cases)', () => {
    test('a world with a single cell should result in death', () => {
      // Arrange
      const initialWorld = Descriptor.createWorldFrom(['*']);

      // Act
      const nextGenerationWorld = initialWorld.generateNext();

      // Assert
      const expectedGenerationLayout = ['-'];
      expect(nextGenerationWorld).toEqual(Descriptor.createWorldFrom(expectedGenerationLayout));
    });

    test('a horizontal world of one row should evolve without breaking', () => {
      // Arrange
      const initialWorld = Descriptor.createWorldFrom(['***']);

      // Act
      const nextGenerationWorld = initialWorld.generateNext();

      // Assert
      const expectedGenerationLayout = ['-*-'];
      expect(nextGenerationWorld).toEqual(Descriptor.createWorldFrom(expectedGenerationLayout));
    });
  });

  describe('Stable and Periodic Patterns', () => {
    test('a "Block" pattern (2x2) remains stable as a still life', () => {
      // Arrange
      const blockInitialLayout = ['----', '-**-', '-**-', '----'];
      const initialWorld = Descriptor.createWorldFrom(blockInitialLayout);

      // Act
      const nextGenerationWorld = initialWorld.generateNext();

      // Assert
      const expectedGenerationLayout = ['----', '-**-', '-**-', '----'];
      expect(nextGenerationWorld).toEqual(Descriptor.createWorldFrom(expectedGenerationLayout));
    });

    test('a "Blinker" pattern oscillates between vertical and horizontal every generation', () => {
      // Arrange
      const horizontalBlinkerLayout = ['---', '***', '---'];
      const initialWorld = Descriptor.createWorldFrom(horizontalBlinkerLayout);

      // Act
      const firstEvolutionWorld = initialWorld.generateNext();
      const secondEvolutionWorld = firstEvolutionWorld.generateNext();

      // Assert
      const verticalBlinkerLayout = ['-*-', '-*-', '-*-'];
      expect(firstEvolutionWorld).toEqual(Descriptor.createWorldFrom(verticalBlinkerLayout));
      expect(secondEvolutionWorld).toEqual(Descriptor.createWorldFrom(horizontalBlinkerLayout));
    });

    test('a "Glider" pattern moves diagonally across the world after two generations', () => {
      // Arrange
      const gliderInitialLayout = ['-*---', '--*--', '***--', '-----', '-----'];
      const initialWorld = Descriptor.createWorldFrom(gliderInitialLayout);

      // Act
      const firstEvolutionWorld = initialWorld.generateNext();
      const secondEvolutionWorld = firstEvolutionWorld.generateNext();

      // Assert
      const expectedLayoutAfterTwoGenerations = ['-----', '--*--', '*-*--', '-**--', '-----'];
      expect(secondEvolutionWorld).toEqual(Descriptor.createWorldFrom(expectedLayoutAfterTwoGenerations));
    });
  });
});
