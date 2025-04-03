import './GameControls.css'
import React from 'react';


function GameControls ({drawCard, stopCards}) {
    return (
        <div className='container-gamecontrol'>
            <button className='add-card' onClick={drawCard}>MAIS +</button>
            <button className='stop-card' onClick={stopCards}>PARAR X</button>
        </div>
    )
}

export default GameControls
