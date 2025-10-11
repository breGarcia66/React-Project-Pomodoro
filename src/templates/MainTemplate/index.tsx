// componentes
import { Container } from '../../components/Container';
import { Logo } from '../../components/Logo';
import { Menu } from '../../components/Menu';
import { Footer } from '../../components/Footer';

// css
import '../../styles/theme.css';
import '../../styles/global.css';

//tipagens
type mainTemplateProps = {
  children: React.ReactNode;
}

export function MainTemplate({ children }: mainTemplateProps) {
  return (
    <>
      <Container>
        <Logo />
      </Container>

      <Container>
        <Menu />
      </Container>

      {children}

      <Container>
        <Footer />
      </Container>
    </>
  );
}
