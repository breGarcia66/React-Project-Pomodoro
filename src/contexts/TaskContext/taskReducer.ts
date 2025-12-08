// importações
import type { TaskStateModel } from "../../models/TaskStateModel";
import { getNextCycle } from "../../utils/getNextCycle";
import { type taskActionsModel, taskActionType } from "./taskAction";
import { formatSecondsToMinutes } from "../../utils/formatSecondToMinutes";
import { initialTaskState } from "./initialTaskState";

export function taskReducer(state: TaskStateModel, action: taskActionsModel): TaskStateModel {
  const newState = structuredClone(state);
  
  switch(action.type) {
    case taskActionType.START_TASK:
      // setState(prevState => {
      //   const newState = structuredClone(prevState);

      //   newState.activeTask = newTask;
      //   newState.currentCycle = nextCycle;
      //   newState.secondsRemaining = secondsRemaining;
      //   newState.formattedSecondsRemaining =
      //     formatSecondsToMinutes(secondsRemaining);
      //   newState.tasks = [...newState.tasks, newTask];

      //   return newState;
      // });
      const nextCycle = getNextCycle(state.currentCycle);
      const secondsRemaining = action.payload.duration * 60;

      newState.activeTask = action.payload;
      newState.currentCycle = nextCycle;
      newState.secondsRemaining = secondsRemaining;
      newState.formattedSecondsRemaining = formatSecondsToMinutes(secondsRemaining);
      newState.tasks = [...newState.tasks, action.payload];

      return newState;

    case taskActionType.INTERRUPT_TASK:
      newState.activeTask = null;
      newState.secondsRemaining = 0;
      newState.formattedSecondsRemaining = '00:00';
      newState.tasks = state.tasks.map(task => {
        if(state.activeTask && state.activeTask.id === task.id) {
          return {...task, interruptDate: Date.now()};
        }
        return task;
      })
      
      return newState;

    case taskActionType.RESET_STATE:
      return initialTaskState;
  }
}