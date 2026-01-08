import { useEffect, useState } from 'react';
import { World } from '../core/World';
import { Cell, CellState } from '../core/Cell';

function Board(): React.ReactNode {
  const cells = [
    [new Cell(CellState.DEAD), new Cell(CellState.DEAD), new Cell(CellState.DEAD)],
    [new Cell(CellState.ALIVE), new Cell(CellState.ALIVE), new Cell(CellState.ALIVE)],
    [new Cell(CellState.DEAD), new Cell(CellState.DEAD), new Cell(CellState.DEAD)],
  ];
  const world = new World(cells);
  const [currentWorld, setCurrentWorld] = useState(world);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWorld(currentWorld.generateNext());
    }, 1000);
    return () => clearInterval(interval);
  }, [currentWorld]);

  return (
    <table>
      <tbody>
        {currentWorld.cells.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td key={colIndex}>{cell.render()}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Board;
