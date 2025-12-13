// importações
import { useEffect, useReducer, useRef } from 'react';
import { taskContext } from './taskContext';
import { taskReducer } from './taskReducer';
import { initialTaskState } from './initialTaskState';
import { TimerWorkerManager } from '../../workes/TimerWorkerManager';
import { taskActionType } from './taskAction';
import { loadBeep } from '../../utils/loadBeep';
import { showMessage } from '../../adapters/wrapperToastify';
import type { TaskStateModel } from '../../models/TaskStateModel';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatchState] = useReducer(taskReducer, initialTaskState, (): TaskStateModel => {
    const localStorageState = localStorage.getItem('state');
    
    if (!localStorageState) return initialTaskState;

    const parseState = JSON.parse(localStorageState) as TaskStateModel;
    
    const newState = structuredClone(parseState);
    newState.secondsRemaining = 0;
    newState.activeTask = null;
    newState.formattedSecondsRemaining = '00:00';
    
    return newState;
  });
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
      
      showMessage.success(`Tarefa ${state.tasks.length - 1} completada`)

      worker.terminate();
    } else {
      dispatchState({
        type: taskActionType.COUNT_DOW,
        payload: { secondsRemaining: countDownSeconds },
      });
    }
  });

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));

    if (!state.activeTask) {
      worker.terminate();
    }

    document.title = state.activeTask ? `${state.formattedSecondsRemaining} - Chronos Pomodoro` : 'Chronos Pomodoro'

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
