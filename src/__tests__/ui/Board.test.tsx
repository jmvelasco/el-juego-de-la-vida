import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Board from '../../ui/Board';
import { useLifeWorldContext } from '../../context/LifeWorldProvider';
import { World } from '../../core/World';
import { Cell, CellState } from '../../core/Cell';

jest.mock('../../context/LifeWorldProvider', () => ({
  useLifeWorldContext: jest.fn(),
}));

describe('Board', () => {
  const mockUseLifeWorldContext = useLifeWorldContext as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render setup message when world is not initialized', () => {
    mockUseLifeWorldContext.mockReturnValue({
      world: undefined,
      cellSize: 10,
      speed: 1,
    });

    render(<Board />);

    expect(screen.getByText(/Configura los parámetros/i)).toBeInTheDocument();
    expect(screen.queryByTestId('board')).not.toBeInTheDocument();
  });

  test('should render empty state message when the world has died', async () => {
    jest.useFakeTimers();
    const deadWorld = new World([[new Cell(CellState.DEAD)]]);
    mockUseLifeWorldContext.mockReturnValue({
      world: deadWorld,
      cellSize: 10,
      speed: 1,
    });

    render(<Board />);

    // Advance time to allow the dead-world detection and subsequent setTimeout to complete.
    // We wrap it in act() because it triggers state updates.
    act(() => {
      jest.advanceTimersByTime(2050);
    });

    const message = await screen.findByText(/El mundo ha muerto/i);
    expect(message).toBeInTheDocument();
    jest.useRealTimers();
  });

  test('should render the board when there is an active world', () => {
    const aliveWorld = new World([[new Cell(CellState.ALIVE)]]);
    mockUseLifeWorldContext.mockReturnValue({
      world: aliveWorld,
      cellSize: 10,
      speed: 1,
    });

    render(<Board />);

    const gridElement = screen.getByTestId('board');
    expect(gridElement).toBeInTheDocument();
    expect(screen.queryByText(/El mundo ha muerto/i)).not.toBeInTheDocument();
  });
});
