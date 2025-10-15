// hooks
import { useContext } from "react";

// task context
import { taskContext } from "./taskContext";

export function useTaskContext() {
  return useContext(taskContext);
}
