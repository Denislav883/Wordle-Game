// Returns an array with 5 elemnents(either: correct, present or absent)
export const getLetterStates = (guess, solution) => {
    if(!guess || !solution) {
        return Array(5).fill('');
    }

    const states = Array(5).fill('absent');
    const solutionChars = [...solution];
    const guessChars = [...guess];

    // Mark green
    guessChars.forEach((char, i) => {
        if(char === solutionChars[i]) {
            states[i] = 'correct';
            solutionChars[i] = null;
        }
    })

    // Mark yellow
    guessChars.forEach((char, i) => {
        if(states[i] === 'correct') {
            return;
        }

        const solutionIndex = solutionChars.indexOf(char);

        if(solutionIndex !== -1) {
            states[i] = 'present'
            solutionChars[solutionIndex] = null
        }
    })


    return states;
}

export const getKeyboardStates = (guesses, solution) => {
    const keyStates = {};
    
    guesses.forEach((guess) => {
        if(!guess) return;

        const states = getLetterStates(guess, solution);

        [...guess].forEach((letter, i) => {
            const currentState = keyStates[letter] || 'unused';
            const newState = states[i];

            if(currentState === 'correct') {
                return;
            } else if(currentState === 'present' && newState !== 'correct') {
                return;
            }

            keyStates[letter] = newState;
        });
    });

    return keyStates;
}