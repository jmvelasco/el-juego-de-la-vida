import { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react';
import { Cell, CellState } from '../core/Cell';
import { World } from '../core/World';

const BOARD_TOTAL_WIDTH = 450;
const BOARD_TOTAL_HEIGHT = 450;

interface LifeWorldContextType {
  rows: number;
  cols: number;
  cellSize: number;
  initialConfig: string;
  speed: number;
  world: World | undefined;
  initializeWorld: (event: React.FormEvent<HTMLFormElement>) => void;
}

const LifeWorldContext = createContext<LifeWorldContextType | undefined>(undefined);

const LifeWorldProvider = ({
  children,
  valueOverride,
}: {
  children: ReactNode;
  valueOverride?: Partial<LifeWorldContextType>;
}) => {
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);
  const [cellSize, setCellSize] = useState(1);
  const [world, setWorld] = useState<World | undefined>();
  const [initialConfig, setInitialConfig] = useState('random');
  const [speed, setSpeed] = useState(1);

  const setDimensions = useCallback((newRows: number, newCols: number) => {
    setRows(newRows);
    setCols(newCols);
    const sizeForWidth = BOARD_TOTAL_WIDTH / newCols;
    const sizeForHeight = BOARD_TOTAL_HEIGHT / newRows;
    setCellSize(Math.min(sizeForWidth, sizeForHeight));
  }, []);

  const createCell = useCallback(() => {
    return new Cell(Math.random() > 0.5 ? CellState.ALIVE : CellState.DEAD);
  }, []);

  const initializeWorld = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const newRows = Number(formData.get('rows'));
    const newCols = Number(formData.get('cols'));
    const newInitialConfig = formData.get('initialConfig') as string;
    const newSpeed = Number(formData.get('speed'));

    setDimensions(newRows, newCols);
    setInitialConfig(newInitialConfig);
    setSpeed(newSpeed);

    const cells = Array.from({ length: newRows }, () => Array.from({ length: newCols }, () => createCell()));
    setWorld(new World(cells));
  };

  const value = useMemo(
    () => ({
      rows,
      cols,
      initialConfig,
      speed,
      world,
      cellSize,
      initializeWorld,
      ...valueOverride,
    }),
    [rows, cols, initialConfig, world, cellSize, speed, valueOverride]
  );

  return <LifeWorldContext.Provider value={value}>{children}</LifeWorldContext.Provider>;
};

const useLifeWorldContext = () => {
  const context = useContext(LifeWorldContext);
  if (!context) {
    throw new Error('useLifeWorldContext must be used within a LifeWorldProvider');
  }
  return context;
};

export { LifeWorldProvider, useLifeWorldContext };
