import './Header.css';

function Header({ gameStatus, isRestartVisible, statusColor }) {
    return (
        <div className='bar'>
            <div className='container'>
                <div className='status-title'><h1 className={statusColor}>{gameStatus}</h1></div>
                <button
                    className="restart-button"
                    style={{ visibility: isRestartVisible ? "visible" : "hidden" }}
                    onClick={() => window.location.reload()} // Reinicia o jogo (opcional)
                    >
                    REINICIAR
                </button>                
                <div className='logo'><img src='src/assets/BLACKjacklogo.png' alt="Logo" /></div>
            </div>
        </div>
    );
}

export default Header;
