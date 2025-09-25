import styles from './styles.module.css';

type containerProps = {
  children: React.ReactNode;
};

export function Container({ children }: containerProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
