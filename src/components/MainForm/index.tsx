// Hooks
import { useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

// Importações gerais
import { getNextCycle } from '../../utils/getNextCycle';
import { formatSecondsToMinutes } from '../../utils/formatSecondToMinutes';
import type { TaskModel } from '../../models/TaskModel';
import { getNextCycleType } from '../../utils/getNextCycleType';

// Compoenentes
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';

// Lucide icon
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';

export function MainForm() {
  const taskNameInput = useRef<HTMLInputElement>(null);

  const { state, setState } = useTaskContext();

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!taskNameInput.current?.value.trim()) {
      alert('Alerta: defina o nome da tarefa');
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

    const secondsRemaining = newTask.duration * 60;

    setState(prevState => {
      const newState = structuredClone(prevState);

      newState.activeTask = newTask;
      newState.currentCycle = nextCycle;
      newState.secondsRemaining = secondsRemaining;
      newState.formattedSecondsRemaining =
        formatSecondsToMinutes(secondsRemaining);
      newState.tasks = [...newState.tasks, newTask];

      return newState;
    });
  }

  function handleInterruptTask() {
    setState(prevState => {
      const newState = structuredClone(prevState);

      newState.activeTask = null;
      newState.secondsRemaining = 0;
      newState.formattedSecondsRemaining = '00:00';
      newState.tasks = prevState.tasks.map(task => {
        if(prevState.activeTask && prevState.activeTask.id === task.id) {
          return {...task, interruptDate: Date.now()};
        }
        return task;
      })

      return newState;
    });
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
        />
      </div>

      <div className='formRow'>
        <span>
          O próximo ciclo será de {state.formattedSecondsRemaining} min
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
