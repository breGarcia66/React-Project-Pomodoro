// css modules
import styles from './styles.module.css';

type defaultInputProps = {
  id: string;
  labelText: string;
} & React.ComponentProps<'input'>;

export function DefaultInput({
  id,
  labelText,
  type,
  ...props
}: defaultInputProps) {
  return (
    <>
      {labelText && <label htmlFor={id}>{labelText}</label>}
      <input
        className={styles.input}
        id={id}
        type={type}
        {...props}
      />
    </>
  );
}
