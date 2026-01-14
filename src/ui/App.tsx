import { useCallback, useEffect, useState } from 'react';
import { Cell, CellState } from '../core/Cell';
import { World } from '../core/World';

const App = (): React.ReactNode => {
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);
  const [cellSize, setCellSize] = useState(1);
  const [speed, setSpeed] = useState(0.1);
  const [currentWorld, setCurrentWorld] = useState<World | undefined>();

  useEffect(() => {
    if (!currentWorld) return;

    const interval = setInterval(() => {
      setCurrentWorld((previousWorld) => previousWorld?.generateNext());
    }, speed * 1000);

    return () => clearInterval(interval);
  }, [currentWorld, speed]);

  const calculateCellSize = useCallback((totalRows: number, totalCols: number) => {
    const boardTotalWidth = 450;
    const boardTotalHeight = 450;
    const sizeForWidth = boardTotalWidth / totalCols;
    const sizeForHeight = boardTotalHeight / totalRows;
    return Math.min(sizeForWidth, sizeForHeight);
  }, []);

  const createRandomCell = useCallback(() => {
    return new Cell(Math.random() > 0.5 ? CellState.alive : CellState.dead);
  }, []);

  const generateInitialCells = useCallback(
    (totalRows: number, totalCols: number) => {
      return Array.from({ length: totalRows }, () => Array.from({ length: totalCols }, () => createRandomCell()));
    },
    [createRandomCell]
  );

  const initialize = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newRows = Number(formData.get('rows'));
    const newCols = Number(formData.get('cols'));
    const newSpeed = Number(formData.get('speed'));

    setRows(newRows);
    setCols(newCols);
    setCellSize(calculateCellSize(newRows, newCols));
    setSpeed(newSpeed);
    setCurrentWorld(new World(generateInitialCells(newRows, newCols)));
  };

  return (
    <main style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
      <aside style={{ padding: '3rem', backgroundColor: 'var(--pico-secondary-background)', height: '100vh' }}>
        <h3>Configuración</h3>
        <form onSubmit={initialize} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: 'auto' }}>
          <label htmlFor="rows">Filas</label>
          <input id="rows" name="rows" type="number" defaultValue={rows} min="1" />

          <label htmlFor="cols">Columnas</label>
          <input id="cols" name="cols" type="number" defaultValue={cols} min="1" />

          <label htmlFor="speed">Velocidad (segundos)</label>
          <input id="speed" name="speed" type="number" defaultValue={speed} step="0.1" min="0.1" />

          <button type="submit">Generar</button>
        </form>
      </aside>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 0 1rem rgba(57, 205, 224, 0.8)',
          margin: '1rem',
        }}
      >
        <h1>El Juego de la Vida</h1>
        {!currentWorld && <p>Configura los parámetros y pulsa "Generar" para comenzar</p>}
        <section data-testid="board">
          {currentWorld?.isDead() ? (
            <div
              style={{
                textAlign: 'center',
                backgroundColor: 'var(--pico-secondary-background)',
                padding: '1rem',
                borderRadius: '0.5rem',
              }}
            >
              <h3>El mundo ha muerto</h3>
              <p>Configura los parámetros y pulsa "Generar" para comenzar de nuevo</p>
            </div>
          ) : (
            currentWorld?.cells.map((row, rowIndex) => (
              <div key={rowIndex} style={{ display: 'flex', gap: '0' }}>
                {row.map((cell, columnIndex) => (
                  <span
                    key={columnIndex}
                    style={{
                      display: 'inline-block',
                      height: `${cellSize}px`,
                      width: `${cellSize}px`,
                      backgroundColor: cell.isAlive() ? 'var(--pico-primary)' : 'transparent',
                      border: '0.1px solid rgba(255,255,255,0.05)',
                    }}
                  />
                ))}
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
