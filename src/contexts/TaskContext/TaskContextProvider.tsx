// hooks
import { useEffect, useState, useReducer } from 'react';

// task context
import { taskContext } from './taskContext';

// initial state
import { initialTaskState } from './initialTaskState';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, setState] = useState(initialTaskState);

  // useEffect(()=>{
  //   console.log(state);
  // }, [state]);

  type actionType = {
    type: string;
    payload?: {
      name: string;
      age: string;
      email: string;
    };
  };

  const user = {
    name: '',
    age: '',
    email: '',
  };

  const [myState, dispatchMyState] = useReducer((state, action: actionType) => {
    switch (action.type) {
      case 'UPDATE': {
        if (!action.payload) return state;

        var newState = structuredClone(state);
        newState = action.payload;

        return newState;
      }

      case 'RESET':
        return user;

      default:
        return state;
    }
  }, user);

  function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target);

    dispatchMyState({
      type: 'UPDATE',
      payload: {
        name: formData.get('name') as string,
        age: formData.get('age') as string,
        email: formData.get('email') as string,
      },
    });
  }

  function handleReset(){
    dispatchMyState({ type: 'RESET' });
  }

  return (
    <taskContext.Provider value={{ state, setState }}>
      <h1>Dados do usuário:</h1>
      <section>
        <p>Nome: {myState.name}</p>
        <p>Idade: {myState.age}</p>
        <p>Email: {myState.email}</p>
      </section>

      <form onSubmit={handleUpdate}>
        <input placeholder='nome' name='name' type='text' />
        <input placeholder='idade' name='age' type='text' />
        <input placeholder='email' name='email' type='text' />

        <button type='submit'>enviar</button>
        <button onClick={handleReset} type='button'>resetar</button>
      </form>
        
    </taskContext.Provider>
  );
}
