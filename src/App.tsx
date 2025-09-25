// compoenentes
import { Container } from './components/Container';
import { CountDown } from './components/CountDown';
import { Logo } from './components/Logo';
import { Menu } from './components/Menu';

// css
import './styles/theme.css';
import './styles/global.css';

export function App() {
  return <>
    <Container>
      <Logo />
    </Container>

    <Container>
      <Menu />
    </Container>

    <Container>
      <CountDown />
    </Container>
  </>;
}
