// importações
import { createContext } from "react";
import type { TaskStateModel } from "../../models/TaskStateModel";
import { initialTaskState } from "./initialTaskState";
import type { taskActionsModel } from "./taskAction";

type TaskContextProps = {
  state: TaskStateModel;
  dispatchState: React.Dispatch<taskActionsModel>;
};

const contextInitialValue = {
  state: initialTaskState,
  dispatchState: () => console.log('valor inicial do contexto'),
};

export const taskContext = createContext<TaskContextProps>(contextInitialValue);
