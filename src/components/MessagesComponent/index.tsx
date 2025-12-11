import { ToastContainer } from 'react-toastify';
import { Slide } from 'react-toastify/unstyled';

type messagesComponentProps = {
  children: React.ReactNode;
};

export function MessagesComponent({ children }: messagesComponentProps) {
  return (
    <>
      {children}

      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Slide}
      />
    </>
  );
}
