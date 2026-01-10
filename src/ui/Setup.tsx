import { useLifeWorldContext } from '../context/LifeWorldProvider';

const Setup = (): React.ReactNode => {
  const { rows, cols, initialConfig, speed, initializeWorld } = useLifeWorldContext();
  return (
    <form onSubmit={initializeWorld} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: 'auto' }}>
      <label htmlFor="rows">Filas</label>
      <input id="rows" name="rows" type="number" defaultValue={rows} min="1" />

      <label htmlFor="cols">Columnas</label>
      <input id="cols" name="cols" type="number" defaultValue={cols} min="1" />

      <label htmlFor="initialConfig">Configuracion Inicial</label>
      <select id="initialConfig" name="initialConfig" defaultValue={initialConfig}>
        <option value="random">Aleatoria</option>
        <option value="glider">Glider</option>
        <option value="glider-gun">Glider Gun</option>
      </select>

      <label htmlFor="speed">Velocidad (segundos)</label>
      <input id="speed" name="speed" type="number" defaultValue={speed} step="0.1" min="0.1" />

      <button type="submit">Generar</button>
    </form>
  );
};

export default Setup;
