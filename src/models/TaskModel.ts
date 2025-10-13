
// Dados referente a task em execução
// TaskStateModel
import type { TaskStateModel } from "./TaskStateModel";

export type TaskModel = {
  id: string;
  name: string;
  duration: number; // em minutos
  startDate: number;
  completeDate: number | null;
  interruptDate: number | null;
  type: keyof TaskStateModel['config']; // os valores das chaves de do atributo config
};
