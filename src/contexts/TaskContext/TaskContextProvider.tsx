// importações
import { useEffect, useReducer, useRef } from 'react';
import { taskContext } from './taskContext';
import { taskReducer } from './taskReducer';
import { initialTaskState } from './initialTaskState';
import { TimerWorkerManager } from '../../workes/TimerWorkerManager';
import { taskActionType } from './taskAction';
import { loadBeep } from '../../utils/loadBeep';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatchState] = useReducer(taskReducer, initialTaskState);
  const playBeepRef = useRef<() => void>(null);

  const worker = TimerWorkerManager.getInstance();
  worker.onmessage(event => {
    const countDownSeconds = event.data;

    if (countDownSeconds <= 0) {
      if (playBeepRef.current) {
        playBeepRef.current();
        playBeepRef.current = null;
      };

      dispatchState({ type: taskActionType.COMPLETE_TASK });

      worker.terminate();
    } else {
      dispatchState({
        type: taskActionType.COUNT_DOW,
        payload: { secondsRemaining: countDownSeconds },
      });
    }
  });

  useEffect(() => {
    if (!state.activeTask) {
      worker.terminate();
    }

    worker.postMessage(state);
  }, [state]);

  useEffect(() => {
    if(state.activeTask && playBeepRef.current === null){
      playBeepRef.current = loadBeep();
    } else if (state.activeTask === null && playBeepRef.current !== null) {
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  return (
    <taskContext.Provider value={{ state, dispatchState }}>
      {children}
    </taskContext.Provider>
  );
}
