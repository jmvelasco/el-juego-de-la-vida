import { Cell as CoreCell } from '../../core/Cell';
import styles from '../App.module.css';
import { Cell } from './Cell';

type RowProps = {
  cells: CoreCell[];
  cellSize: number;
};

export const Row = ({ cells, cellSize }: RowProps) => {
  return (
    <div className={styles.gridRow}>
      {cells.map((cell, index) => (
        <Cell key={index} isAlive={cell.isAlive()} size={cellSize} />
      ))}
    </div>
  );
};
