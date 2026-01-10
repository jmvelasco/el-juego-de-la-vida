import { WorldOfLifeProvider } from './context/WorldOfLifeProvider';
import Board from './ui/Board';
import Setup from './ui/Setup';

const App = (): React.ReactNode => {
  return (
    <>
      <WorldOfLifeProvider>
        <main style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
          <div style={{ padding: '3rem', backgroundColor: 'var(--pico-secondary-background)' }}>
            <h3>Configuración</h3>
            <Setup />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 0 1rem rgba(57, 205, 224, 0.8)',
              margin: '1rem',
            }}
          >
            <h1>El Juego de la Vida</h1>
            <Board />
          </div>
        </main>
      </WorldOfLifeProvider>
    </>
  );
};

export default App;
