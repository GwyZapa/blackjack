import GameControls from '../GameControls'
import './Gameboard.css'

function Gameboard() {
    return (
        
        <div className="parent">
        <div className="div1"> </div>
        <div className="div2"> </div>
        <div className="div3"> </div>
        <div className="div4"> </div>
        <div className="div5"> </div>
        <div className="div6"> </div>
        <div className="div7"> </div>
        <div className="div8"> </div>
        <div className="div9"><GameControls></GameControls></div>
        <div className="div10"> </div>
        <div className="div11"> </div>
        </div>
    )
}

export default Gameboard