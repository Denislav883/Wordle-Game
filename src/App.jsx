import Grid from './components/Grid.jsx';
import Keyboard from './components/Keyboard.jsx';
import { getKeyboardStates } from './utils.js';
import { getRandomWord } from './wordService.js';

import { useEffect, useState } from 'react';

const GAME_STORAGE_KEY = 'wordle-game';

const loadSavedGame = () => {
    try {
        return JSON.parse(localStorage.getItem(GAME_STORAGE_KEY)) || {};
    } catch {
        return {};
    }
};

function App() {
    const [savedGame] = useState(loadSavedGame);
    const [guesses, setGuesses] = useState(savedGame.guesses || []);
    const [currentGuess, setCurrentGuess] = useState(savedGame.currentGuess || '');
    const [solution, setSolution] = useState(savedGame.solution || '');

    const [isGameOver, setIsGameOver] = useState(savedGame.isGameOver || false);
    const [gameResult, setGameResult] = useState(savedGame.gameResult || '');
    const [wordError, setWordError] = useState('');
    const [isLoadingWord, setIsLoadingWord] = useState(false);

    useEffect(() => {
        if (!solution) return;

        try {
            localStorage.setItem(GAME_STORAGE_KEY, JSON.stringify({
                guesses,
                currentGuess,
                solution,
                isGameOver,
                gameResult,
            }));
        } catch (error) {
            console.error('Could not save the current game.', error);
        }
    }, [guesses, currentGuess, solution, isGameOver, gameResult]);

    useEffect(() => {
        if (solution) return;

        const getSolution = async () => {
            const newSolution = await getRandomWord();

            if (newSolution) {
                setSolution(newSolution);
                setWordError('');
            } else {
                setWordError('Could not load a word. Check your connection and try again.');
            }
        };

        getSolution();
    }, [solution]);

    const handleKeyPress = (key) => {
        if (!solution || isGameOver || guesses.length === 6) {
            return;
        }

        if (key === 'ENTER') {

            if (currentGuess.length === 5) {
                setGuesses([...guesses, currentGuess]);

                if (currentGuess === solution) {
                    setIsGameOver(true);
                    setGameResult('won');
                } else if (guesses.length === 5) {
                    setIsGameOver(true);
                    setGameResult('lost');
                }

                setCurrentGuess('');
            }
        } else if (key === 'BACKSPACE') {
            setCurrentGuess((prev) => prev.slice(0, -1));
        } else if (currentGuess.length < 5) {
            setCurrentGuess((prev) => prev + key.toLowerCase());
        }
    }

    const handleNewGame = async () => {
        if (isLoadingWord) return;

        setIsLoadingWord(true);
        setWordError('');

        try {
            let newSolution = await getRandomWord();
            if (newSolution === solution) newSolution = await getRandomWord();

            if (!newSolution || newSolution === solution) {
                throw new Error('Could not get a different word.');
            }

            setSolution(newSolution);
            setGuesses([]);
            setCurrentGuess('');
            setIsGameOver(false);
            setGameResult('');
        } catch {
            setWordError('Could not load a new word. Check your connection and try again.');
        } finally {
            setIsLoadingWord(false);
        }
    };

    const keyboardStates = getKeyboardStates(guesses, solution);

    return (
        <div className='app'>
            <Grid guesses={guesses} currentGuess={currentGuess} solution={solution} />
            {!solution && (
                <div className="game-message" role={wordError ? 'alert' : 'status'}>
                    <p>{wordError || 'Loading word...'}</p>
                    {wordError && <button className="game-button" onClick={handleNewGame} disabled={isLoadingWord}>Try again</button>}
                </div>
            )}
            {isGameOver && (
                <section className={`game-result game-result-${gameResult}`} role="status" aria-live="polite">
                    <h1>{gameResult === 'won' ? 'Brilliant!' : 'Nice try!'}</h1>
                    <p>{gameResult === 'won'
                        ? `You solved it in ${guesses.length} ${guesses.length === 1 ? 'guess' : 'guesses'}.`
                        : `The word was ${solution.toUpperCase()}.`}</p>
                    {wordError && <p className="game-error">{wordError}</p>}
                    <button className="game-button" onClick={handleNewGame} disabled={isLoadingWord}>
                        {isLoadingWord ? 'Getting a new word...' : 'Play again'}
                    </button>
                </section>
            )}
            {!isGameOver && solution && (
                <Keyboard isGameOver={isGameOver} onKeyPress={handleKeyPress} keyboardStates={keyboardStates} />
            )}
        </div>
    )
}

export default App;