import { useState, useEffect } from 'react';
import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunDimIcon } from 'lucide-react';
import styles from './styles.module.css';

type availableTheme = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<availableTheme>(() => {
    return localStorage.getItem('theme') as availableTheme || 'dark';
  });

  const nextTheme = {
    dark: <SunDimIcon />,
    light: <MoonIcon />
  }

  function handleThemeChange(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();

    setTheme(prevTheme => {
      return prevTheme === 'dark' ? 'light' : 'dark';
    })
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <nav className={styles.menu}>
      <a
        href='#'
        className={styles.menuLink}
        aria-label='Ir para a home page'
        title='Home Page'
      >
        <HouseIcon />
      </a>
      <a
        href='#'
        className={styles.menuLink}
        aria-label='Ver histórico'
        title='Histórico'
      >
        <HistoryIcon />
      </a>
      <a
        href='#'
        className={styles.menuLink}
        aria-label='Ir para configurações'
        title='Configurações'
      >
        <SettingsIcon />
      </a>
      <a
        href='#'
        className={styles.menuLink}
        aria-label='Muda tema'
        title='Tema'
        onClick={handleThemeChange}
      >
        {nextTheme[theme]}
      </a>
    </nav>
  );
}
