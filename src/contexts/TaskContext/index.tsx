// models
import type { TaskStateModel } from '../../models/TaskStateModel';

// hooks
import { createContext, use, useContext, useState } from 'react';

type TaskContextProps = {
  state: TaskStateModel;
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
};

type TaskContextProviderProps = {
  children: React.ReactNode;
};

const initialState: TaskStateModel = {
  tasks: [],
  secondsRemaining: 0,
  formattedSecondsRemaining: '00:00',
  activeTask: null,
  currentCycle: 0,
  config: {
    workTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
  },
};

const contextInitialValue = {
  state: initialState,
  setState: () => console.log('valor inicial do contexto'),
};

export const taskContext = createContext<TaskContextProps>(contextInitialValue);

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, setState] = useState(initialState);

  return (
    <taskContext.Provider value={{ state, setState }}>
      {children}
    </taskContext.Provider>
  );
}

export function useTaskContext() {
  return useContext(taskContext);
}
