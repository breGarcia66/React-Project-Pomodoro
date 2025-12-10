// Importações
import type { TaskModel } from '../../models/TaskModel';

export enum taskActionType {
  START_TASK = 'START_TASK',
  INTERRUPT_TASK = 'INTERRUPT_TASK',
  RESET_STATE = 'RESET_STATE',
  COUNT_DOW = 'COUNT_DOWN',
  COMPLETE_TASK = 'COMPLETE_TASK'
};

type taskActionsWithPayload = {
  type: taskActionType.START_TASK;
  payload: TaskModel;
} | {
  type: taskActionType.COUNT_DOW;
  payload: {secondsRemaining: number};
}

type taskActionsWithoutPayload = {
  type: taskActionType.RESET_STATE;
} | {
  type: taskActionType.INTERRUPT_TASK;
} | {
  type: taskActionType.COMPLETE_TASK;
}
  
export type taskActionsModel = taskActionsWithPayload | taskActionsWithoutPayload;

