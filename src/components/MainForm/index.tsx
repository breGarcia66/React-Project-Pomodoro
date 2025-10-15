// Compoenentes
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';

// Lucide icon
import { PlayCircleIcon } from 'lucide-react';

export function MainForm() {
  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log('Nova task');
  }
  
  return (
    <form onSubmit={handleCreateNewTask} action='' className='form'>
      <div className='formRow'>
        <DefaultInput
          id='taskInput'
          type='text'
          labelText='Task:'
          placeholder='Digite algo...'
        />
      </div>

      <div className='formRow'>
        <Cycles />
      </div>

      <div className='formRow'>
        <DefaultButton
          icon={<PlayCircleIcon />}
        />
      </div>
    </form>
  );
}
