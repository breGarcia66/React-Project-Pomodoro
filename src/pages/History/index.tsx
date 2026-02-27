// Components
import { MainTemplate } from '../../templates/MainTemplate';
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import { DefaultButton } from '../../components/DefaultButton';

// Utils
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { sortTasks, type SortTasksOptions } from '../../utils/sortTask';

// hooks
import { useState, useEffect } from 'react';

// Context
import { taskActionType } from '../../contexts/TaskContext/taskAction';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

// Importações gerais
import { showMessage } from '../../adapters/wrapperToastify';
import { Trash2Icon } from 'lucide-react';

import styles from './styles.module.css';

export function History() {
  const { state, dispatchState } = useTaskContext();
  const hasTasks = state.tasks.length > 0;
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
  const [sortTasksOption, setSortTasksOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        field: 'startDate',
        direction: 'desc',
      };
    },
  );

  useEffect(() => {
    setSortTasksOptions(prevSortTasksOptions => ({
      ...prevSortTasksOptions,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevSortTasksOptions.direction,
        field: prevSortTasksOptions.field,
      }),
    }));
  }, [state.tasks]);

  useEffect(() => {
    if (!confirmClearHistory) return;

    setConfirmClearHistory(false);

    dispatchState({ type: taskActionType.RESET_STATE });
  }, [confirmClearHistory]);

  useEffect(() => {
    return () => {
      showMessage.dismiss();
    };
  }, []);

  function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
    const newDirection = sortTasksOption.direction === 'desc' ? 'asc' : 'desc';

    setSortTasksOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortTasksOption.tasks,
        field,
      }),
      direction: newDirection,
      field,
    });
  }

  function handleResetHistory() {
    showMessage.dismiss();
    showMessage.confirm('Apagar histórico?', confirmation => {
      setConfirmClearHistory(confirmation);
    });
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>Histórico</span>
          {hasTasks && (
            <span className={styles.buttonContainer}>
              <DefaultButton
                icon={<Trash2Icon />}
                color='red'
                title='Apagar histórico'
                aria-label='Apagar histórico'
                onClick={handleResetHistory}
              />
            </span>
          )}
        </Heading>
      </Container>

      <Container>
        {hasTasks && (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th
                    className={styles.sortTableOption}
                    onClick={() => handleSortTasks({ field: 'name' })}
                  >
                    Tarefa ↕
                  </th>
                  <th
                    className={styles.sortTableOption}
                    onClick={() => handleSortTasks({ field: 'duration' })}
                  >
                    Duração ↕
                  </th>
                  <th
                    className={styles.sortTableOption}
                    onClick={() => handleSortTasks({ field: 'startDate' })}
                  >
                    Data ↕
                  </th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>

              <tbody>
                {sortTasksOption.tasks.map(task => {
                  const taskTypeDict = {
                    workTime: 'foco',
                    shortBreakTime: 'descanso curto',
                    longBreakTime: 'descanso longo',
                  };

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
        )}
        {!hasTasks && (
          <p className={styles.textWhitoutTasks}>Não há tarefas ainda</p>
        )}
      </Container>
    </MainTemplate>
  );
}
