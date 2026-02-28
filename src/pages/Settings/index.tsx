// components
import { Container } from '../../components/Container';
import { DefaultInput } from '../../components/DefaultInput';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';

// context
import { taskActionType } from '../../contexts/TaskContext/taskAction';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

// icons
import { SaveIcon } from 'lucide-react';

// outros imports
import { useRef } from 'react';
import { MainTemplate } from '../../templates/MainTemplate';
import { showMessage } from '../../adapters/wrapperToastify';

export function Settings() {
  const { state, dispatchState } = useTaskContext();

  const workTimeRef = useRef<HTMLInputElement>(null);
  const shortBreakTimeRef = useRef<HTMLInputElement>(null);
  const longBreakTimeRef = useRef<HTMLInputElement>(null);

  function handleSaveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showMessage.dismiss();

    const workTimeInputRef = Number(workTimeRef.current?.value);
    const shortBreakTimeInputRef = Number(shortBreakTimeRef.current?.value);
    const longBreakTimeInputRef = Number(longBreakTimeRef.current?.value);

    const campos = {
      workTime: ['Foco', workTimeInputRef, 99],
      shotBreakTime: ['Descaso curto', shortBreakTimeInputRef, 30],
      longBreakTime: ['Descanso longo', longBreakTimeInputRef, 60],
    };

    Object.values(campos).forEach(campo => {
      if (
        Number(campo[1]) < 0 ||
        isNaN(Number(campo[1])) ||
        Number(campo[1]) > Number(campo[2])
      ) {
        showMessage.warning(
          `Por favor, use só números positivos entre 1 e ${campo[2]} em ${campo[0]}`,
        );

        throw new Error('Válores inválidos');
      }
    });

    dispatchState({
      type: taskActionType.CHANGE_SETTINGS,
      payload: {
        workTime: workTimeInputRef,
        shortBreakTime: shortBreakTimeInputRef,
        longBreakTime: longBreakTimeInputRef,
      },
    });

    showMessage.success('Novas alterações salvas');
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
              type='number'
              labelText='Foco'
              ref={workTimeRef}
              defaultValue={state.config.workTime}
              min={1}
              max={99}
            />
          </div>

          <div className='formRow'>
            <DefaultInput
              id='shortBreakTime'
              type='number'
              labelText='Descanso curto'
              ref={shortBreakTimeRef}
              defaultValue={state.config.shortBreakTime}
              min={1}
              max={30}
            />
          </div>

          <div className='formRow'>
            <DefaultInput
              id='longBreakTime'
              type='number'
              labelText='Descanso longo'
              ref={longBreakTimeRef}
              defaultValue={state.config.longBreakTime}
              min={1}
              max={60}
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
