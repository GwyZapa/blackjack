import './GameControls.css'
import React from 'react';


function GameControls ({drawCard}) {
    return (
        <div className='container-gamecontrol'>
            <button className='add-card' onClick={drawCard}>MAIS +</button>
            <button className='stop-card'>PARAR X</button>
        </div>
    )
}

export default GameControls
