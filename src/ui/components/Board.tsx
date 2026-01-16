import { World } from '../../core/World';
import styles from '../App.module.css';
import { Row } from './Row';

type BoardProps = {
  world: World | undefined;
  cellSize: number;
};

export const Board = ({ world, cellSize }: BoardProps) => {
  if (!world) {
    return <p>Configura los parámetros y pulsa "Generar" para comenzar</p>;
  }

  if (world.isDead()) {
    return (
      <div className={styles.emptyWorldMessage}>
        <h3>El mundo ha muerto</h3>
        <p>Configura los parámetros y pulsa "Generar" para comenzar de nuevo</p>
      </div>
    );
  }

  return (
    <section data-testid="board">
      {world.cells.map((row, index) => (
        <Row key={index} cells={row} cellSize={cellSize} />
      ))}
    </section>
  );
};
