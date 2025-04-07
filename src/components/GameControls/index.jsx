import './GameControls.css'
import React, { useState } from 'react';

function GameControls({ drawCard, stopCards, isAddAvailable }) {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleClick = async () => {
        if (isAddAvailable || isButtonDisabled) return;

        setIsButtonDisabled(true);
        await drawCard(); // executa a função original
        await new Promise(res => setTimeout(res, 1000)); // delay de 1s
        setIsButtonDisabled(false);
    };

    return (
        <div className='container-gamecontrol'>
            <button
                className='add-card'
                onClick={handleClick}
                disabled={isAddAvailable || isButtonDisabled}
            >
                MAIS +
            </button>
            <button
                className='stop-card'
                disabled={isAddAvailable}
                onClick={stopCards}
            >
                PARAR X
            </button>
        </div>
    );
}

export default GameControls;
