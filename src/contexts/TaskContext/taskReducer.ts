// importações
import type { TaskStateModel } from '../../models/TaskStateModel';
import { getNextCycle } from '../../utils/getNextCycle';
import { type taskActionsModel, taskActionType } from './taskAction';
import { formatSecondsToMinutes } from '../../utils/formatSecondToMinutes';

export function taskReducer(
  state: TaskStateModel,
  action: taskActionsModel,
): TaskStateModel {
  const newState = structuredClone(state);

  switch (action.type) {
    case taskActionType.START_TASK:
      const nextCycle = getNextCycle(state.currentCycle);
      const secondsRemaining = action.payload.duration * 60;

      newState.activeTask = action.payload;
      newState.currentCycle = nextCycle;
      newState.secondsRemaining = secondsRemaining;
      newState.formattedSecondsRemaining =
        formatSecondsToMinutes(secondsRemaining);
      newState.tasks = [...newState.tasks, action.payload];

      return newState;

    case taskActionType.INTERRUPT_TASK:
      newState.activeTask = null;
      newState.secondsRemaining = 0;
      newState.formattedSecondsRemaining = '00:00';
      newState.tasks = state.tasks.map(task => {
        if (state.activeTask && state.activeTask.id === task.id) {
          return { ...task, interruptDate: Date.now() };
        }
        return task;
      });

      return newState;

    case taskActionType.RESET_STATE:
      newState.tasks = [];
      return newState;

    case taskActionType.COUNT_DOW: {
      newState.secondsRemaining = action.payload.secondsRemaining;
      newState.formattedSecondsRemaining = formatSecondsToMinutes(
        action.payload.secondsRemaining,
      );

      return newState;
    }

    case taskActionType.COMPLETE_TASK: {
      newState.activeTask = null;
      newState.secondsRemaining = 0;
      newState.formattedSecondsRemaining = '00:00';
      newState.tasks = state.tasks.map(task => {
        if (state.activeTask && state.activeTask.id == task.id) {
          return { ...task, completeDate: Date.now() };
        }
        return task;
      });

      return newState;
    }

    case taskActionType.CHANGE_SETTINGS: {
      newState.config = {...action.payload}
      return newState;
    }
  }
}
