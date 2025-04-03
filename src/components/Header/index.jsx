import './Header.css';

function Header({ gameStatus }) {
    return (
        <div className='bar'>
            <div className='container'>
                <div className='status-title'><h1>{gameStatus}</h1></div>
                <div className='restart-button'><h1>REINICIAR</h1></div>
                <div className='logo'><img src='src/assets/BLACKjacklogo.png' alt="Logo" /></div>
            </div>
        </div>
    );
}

export default Header;
