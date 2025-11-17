// Hooks
import { useContext, useRef } from 'react';

// Importações gerais
import { taskContext } from '../../contexts/TaskContext/taskContext';

// Compoenentes
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';


// Lucide icon
import { PlayCircleIcon } from 'lucide-react';

export function MainForm() {
  const valueRef = useRef<HTMLInputElement>(null);

  const {setState} = useContext(taskContext);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    setState(prevState => {
      const newState = structuredClone(prevState);

      newState.formattedSecondsRemaining = valueRef.current.value;

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
          ref={valueRef}
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
