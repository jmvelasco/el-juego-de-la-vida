import { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react';
import { Cell, CellState } from '../../core/Cell';
import { World } from '../../core/World';

interface WorldOfLifeContextType {
  rows: number;
  cols: number;
  cellSize: number;
  speed: number;
  world: World | undefined;
  initialize: (event: React.FormEvent<HTMLFormElement>) => void;
}

const WorldOfLifeContext = createContext<WorldOfLifeContextType | undefined>(undefined);

const WorldOfLifeProvider = ({
  children,
  injectedValuesOverriden,
}: {
  children: ReactNode;
  injectedValuesOverriden?: Partial<WorldOfLifeContextType>;
}) => {
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);
  const [cellSize, setCellSize] = useState(1);
  const [world, setWorld] = useState<World | undefined>();
  const [speed, setSpeed] = useState(1);

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
    setWorld(new World(generateInitialCells(newRows, newCols)));
  };

  const value = useMemo(
    () => ({
      rows,
      cols,
      speed,
      world,
      cellSize,
      initialize,
      ...injectedValuesOverriden,
    }),
    [rows, cols, world, cellSize, speed, injectedValuesOverriden]
  );

  return <WorldOfLifeContext.Provider value={value}>{children}</WorldOfLifeContext.Provider>;
};

const useWorldOfLifeContext = () => {
  const context = useContext(WorldOfLifeContext);
  if (!context) {
    throw new Error('useLifeWorldContext must be used within a LifeWorldProvider');
  }
  return context;
};

export { WorldOfLifeProvider, useWorldOfLifeContext };
