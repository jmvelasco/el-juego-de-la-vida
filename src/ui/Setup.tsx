import { useWorldOfLifeContext } from './context/WorldOfLifeProvider';

const Setup = (): React.ReactNode => {
  const { rows, cols, speed, initialize } = useWorldOfLifeContext();
  return (
    <form onSubmit={initialize} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: 'auto' }}>
      <label htmlFor="rows">Filas</label>
      <input id="rows" name="rows" type="number" defaultValue={rows} min="1" />

      <label htmlFor="cols">Columnas</label>
      <input id="cols" name="cols" type="number" defaultValue={cols} min="1" />

      <label htmlFor="speed">Velocidad (segundos)</label>
      <input id="speed" name="speed" type="number" defaultValue={speed} step="0.1" min="0.1" />

      <button type="submit">Generar</button>
    </form>
  );
};

export default Setup;
