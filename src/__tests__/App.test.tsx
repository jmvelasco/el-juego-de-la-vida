import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('App', () => {
  test('renders the main heading', () => {
    render(<App />);
    const headingElement = screen.getByText(/El Juego de la Vida/i);
    expect(headingElement).toBeInTheDocument();
  });
});
