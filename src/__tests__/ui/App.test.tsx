import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../ui/App';
import userEvent from '@testing-library/user-event';

describe('The App', () => {
  it('displays the game title on the main header', () => {
    // Arrange & Act
    render(<App />);

    // Assert
    expect(screen.getByText(/El Juego de la Vida/i)).toBeInTheDocument();
  });
});

describe('The Game Setup', () => {
  it('presents initial configuration with default values', () => {
    // Arrange & Act
    render(<App />);

    // Assert
    expect(screen.getByLabelText(/Filas/i)).toHaveValue(5);
    expect(screen.getByLabelText(/Columnas/i)).toHaveValue(5);
    expect(screen.getByLabelText(/Velocidad/i)).toHaveValue(0.1);
    expect(screen.getByRole('button', { name: /Generar/i })).toBeInTheDocument();
  });

  it('restricts numeric inputs according to world boundaries', () => {
    // Arrange & Act
    render(<App />);
    const rowsInput = screen.getByLabelText(/Filas/i);
    const speedInput = screen.getByLabelText(/Velocidad/i);

    // Assert
    expect(rowsInput).toHaveAttribute('min', '1');
    expect(speedInput).toHaveAttribute('min', '0.1');
    expect(speedInput).toHaveAttribute('step', '0.1');
  });

  it('initializes the board when the world generator is executed', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<App />);
    const initialMessage = screen.getByText(/comenzar/i);
    const generateButton = screen.getByRole('button', { name: /generar/i });

    // Act
    await user.click(generateButton);

    // Assert
    expect(initialMessage).not.toBeInTheDocument();
    expect(screen.getByTestId('board')).toBeInTheDocument();
  });
});
