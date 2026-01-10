import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Setup from '../../ui/Setup';
import { useLifeWorldContext } from '../../context/LifeWorldProvider';

jest.mock('../../context/LifeWorldProvider', () => ({
  useLifeWorldContext: jest.fn(),
}));

describe('Setup', () => {
  const mockInitializeWorld = jest.fn((e) => e.preventDefault());
  const mockDefaultValues = {
    rows: 10,
    cols: 10,
    initialConfig: 'random',
    speed: 1,
    initializeWorld: mockInitializeWorld,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useLifeWorldContext as jest.Mock).mockReturnValue(mockDefaultValues);
  });

  test('should render all form fields with default values from context', () => {
    render(<Setup />);

    expect(screen.getByLabelText(/Filas/i)).toHaveValue(10);
    expect(screen.getByLabelText(/Columnas/i)).toHaveValue(10);
    expect(screen.getByLabelText(/Configuracion Inicial/i)).toHaveValue('random');
    expect(screen.getByLabelText(/Velocidad/i)).toHaveValue(1);
    expect(screen.getByRole('button', { name: /Generar/i })).toBeInTheDocument();
  });

  test('should have correct constraints on numeric inputs', () => {
    render(<Setup />);

    const rowsInput = screen.getByLabelText(/Filas/i);
    const speedInput = screen.getByLabelText(/Velocidad/i);

    expect(rowsInput).toHaveAttribute('min', '1');
    expect(speedInput).toHaveAttribute('min', '0.1');
    expect(speedInput).toHaveAttribute('step', '0.1');
  });

  test('should call initializeWorld context function when form is submitted', () => {
    render(<Setup />);

    const form = screen.getByRole('button', { name: /Generar/i }).closest('form');
    if (!form) throw new Error('Form not found');

    fireEvent.submit(form);

    expect(mockInitializeWorld).toHaveBeenCalledTimes(1);
  });
});
