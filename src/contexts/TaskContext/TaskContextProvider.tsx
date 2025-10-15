// hooks
import { useState } from "react";

// task context
import { taskContext } from "./taskContext";

// initial state
import { initialTaskState } from "./initialTaskState";

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, setState] = useState(initialTaskState);

  return (
    <taskContext.Provider value={{ state, setState }}>
      {children}
    </taskContext.Provider>
  );
}
