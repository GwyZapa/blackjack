import './PointArea.css';

function PointArea({ totalpoints, currentpoints, totalDealer, currentDealer }) {
    return (
        <div className='pointarea-container'>
            <div className='player-points'>
                <div className='ct-1'>
                    <div>TOTAL DE PONTOS:</div>
                    <div className='status-points-1'>{totalpoints}</div>
                </div>
                <div>{currentpoints.join(", ")}</div> {/* Exibe as cartas do jogador */}
            </div>
            <div className='dealer-points'>
                <div className='ct-2'>
                    <div className='status-points-2'>{totalDealer}</div>
                    <div>:TOTAL DE PONTOS</div>
                </div>
                <div>{currentDealer}</div>
            </div>
        </div>
    );
}

export default PointArea;
