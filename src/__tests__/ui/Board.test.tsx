import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Board from '../../ui/Board';
import { LifeWorldProvider } from '../../context/LifeWorldProvider';
import { World } from '../../core/World';
import { Cell, CellState } from '../../core/Cell';

describe('Board', () => {
  test('should render setup message when world is not initialized', () => {
    render(
      <LifeWorldProvider valueOverride={{ world: undefined }}>
        <Board />
      </LifeWorldProvider>
    );

    expect(screen.getByText(/Configura los parámetros/i)).toBeInTheDocument();
    expect(screen.queryByTestId('board')).not.toBeInTheDocument();
  });

  test('should render empty state message when the world has died', async () => {
    jest.useFakeTimers();
    const deadWorld = new World([[new Cell(CellState.dead)]]);

    render(
      <LifeWorldProvider valueOverride={{ world: deadWorld }}>
        <Board />
      </LifeWorldProvider>
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
      <LifeWorldProvider valueOverride={{ world: aliveWorld }}>
        <Board />
      </LifeWorldProvider>
    );

    const gridElement = screen.getByTestId('board');
    expect(gridElement).toBeInTheDocument();
    expect(screen.queryByText(/El mundo ha muerto/i)).not.toBeInTheDocument();
  });
});
