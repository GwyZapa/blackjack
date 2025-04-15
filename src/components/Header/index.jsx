import './Header.css';

function Header({ gameStatus, isRestartVisible, statusColor,restartGame, currentRounds, showModal, currentScore }) {

    function reloadGame(){
        
        setTimeout(() => {
            console.log("reload!");
            window.location.reload()
        }, 1000);
    }

    return (
        <div className='bar'>
            <div className='container'>
                <div className='status-title'><h1 className={statusColor}>{gameStatus}</h1></div>

                <div className='center-container'>
                    <button
                        className="restart-button"
                        style={{ visibility: isRestartVisible ? "visible" : "hidden" }}
                        onClick={() => reloadGame()} // Reinicia o jogo (opcional)
                    >
                        NOVA RODADA
                    </button>
                    <div className='center-flex'>
                    <p className='rounds'>Rodada {currentRounds}</p>
                    <p className='current-score'>pontos: {currentScore}</p>
                    </div>
                    <button
                        className="restartgame-button"
                        onClick={restartGame}
                        style={{ visibility: isRestartVisible ? "visible" : "hidden" }}
                    >
                        REINICIAR JOGO
                    </button>
                    <button
                        className="showmodal-button"
                        onClick={showModal}
                        
                    >
                        Ranking
                    </button>
                </div>
                <div className='logo'><img src='src/assets/BLACKjacklogo.png' alt="Logo" /></div>
            </div>
        </div>
    );
}

export default Header;
