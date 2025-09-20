import './styles/theme.css';
import './styles/global.css';

import { Heading } from './components/Heading';
import { TimerIcon } from 'lucide-react';

export function App() {
  return (
    <>
      <Heading>
        Hello, World
        <button> 
          <TimerIcon/>
        </button>
      </Heading>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero cum quae
        eum eos quod, repellat, culpa aperiam debitis quidem voluptatum numquam
        laborum error ratione voluptates facilis dolorem hic odio aliquam?
      </p>
    </>
  );
}
