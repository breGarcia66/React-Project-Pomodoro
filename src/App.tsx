import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';
import { MessagesComponent } from './components/MessagesComponent';

// pages
import { Home } from './pages/Home';
import { AboutPomodoro } from './pages/AboutPomodoro';
import { NotFound } from './pages/NotFound';

// css
import './styles/theme.css';
import './styles/global.css';

export function App() {
  return (
    <TaskContextProvider>
      <MessagesComponent>
        <Home />
      </MessagesComponent>
    </TaskContextProvider>
  );
}
