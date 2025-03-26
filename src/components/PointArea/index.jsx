import './PointArea.css'

function PointArea () {
    return (
        <div className='pointarea-container'>
            <div className='player-points'>
                <div className='ct-1'>
                    <div>TOTAL DE PONTOS:</div>
                    <div className='status-points-1'>BLACKJACK!</div>
                </div>
            <div>PONTOS+PONTOS</div>
            </div>
            <div className='dealer-points'>
                <div className='ct-2'>
                    <div className='status-points-2'>10</div>
                    <div>:TOTAL DE PONTOS</div>
                </div>
                <div>PONTOS+PONTOS</div>
            </div>
        </div>
    )
}

export default PointArea