// css modules
import styles from './styles.module.css';

type genericHtmlProps = {
  children: React.ReactNode;
};

export function GenericHtml({ children }: genericHtmlProps) {
  return <div className={styles.genericHtml}>{children}</div>;
}
