// importações
import { useEffect, useReducer } from 'react';
import { taskContext } from './taskContext';
import { taskReducer } from './taskReducer';
import { initialTaskState } from './initialTaskState';
import { TimerWorkerManager } from '../../workes/timerWorkerManager';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatchState] = useReducer(taskReducer ,initialTaskState);

  const worker = TimerWorkerManager.getInstance();
  worker.onmessage(event => {
    const countDownSeconds = event.data;
    console.log(countDownSeconds);

    if (countDownSeconds <= 0) {
      console.log('Worker finalizado. Fim da contagem');
      worker.terminate();
    }
  })

  useEffect(()=>{
    if (!state.activeTask) {
      console.log('Worker terminado por falta de tarefa ativa');
      worker.terminate();
    }

    worker.postMessage(state);
  }, [state]);

  return (
    <taskContext.Provider value={{ state, dispatchState }}>
      {children}  
    </taskContext.Provider>
  );
}
