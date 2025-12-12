// Hooks
import { useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

// Importações gerais
import { getNextCycle } from '../../utils/getNextCycle';
import type { TaskModel } from '../../models/TaskModel';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { taskActionType } from '../../contexts/TaskContext/taskAction';
import { showMessage } from '../../adapters/wrapperToastify';

// Compoenentes
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';

// Lucide icon
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';

export function MainForm() {
  const taskNameInput = useRef<HTMLInputElement>(null);

  const { state, dispatchState } = useTaskContext();

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  const tipsWhenActiveTask = {
    workTime: <span>Foque por {state.config.workTime}min</span>,
    shortBreakTime: <span>Descanse {state.config.shortBreakTime}min</span>,
    longBreakTime: <span>Descanse {state.config.longBreakTime}min</span>,
  };

  const tipsWhenNoActiveTask = {
    workTime: <span>Próximo ciclo é de {state.config.workTime}min</span>,
    shortBreakTime: <span>Próximo descanso é de {state.config.shortBreakTime}min</span>,
    longBreakTime: <span>Próximo descanso é de {state.config.longBreakTime}min</span>,  
  }

  const lastTaskName = state.tasks[state.tasks.length]?.name || '';

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    showMessage.dismiss();

    if (!taskNameInput.current?.value.trim()) {
      showMessage.warn('Alerta: defina o nome da tarefa');
      return;
    }

    const taskName = taskNameInput.current.value.trim();

    const newTask: TaskModel = {
      id: (state.tasks.length + 1).toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    dispatchState({ type: taskActionType.START_TASK, payload: newTask });

    showMessage.success('Tarefa inicida');
  }

  function handleInterruptTask() {


    showMessage.dismiss();
    showMessage.toast('Tarefa interrompida');

    dispatchState({ type: taskActionType.INTERRUPT_TASK });
  }

  return (
    <form onSubmit={handleCreateNewTask} action='' className='form'>
      <div className='formRow'>
        <DefaultInput
          id='taskInput'
          type='text'
          labelText='Task:'
          placeholder='Digite algo...'
          ref={taskNameInput}
          disabled={!!state.activeTask}
          defaultValue={lastTaskName}
        />
      </div>

      <div className='formRow'>
        <span>
          {state.activeTask && tipsWhenActiveTask[state.activeTask.type]}
          {!state.activeTask && tipsWhenNoActiveTask[nextCycleType]}
        </span>
      </div>

      {state.currentCycle !== 0 && (
        <div className='formRow'>
          <Cycles />
        </div>
      )}

      <div className='formRow'>
        {!state.activeTask ? (
          <DefaultButton
            icon={<PlayCircleIcon />}
            type='submit'
            aria-label='Iniciar nova tarefa'
            title='Iniciar nova tarefa'
            key='submitButton'
          />
        ) : (
          <DefaultButton
            icon={<StopCircleIcon />}
            type='button'
            aria-label='Interromper tarefa atual'
            title='Interromper tarefa atual'
            color='red'
            key='interruptButton'
            onClick={handleInterruptTask}
          />
        )}
      </div>
    </form>
  );
}
