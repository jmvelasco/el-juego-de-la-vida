import { useEffect, useState } from 'react';
import { Cell, CellState } from '../core/Cell';
import { World } from '../core/World';
import styles from './App.module.css';

const calculateCellSize = (totalRows: number, totalCols: number) => {
  const boardTotalWidth = 450;
  const boardTotalHeight = 450;
  const sizeForWidth = boardTotalWidth / totalCols;
  const sizeForHeight = boardTotalHeight / totalRows;
  return Math.min(sizeForWidth, sizeForHeight);
};

const createRandomCell = () => {
  return new Cell(Math.random() > 0.5 ? CellState.alive : CellState.dead);
};

const generateInitialCells = (totalRows: number, totalCols: number) => {
  return Array.from({ length: totalRows }, () => Array.from({ length: totalCols }, () => createRandomCell()));
};

type GameState = {
  world: World;
  cellSize: number;
  speed: number;
};

const App = (): React.ReactNode => {
  const [game, setGame] = useState<GameState | undefined>();

  useEffect(() => {
    if (!game?.world) return;

    const interval = setInterval(() => {
      setGame({ ...game, world: game.world.generateNext() });
    }, game.speed * 1000);

    return () => clearInterval(interval);
  }, [game]);

  const initialize = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newRows = Number(formData.get('rows'));
    const newCols = Number(formData.get('cols'));
    const newSpeed = Number(formData.get('speed'));
    setGame({
      world: new World(generateInitialCells(newRows, newCols)),
      cellSize: calculateCellSize(newRows, newCols),
      speed: newSpeed,
    });
  };

  return (
    <main className={styles.mainContainer}>
      <aside className={styles.settingsPanel}>
        <h3>Configuración</h3>
        <form onSubmit={initialize} className={styles.settingsForm}>
          <label htmlFor="rows">Filas</label>
          <input id="rows" name="rows" type="number" defaultValue={5} min="1" />

          <label htmlFor="cols">Columnas</label>
          <input id="cols" name="cols" type="number" defaultValue={5} min="1" />

          <label htmlFor="speed">Velocidad (segundos)</label>
          <input id="speed" name="speed" type="number" defaultValue={0.1} step="0.1" min="0.1" />

          <button type="submit">Generar</button>
        </form>
      </aside>
      <div className={styles.boardContainer}>
        <h1>El Juego de la Vida</h1>
        {!game?.world && <p>Configura los parámetros y pulsa "Generar" para comenzar</p>}
        <section data-testid="board">
          {game?.world?.isDead() ? (
            <div className={styles.emptyWorldMessage}>
              <h3>El mundo ha muerto</h3>
              <p>Configura los parámetros y pulsa "Generar" para comenzar de nuevo</p>
            </div>
          ) : (
            game?.world.cells.map((row, rowIndex) => (
              <div key={rowIndex} className={styles.gridRow}>
                {row.map((cell, columnIndex) => (
                  <span
                    key={columnIndex}
                    className={styles.gridCell}
                    style={{
                      height: `${game?.cellSize}px`,
                      width: `${game?.cellSize}px`,
                      backgroundColor: cell.isAlive() ? 'var(--pico-primary)' : 'transparent',
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
