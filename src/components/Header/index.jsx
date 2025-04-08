import './Header.css';

function Header({ gameStatus, isRestartVisible, statusColor,restartGame, currentRounds, showModal }) {


    return (
        <div className='bar'>
            <div className='container'>
                <div className='status-title'><h1 className={statusColor}>{gameStatus}</h1></div>

                <div className='center-container'>
                    <button
                        className="restart-button"
                        style={{ visibility: isRestartVisible ? "visible" : "hidden" }}
                        onClick={() => window.location.reload()} // Reinicia o jogo (opcional)
                    >
                        NOVA RODADA
                    </button>
                    <p className='rounds'>Rodada {currentRounds}</p>
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
                        style={{ visibility: isRestartVisible ? "visible" : "hidden" }}
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
