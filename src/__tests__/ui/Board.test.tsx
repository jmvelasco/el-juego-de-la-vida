import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Board from '../../ui/Board';
import { World } from '../../core/World';
import { Cell, CellState } from '../../core/Cell';
import { WorldOfLifeProvider } from '../../context/WorldOfLifeProvider';

describe('Board', () => {
  test('should render setup message when world is not initialized', () => {
    render(
      <WorldOfLifeProvider injectedValuesOverriden={{ world: undefined }}>
        <Board />
      </WorldOfLifeProvider>
    );

    expect(screen.getByText(/Configura los parámetros/i)).toBeInTheDocument();
    expect(screen.queryByTestId('board')).not.toBeInTheDocument();
  });

  test('should render empty state message when the world has died', async () => {
    jest.useFakeTimers();
    const deadWorld = new World([[new Cell(CellState.dead)]]);

    render(
      <WorldOfLifeProvider injectedValuesOverriden={{ world: deadWorld }}>
        <Board />
      </WorldOfLifeProvider>
    );

    act(() => {
      jest.advanceTimersByTime(2050);
    });

    const message = await screen.findByText(/El mundo ha muerto/i);
    expect(message).toBeInTheDocument();
    jest.useRealTimers();
  });

  test('should render the board when there is an active world', () => {
    const aliveWorld = new World([[new Cell(CellState.alive)]]);

    render(
      <WorldOfLifeProvider injectedValuesOverriden={{ world: aliveWorld }}>
        <Board />
      </WorldOfLifeProvider>
    );

    const gridElement = screen.getByTestId('board');
    expect(gridElement).toBeInTheDocument();
    expect(screen.queryByText(/El mundo ha muerto/i)).not.toBeInTheDocument();
  });
});
