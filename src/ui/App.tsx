import { useEffect, useState } from 'react';
import { Cell, CellState } from '../core/Cell';
import { World } from '../core/World';
import styles from './App.module.css';
import { SetupForm } from './components/SetupForm';
import { Board } from './components/Board';

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
      <SetupForm onInitialize={initialize} />
      <div className={styles.boardContainer}>
        <h1>El Juego de la Vida</h1>
        <Board world={game?.world} cellSize={game?.cellSize ?? 0} />
      </div>
    </main>
  );
};

export default App;
