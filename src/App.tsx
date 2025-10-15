// task provider
import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';

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
    <Home />
  </TaskContextProvider>
);
}
