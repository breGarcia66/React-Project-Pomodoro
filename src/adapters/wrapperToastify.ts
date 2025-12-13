import { Dialog } from '../components/Dialog';
import { toast } from 'react-toastify';

export const showMessage = {
  toast: (msg: string) => toast(msg),
  success: (msg: string) => toast.success(msg),
  info: (msg: string) => toast.info(msg),
  warn: (msg: string) => toast.warn(msg),
  warning: (msg: string) => toast.warning(msg),
  error: (msg: string) => toast.error(msg),
  dismiss: () => toast.dismiss(),
  confirm: (data: string, onClose: (confirmation: boolean) => void) =>
    toast(Dialog, {
      data,
      onClose: confirmation => {
        if (confirmation) return onClose(true);
        return onClose(false);
      },
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
    }),
};
