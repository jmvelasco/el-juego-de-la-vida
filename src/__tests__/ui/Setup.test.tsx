import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Setup from '../../ui/Setup';
import { WorldOfLifeProvider } from '../../ui/context/WorldOfLifeProvider';

describe('Setup', () => {
  test('should render all form fields with default values from context', () => {
    const mockValues = {
      rows: 15,
      cols: 20,
      speed: 0.5,
    };

    render(
      <WorldOfLifeProvider injectedValuesOverriden={mockValues}>
        <Setup />
      </WorldOfLifeProvider>
    );

    expect(screen.getByLabelText(/Filas/i)).toHaveValue(15);
    expect(screen.getByLabelText(/Columnas/i)).toHaveValue(20);
    expect(screen.getByLabelText(/Velocidad/i)).toHaveValue(0.5);
    expect(screen.getByRole('button', { name: /Generar/i })).toBeInTheDocument();
  });

  test('should have correct constraints on numeric inputs', () => {
    render(
      <WorldOfLifeProvider>
        <Setup />
      </WorldOfLifeProvider>
    );

    const rowsInput = screen.getByLabelText(/Filas/i);
    const speedInput = screen.getByLabelText(/Velocidad/i);

    expect(rowsInput).toHaveAttribute('min', '1');
    expect(speedInput).toHaveAttribute('min', '0.1');
    expect(speedInput).toHaveAttribute('step', '0.1');
  });

  test('should call initializeWorld context function when form is submitted', async () => {
    const user = userEvent.setup();
    const mockInitializeWorld = jest.fn((e) => e.preventDefault());

    render(
      <WorldOfLifeProvider injectedValuesOverriden={{ initialize: mockInitializeWorld }}>
        <Setup />
      </WorldOfLifeProvider>
    );

    const generateButton = screen.getByRole('button', { name: /Generar/i });
    await user.click(generateButton);

    expect(mockInitializeWorld).toHaveBeenCalledTimes(1);
  });
});
