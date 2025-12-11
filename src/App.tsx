import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';
import { MessagesComponent } from './components/MessagesComponent';
import { MainRouter } from './routers/MainRouter/indes';

import './styles/theme.css';
import './styles/global.css';

export function App() {
  return (
    <TaskContextProvider>
      <MessagesComponent>
        <MainRouter />
      </MessagesComponent>
    </TaskContextProvider>
  );
}
