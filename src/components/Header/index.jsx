import './Header.css'

function Header (){
    return (
        <div className='bar'>
            <div className='container'>
            <div className='status-title'><h1>EM ANDAMENTO</h1></div>
            <div className='restart-button'><h1>REINICIAR</h1></div>
            <div className='logo'><img src='src\assets\BLACKjacklogo.png'></img></div>
            </div>
        </div>

    )
}
export default Header