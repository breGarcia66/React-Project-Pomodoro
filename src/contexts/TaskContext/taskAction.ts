// Importações
import type { TaskModel } from '../../models/TaskModel';
import type { TaskStateModel } from '../../models/TaskStateModel';

export const taskActionType = {
  START_TASK: 'START_TASK',
  INTERRUPT_TASK: 'INTERRUPT_TASK',
  RESET_STATE: 'RESET_STATE',
  COUNT_DOW: 'COUNT_DOWN',
  COMPLETE_TASK: 'COMPLETE_TASK',
  CHANGE_SETTINGS: 'CHANGE_SETTINGS',
} as const;

type taskActionsWithPayload =
  | {
      type: typeof taskActionType.START_TASK;
      payload: TaskModel;
    }
  | {
      type: typeof taskActionType.COUNT_DOW;
      payload: { secondsRemaining: number };
    }
  | {
      type: typeof taskActionType.CHANGE_SETTINGS;
      payload: TaskStateModel['config'];
    };

type taskActionsWithoutPayload =
  | {
      type: typeof taskActionType.RESET_STATE;
    }
  | {
      type: typeof taskActionType.INTERRUPT_TASK;
    }
  | {
      type: typeof taskActionType.COMPLETE_TASK;
    };

export type taskActionsModel =
  | taskActionsWithPayload
  | taskActionsWithoutPayload;
