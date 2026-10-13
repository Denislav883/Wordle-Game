import './Grid.css';

const rows = 6;
const cols = 5;

const Grid = ({guesses, currentGuess}) => {
    const allGuesses = [...guesses];
    
    if(currentGuess) {
        allGuesses.push(currentGuess);
    }

    while(allGuesses.length < rows) {
        allGuesses.push('');
    }

    return (
        <div className="grid">
            {Array(rows).fill().map((_, rowIndex) => {

                return (
                    <div key={rowIndex} className="row">
                        {Array(cols).fill().map((_, colIndex) => {
                            const letter = allGuesses[rowIndex]?.[colIndex] || ''; //optional chaning if the first one is undefined there is no guess
                            return (
                                <div key={`${rowIndex}-${colIndex}`} className="cell">
                                    {letter}
                                </div>
                            )
                        })} 
                    </div>
                )
            })}
        </div>
    )
};

export default Grid;