// hooks
import { createContext } from "react";

// models
import type { TaskStateModel } from "../../models/TaskStateModel";

// intial state
import { initialTaskState } from "./initialTaskState";

type TaskContextProps = {
  state: TaskStateModel;
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
};

const contextInitialValue = {
  state: initialTaskState,
  setState: () => console.log('valor inicial do contexto'),
};

export const taskContext = createContext<TaskContextProps>(contextInitialValue);
