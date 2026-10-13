import Grid from './components/Grid.jsx';
import Keyboard from './components/Keyboard.jsx';
import { getKeyboardStates } from './utils.js';
import { getRandomWord } from './wordService.js';

import { useEffect, useState } from 'react';

function App() {
    const [guesses, setGuesses] = useState([]);
    const [currentGuess, setCurrentGuess] = useState('');
    const [solution, setSolution] = useState('');

    const [isGameOver, setIsGameOver] = useState(false);


    useEffect(() => {
        const getSolution = async () => {
            const newSolution = await getRandomWord();
            setSolution(newSolution);
        };

        getSolution();
    }, [])

    const handleKeyPress = (key) => {
        if(guesses.length === 6) {
            return;
        }

        if(key === 'ENTER') {

            if(currentGuess.length === 5) {
                setGuesses([...guesses, currentGuess]);

                if(currentGuess === solution) {
                    setIsGameOver(true);
                    
                    setTimeout(() => {
                        alert('Congratulations, you have won!');
                    }, 1000);
                } else if(guesses.length === 5) {
                    setIsGameOver(true);
                    
                    setTimeout(() => {
                        alert(`Better luck next time! The word was ${solution.toUpperCase()}`);
                    }, 1000);
                }

                setCurrentGuess('');
            }
        } else if(key === 'BACKSPACE') {
            setCurrentGuess((prev) => prev.slice(0, -1));
        } else if(currentGuess.length < 5) {
            setCurrentGuess((prev) => prev + key.toLowerCase());
        }
    }

    const keyboardStates = getKeyboardStates(guesses, solution);

    return (
        <div className='app'>
            <Grid guesses={guesses} currentGuess={currentGuess} solution={solution}/>
            <Keyboard isGameOver={isGameOver} onKeyPress={handleKeyPress} keyboardStates={keyboardStates}/>
        </div>
    )
}

export default App