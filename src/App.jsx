import { useState } from 'react';
import Grid from './components/Grid.jsx';

function App() {
  const [guesses, setGuesses] = useState([]);

  return (
    <div className='app'>
      <Grid guesses={guesses} />
    </div>
  )
}

export default App