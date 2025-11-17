// Hooks
import { useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

// Importações gerais
import type { TaskModel } from '../../models/TaskModel';

// Compoenentes
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';


// Lucide icon
import { PlayCircleIcon } from 'lucide-react';

export function MainForm() {
  const taskNameInput = useRef<HTMLInputElement>(null);
  const {state, setState} = useTaskContext()

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    if (!taskNameInput.current?.value.trim()){
      alert('Alerta: defina o nome da tarefa');
      return
    };
    
    const taskName = taskNameInput.current.value.trim();
    taskNameInput.current.value = '';

    const newTask: TaskModel = {
      id: (state.tasks.length + 1).toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: 1,
      type: 'workTime'
    }

    const secondsRemaining = newTask.duration * 60;

    setState(prevState => {
      const newState = structuredClone(prevState);
      
      newState.activeTask = newTask;
      newState.currentCycle = 1;
      newState.secondsRemaining = secondsRemaining;
      newState.tasks = [...newState.tasks, newTask]
      
      return newState;
    })
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
        />

      </div>

      <div className='formRow'>
        <Cycles />
      </div>

      <div className='formRow'>
        <DefaultButton icon={<PlayCircleIcon />}
        />
      </div>
    </form>
  );
}
