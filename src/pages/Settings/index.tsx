import { MainTemplate } from '../../templates/MainTemplate';
import { Container } from '../../components/Container';
import { DefaultInput } from '../../components/DefaultInput';
import { DefaultButton } from '../../components/DefaultButton';
import { SaveIcon } from 'lucide-react';
import { Heading } from '../../components/Heading';
import { useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

export function Settings() {
  const { state } = useTaskContext();

  const workTimeRef = useRef<HTMLInputElement>(null);
  const shortBreakTimeRef = useRef<HTMLInputElement>(null);
  const longBreakTimeRef = useRef<HTMLInputElement>(null);

  function handleSaveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const workTimeInputRef = workTimeRef.current?.value;
    const shortBreakTimeInputRef = shortBreakTimeRef.current?.value;
    const longBreakTimeInputRef = longBreakTimeRef.current?.value;

    console.log(
      workTimeInputRef,
      shortBreakTimeInputRef,
      longBreakTimeInputRef,
    );
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>

      <Container>
        <p style={{ textAlign: 'center' }}>
          Altere as configurações de foco, descanso curto e longo
        </p>
      </Container>

      <Container>
        <form onSubmit={handleSaveSettings} className='form'>
          <div className='formRow'>
            <DefaultInput
              id='workTime'
              labelText='Foco'
              ref={workTimeRef}
              defaultValue={state.config.workTime}
            />
          </div>

          <div className='formRow'>
            <DefaultInput
              id='shortBreakTime'
              labelText='Descanso curto'
              ref={shortBreakTimeRef}
              defaultValue={state.config.shortBreakTime}
            />
          </div>

          <div className='formRow'>
            <DefaultInput
              id='longBreakTime'
              labelText='Descanso longo'
              ref={longBreakTimeRef}
              defaultValue={state.config.longBreakTime}
            />
          </div>

          <div className='formRow'>
            <DefaultButton
              icon={<SaveIcon />}
              aria-label='salvar configurações'
              title='salvar configurações'
            />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}
