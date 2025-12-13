// Components
import { MainTemplate } from '../../templates/MainTemplate';
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import { DefaultButton } from '../../components/DefaultButton';

// Utils
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { sortTasks } from '../../utils/sortTask';

// Importações gerais
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { Trash2Icon } from 'lucide-react';

import styles from './styles.module.css';

export function History() {
  const { state } = useTaskContext();


  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          <span className={styles.buttonContainer}>
            <DefaultButton
              icon={<Trash2Icon />}
              color='red'
              title='Apagar histórico'
              aria-label='Apagar histórico'
            />
          </span>
        </Heading>
      </Container>

      <Container>
        <div className={styles.responsiveTable}>
          <table>
            <thead>
              <tr>
                <th>Tarefa</th>
                <th>Duração</th>
                <th>Data</th>
                <th>Status</th>
                <th>Tipo</th>
              </tr>
            </thead>

            <tbody>
              {sortedTasks.map(task => {
                const taskTypeDict = {
                  workTime: 'foco',
                  shortBreakTime: 'descanso curto',
                  longBreakTime: 'descanso longo',
                }

                return (
                  <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>{task.duration} min</td>
                    <td>{formatDate(task.startDate)}</td>
                    <td>{getTaskStatus(task, state.activeTask)}</td>
                    <td>{taskTypeDict[task.type]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </MainTemplate>
  );
}
