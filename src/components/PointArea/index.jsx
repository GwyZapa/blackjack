import { useEffect, useState } from 'react';
import './PointArea.css'

function PointArea({ lastCardCode, currentdealer }) {
    const [currentpoints, setCurrentPoints] = useState([]);

    useEffect(() => {
        if (lastCardCode) {
            setCurrentPoints(prevPoints => [...prevPoints, lastCardCode]);
        }
    }, [lastCardCode]);

    let totaldealer = 0

    let totalpoints = 0;
    let aceCount = 0; // Contador de Ases
    
    currentpoints.forEach(cardCode => {
        let firstChar = cardCode.charAt(0); // Primeiro caractere do código da carta
    
        if (!isNaN(firstChar)) {
            // Se for número (2 a 9), converte para inteiro e soma
            totalpoints += parseInt(firstChar);
        } else if (firstChar === 'A') {
            // Ás pode valer 1 ou 11, então armazenamos e decidimos depois
            aceCount += 1;
            totalpoints += 11; // Consideramos 11 inicialmente
        } else {
            // J, Q, K ou 10 valem sempre 10 pontos
            totalpoints += 10;
        }
    });
    
    // Ajusta os Ases se a pontuação ultrapassar 21
    while (totalpoints > 21 && aceCount > 0) {
        totalpoints -= 10; // Reduz Ás de 11 para 1
        aceCount -= 1;
    }

    
    return (
        <div className='pointarea-container'>
            <div className='player-points'>
                <div className='ct-1'>
                    <div>TOTAL DE PONTOS:</div>
                    <div className='status-points-1'>{totalpoints}</div>
                </div>
                <div>{currentpoints.join(", ")}</div>
            </div>
            <div className='dealer-points'>
                <div className='ct-2'>
                    <div className='status-points-2'>{totaldealer}</div>
                    <div>:TOTAL DE PONTOS</div>
                </div>
                <div>{currentdealer}</div>
            </div>
        </div>
    )
}

export default PointArea