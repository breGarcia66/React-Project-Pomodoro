// Importações
import type { TaskModel } from '../../models/TaskModel';

export enum taskActionType {
  START_TASK = 'START_TASK',
  INTERRUPT_TASK = 'INTERRUPT_TASK',
  RESET_STATE = 'RESET_STATE',
};

type taskActionsWithPayload = {
  type: taskActionType.START_TASK;
  payload: TaskModel;
}

type taskActionsWithoutPayload = {
  type: taskActionType.RESET_STATE;
} | {
  type: taskActionType.INTERRUPT_TASK;
}
  
export type taskActionsModel = taskActionsWithPayload | taskActionsWithoutPayload;

