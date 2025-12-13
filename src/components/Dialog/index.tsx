import type { ToastContentProps } from 'react-toastify';
import { DefaultButton } from '../DefaultButton';
import { EraserIcon, XIcon, FlagIcon } from 'lucide-react';

import styles from './styles.module.css';

export function Dialog({ closeToast, data }: ToastContentProps<string>) {
  return (
    <>
      <div className={styles.container}>      
        <div className={styles.content}>
          <FlagIcon />
          <p>{data}</p>
        </div>

        <div className={styles.buttonsContainer}>
          <DefaultButton
            onClick={() => closeToast(true)}
            icon={<EraserIcon />}
            title='Confirmar e apagar'
            aria-label='Confirmar e apagar'
          />

          <DefaultButton
            onClick={() => closeToast(false)}
            icon={<XIcon />}
            color='red'
            title='Cancelar ação'
            aria-label='Cancelar ação'
          />
        </div>
      </div>
    </>
  );
}
