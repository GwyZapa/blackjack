import GameControls from '../GameControls'
import './Gameboard.css'

function Gameboard({ cards, dealerCards, drawCard, stopCards }) {
    const playerDivs = ["div1", "div2", "div3", "div7", "div8"];
    const dealerDivs = ["div4", "div5", "div6", "div10", "div11"];

    return (
        <div className="parent">
            {/* Controles do jogo */}
            <div className="div9">
                <GameControls drawCard={drawCard} stopCards={stopCards} />
            </div>

            {/* Cartas do jogador */}
            {cards.slice(0, 5).map((card, index) => (
                <div key={index} className={playerDivs[index]}>
                    <img src={card.image} alt={`Carta ${card.code}`} />
                </div>
            ))}

            {/* Cartas do Dealer */}
            {dealerCards.slice(0, 5).map((card, index) => (
                <div key={index} className={dealerDivs[index]}>
                    <img src={card.image} alt={`Carta ${card.code}`} />
                </div>
            ))}

            <div className="div1"><img src={cards.image}></img> </div>
            <div className="div2"><img src={cards.image}></img> </div>
            <div className="div3"><img src={cards.image}></img> </div>
            <div className="div4"><img src={cards.image}></img> </div>
            <div className="div5"><img src={cards.image}></img> </div>
            <div className="div6"><img src={cards.image}></img> </div>
            <div className="div7"><img src={cards.image}></img> </div>
            <div className="div8"><img src={cards.image}></img> </div>
            <div className="div10"><img src={cards.image}></img> </div>
            <div className="div11"><img src={cards.image}></img> </div>
        </div>


    );


}

export default Gameboard