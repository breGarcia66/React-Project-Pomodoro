import { MainTemplate } from '../../templates/MainTemplate';
import { Container } from '../../components/Container';
import { DefaultInput } from '../../components/DefaultInput';
import { DefaultButton } from '../../components/DefaultButton';
import { SaveIcon } from 'lucide-react';
import { Heading } from '../../components/Heading';

export function Settings() {
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
        <form action='' className='form'>
          <div className='formRow'>
            <DefaultInput id='workTime' labelText='Foco' />
          </div>

          <div className='formRow'>
            <DefaultInput id='shortBreakTime' labelText='Descanso curto' />
          </div>

          <div className='formRow'>
            <DefaultInput id='longBreakTime' labelText='Descanso longo' />
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
