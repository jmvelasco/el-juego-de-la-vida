import { useEffect, useState } from 'react';
import { useLifeWorldContext } from '../context/LifeWorldProvider';

const Board = (): React.ReactNode => {
  const { world, cellSize, speed } = useLifeWorldContext();
  const [currentWorld, setCurrentWorld] = useState(world);

  useEffect(() => {
    setCurrentWorld(world);
  }, [world]);

  useEffect(() => {
    if (!currentWorld) return;

    const interval = setInterval(() => {
      setCurrentWorld((previousWorld) => previousWorld?.generateNext());
    }, speed * 1000);

    return () => clearInterval(interval);
  }, [currentWorld, speed]);

  useEffect(() => {
    if (!currentWorld?.isDead()) {
      return;
    }

    const deathTimeout = setTimeout(() => {
      setCurrentWorld(undefined);
    }, 2000);

    return () => clearTimeout(deathTimeout);
  }, [currentWorld]);

  if (!world) {
    return <p>Configura los parámetros y pulsa "Generar" para comenzar.</p>;
  }

  if (!currentWorld) {
    return (
      <>
        <p>El mundo ha muerto.</p>
        <p>Configura los parámetros y pulsa "Generar" para comenzar de nuevo.</p>
      </>
    );
  }

  return (
    <section data-testid="board">
      {currentWorld.cells.map((row, rowIndex) => (
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
      ))}
    </section>
  );
};

export default Board;
