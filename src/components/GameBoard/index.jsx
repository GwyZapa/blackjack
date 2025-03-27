import useBlackJack from 'E:/PROJETOS_Prog/BlackJack_api/blackjack/src/hooks/useBlackJack'; // Ajuste o caminho se necessário
import useGetCard from 'E:/PROJETOS_Prog/BlackJack_api/blackjack/src/hooks/useGetCard'; // Ajuste o caminho se necessário
// import useGetCard from '../hooks/useGetCard';

import GameControls from '../GameControls'
import './Gameboard.css'

function Gameboard() {
    const deckId = useBlackJack(); // Chama o hook e recebe o deckId
    const { cards, drawCard } = useGetCard(deckId); // Usa o hook para puxar cartas

    return (

        <div className="parent">
            {[1, 2, 3, 7, 8].map((num, index) => (
                <div key={num} className={`div${num}`}>
                    {cards[index] && <img src={cards[index].image} alt={cards[index].code} />}
                </div>
            ))}
            {/* div de controles */}
            <div className="div9"><GameControls drawCard={drawCard} ></GameControls></div>

            {/* Cartas do dealer */}
            {[4, 5, 6, 10, 11].map((num, index) => (
                <div key={num} className={`div${num}`}>
                    {cards[index + 5] && <img src={cards[index + 5].image} alt={cards[index + 5].code} />}
                </div>
            ))}
        </div>
    )
}

export default Gameboard