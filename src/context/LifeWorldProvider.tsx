import { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react';
import { Cell, CellState } from '../core/Cell';
import { World } from '../core/World';

const boardTotalWidth = 450;
const boardTotalHeight = 450;

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

  const calculateCellSize = useCallback((totalRows: number, totalCols: number) => {
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

  const initializeWorld = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const newRows = Number(formData.get('rows'));
    const newCols = Number(formData.get('cols'));
    const newInitialConfig = formData.get('initialConfig') as string;
    const newSpeed = Number(formData.get('speed'));

    setRows(newRows);
    setCols(newCols);
    setCellSize(calculateCellSize(newRows, newCols));
    setInitialConfig(newInitialConfig);
    setSpeed(newSpeed);

    const initialCells = generateInitialCells(newRows, newCols);
    setWorld(new World(initialCells));
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
