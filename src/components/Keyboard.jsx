import { useEffect } from 'react';
import './Keyboard.css';

const KEYBOARD_ROWS = 
[
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace']
]

const Keyboard = ({ onKeyPress }) => {

    useEffect(() => {
        const handleKeyDown = (event) => {
            const key = event.key;

            if(key === 'Backspace' || key === 'Enter' || /^[a-z]$/.test(key)) {
                event.preventDefault();
                onKeyPress(key.toUpperCase());
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    const handleClick = (key) => {
        onKeyPress(key.toUpperCase());
    }

    return (
        <div className="keyboard">
            {KEYBOARD_ROWS.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className="keyboard-row">
                        {row.map((key) => {
                            return (
                                <button 
                                    key={key}
                                    onClick={() => handleClick(key)}
                                    className={`keyboard-key ${
                                        key === 'Backspace' || key === 'Enter' 
                                        ? 'keyboard-key-wide' 
                                        : ''
                                    }`}
                                >
                                    {key === 'Backspace' ? '⌫' : key}
                                </button>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
};

export default Keyboard;