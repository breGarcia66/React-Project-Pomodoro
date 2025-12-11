import gravitationalBeep from '../assets/audios/level-up-191997.mp3';

export function loadBeep() {
  const audio = new Audio(gravitationalBeep);
  audio.load();

  return () => {
    audio.currentTime = 0;
    audio.play().catch(error => console.log(`Erro ao tocar audio: ${error}`));
  };
};
