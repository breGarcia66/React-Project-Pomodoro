// Importações
import type { TaskModel } from '../../models/TaskModel';
import type { TaskStateModel } from '../../models/TaskStateModel';

export enum taskActionType {
  START_TASK = 'START_TASK',
  INTERRUPT_TASK = 'INTERRUPT_TASK',
  RESET_STATE = 'RESET_STATE',
  COUNT_DOW = 'COUNT_DOWN',
  COMPLETE_TASK = 'COMPLETE_TASK',
  CHANGE_SETTINGS = 'CHANGE_SETTINGS',
}

type taskActionsWithPayload =
  | {
      type: taskActionType.START_TASK;
      payload: TaskModel;
    }
  | {
      type: taskActionType.COUNT_DOW;
      payload: { secondsRemaining: number };
    }
  | {
      type: taskActionType.CHANGE_SETTINGS;
      payload: TaskStateModel['config'];
    };

type taskActionsWithoutPayload =
  | {
      type: taskActionType.RESET_STATE;
    }
  | {
      type: taskActionType.INTERRUPT_TASK;
    }
  | {
      type: taskActionType.COMPLETE_TASK;
    };

export type taskActionsModel =
  | taskActionsWithPayload
  | taskActionsWithoutPayload;
