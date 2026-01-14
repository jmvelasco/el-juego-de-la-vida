import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../ui/App';
import userEvent from '@testing-library/user-event';

describe('App', () => {
  test('renders the main heading', () => {
    render(<App />);
    const headingElement = screen.getByText(/El Juego de la Vida/i);
    expect(headingElement).toBeInTheDocument();
  });
});

describe('Setup', () => {
  test('should render all form fields with default values', () => {
    render(<App />);

    expect(screen.getByLabelText(/Filas/i)).toHaveValue(5);
    expect(screen.getByLabelText(/Columnas/i)).toHaveValue(5);
    expect(screen.getByLabelText(/Velocidad/i)).toHaveValue(0.1);
    expect(screen.getByRole('button', { name: /Generar/i })).toBeInTheDocument();
  });

  test('should have correct constraints on numeric inputs', () => {
    render(<App />);

    const rowsInput = screen.getByLabelText(/Filas/i);
    const speedInput = screen.getByLabelText(/Velocidad/i);

    expect(rowsInput).toHaveAttribute('min', '1');
    expect(speedInput).toHaveAttribute('min', '0.1');
    expect(speedInput).toHaveAttribute('step', '0.1');
  });

  test('should call start the game when generate button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const helperTextElement = screen.getByText(/comenzar/i);
    expect(helperTextElement).toBeInTheDocument();

    const generateButton = screen.getByRole('button', { name: /generar/i });
    await user.click(generateButton);

    expect(helperTextElement).not.toBeInTheDocument();
    const gridElement = screen.getByTestId('board');
    expect(gridElement).toBeInTheDocument();
  });
});
