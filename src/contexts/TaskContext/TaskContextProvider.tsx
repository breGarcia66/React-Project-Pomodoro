// importações
import { useEffect, useReducer } from 'react';
import { taskContext } from './taskContext';
import { taskReducer } from './taskReducer';
import { initialTaskState } from './initialTaskState';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatchState] = useReducer(taskReducer ,initialTaskState);

  useEffect(()=>{
    console.log(state);
  }, [state]);

  return (
    <taskContext.Provider value={{ state, dispatchState }}>
      {children}  
    </taskContext.Provider>
  );
}
