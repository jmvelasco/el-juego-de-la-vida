import styles from '../App.module.css';

type CellProps = {
  isAlive: boolean;
  size: number;
};

export const Cell = ({ isAlive, size }: CellProps) => {
  const backgroundColor = isAlive ? 'var(--pico-primary)' : 'transparent';

  return (
    <span
      className={styles.gridCell}
      style={{
        height: `${size}px`,
        width: `${size}px`,
        backgroundColor,
      }}
    />
  );
};
