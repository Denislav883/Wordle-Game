import Grid from './components/Grid.jsx';
import Keyboard from './components/Keyboard.jsx';

import { useState } from 'react';

function App() {
    const [guesses, setGuesses] = useState([]);
    const [currentGuess, setCurrentGuess] = useState('');

    const handleKeyPress = (key) => {
        if(guesses.length === 6) {
            return;
        }

        if(key === 'ENTER') {

            if(currentGuess.length === 5) {
                setGuesses([...guesses, currentGuess]);
                setCurrentGuess('');
            }
        } else if(key === 'BACKSPACE') {
            setCurrentGuess((prev) => prev.slice(0, -1));
        } else if(currentGuess.length < 5) {
            setCurrentGuess((prev) => prev + key.toLowerCase());
        }
    }

    return (
        <div className='app'>
            <Grid guesses={guesses} currentGuess={currentGuess} />
            <Keyboard onKeyPress={handleKeyPress} />
        </div>
    )
}

export default App