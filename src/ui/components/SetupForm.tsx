import styles from '../App.module.css';

type SetupFormProps = {
  onInitialize: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const SetupForm = ({ onInitialize }: SetupFormProps) => {
  return (
    <aside className={styles.settingsPanel}>
      <h3>Configuración</h3>
      <form onSubmit={onInitialize} className={styles.settingsForm}>
        <label htmlFor="rows">Filas</label>
        <input id="rows" name="rows" type="number" defaultValue={5} min="1" />

        <label htmlFor="cols">Columnas</label>
        <input id="cols" name="cols" type="number" defaultValue={5} min="1" />

        <label htmlFor="speed">Velocidad (segundos)</label>
        <input id="speed" name="speed" type="number" defaultValue={0.1} step="0.1" min="0.1" />

        <button type="submit">Generar</button>
      </form>
    </aside>
  );
};
