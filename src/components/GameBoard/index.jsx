import useBlackJack from 'E:/PROJETOS_Prog/BlackJack_api/blackjack/src/hooks/useBlackJack'; // Ajuste o caminho se necessário
import useGetCard from 'E:/PROJETOS_Prog/BlackJack_api/blackjack/src/hooks/useGetCard'; // Ajuste o caminho se necessário

import GameControls from '../GameControls'
import './Gameboard.css'

function Gameboard({ cards, drawCard }) {


    return (

        <div className="parent">
            {/* div de controles */}
            <div className="div9"><GameControls drawCard={drawCard} ></GameControls></div>
            {/* Renderizar apenas as cartas do jogador (divs 1, 2, 3, 7, 8) */}
            {cards.slice(0, 5).map((card, index) => {
                // Mapear as cartas para as divs específicas do jogador
                const playerDivs = ["div1", "div2", "div3", "div7", "div8"];
                return (
                    <div key={index} className={playerDivs[index]}>
                        <img src={card.image} alt={`Carta ${card.code}`} />
                    </div>
                );
            })}
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
    )
}

export default Gameboard