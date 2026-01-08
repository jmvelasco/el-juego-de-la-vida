import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Board from '../../ui/Board';

describe('Board', () => {
  test('should render a grid of cells', () => {
    render(<Board />);
    const gridElement = screen.getByRole('table');
    expect(gridElement).toBeInTheDocument();
  });
});
