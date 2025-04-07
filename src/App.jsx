import { useState, useEffect, useRef } from 'react';
import Gameboard from './components/GameBoard';
import Header from './components/Header';
import PointArea from './components/PointArea';
import useBlackJack from './hooks/useBlackJack';
import useGetCard from './hooks/useGetCard';

function App() {
    const deckId = useBlackJack();
    const { cards, drawCard } = useGetCard(deckId);

    const [totalpoints, setTotalPoints] = useState(0);
    const [gameStatus, setGameStatus] = useState("EM ANDAMENTO");
    const [dealerCards, setDealerCards] = useState([]);
    const [dealerPoints, setDealerPoints] = useState(0);
    const [totalDealer, setTotalDealer] = useState(0);
    const [playerStopped, setPlayerStopped] = useState(false);

    // Refs para armazenar os valores mais recentes
    const totalPointsRef = useRef(0);
    const totalDealerRef = useRef(0);

    const [isRestartVisible, setIsRestartVisible] = useState(false);


    const visRestart = () => {
        setIsRestartVisible(true);
    };


    // Função utilitária para calcular os pontos de um array de cartas
    const calculatePoints = (cards) => {
        let total = 0;
        let aceCount = 0;
        cards.forEach(card => {
            const value = card.value;
            if (!isNaN(value)) {
                total += parseInt(value);
            } else if (value === 'ACE') {
                aceCount += 1;
                total += 11;
            } else {
                total += 10;
            }
        });
        while (total > 21 && aceCount > 0) {
            total -= 10;
            aceCount -= 1;
        }
        return total;
    };

    // 1. Dealer recebe a primeira carta apenas uma vez
    const hasRun = useRef(false); // Controle de execução única

    useEffect(() => {
        if (deckId && !hasRun.current) {
            hasRun.current = true; // Marca como executado
            console.log("🚀 Dealer recebe a PRIMEIRA carta");
            drawDealerCard();
            verificaTurnoJ();
        }
    }, [deckId]); // Dependência: deckId


    // 2. Atualiza pontos do jogador e verifica vencedor
    const arrayCardsRef = useRef([]);
    const lastTotalRef = useRef(null);
    console.log("DEBUG arrayCardsRef inicial:", arrayCardsRef.current);

    useEffect(() => {
        const newPlayerTotal = calculatePoints(cards);
        
        if (newPlayerTotal !== lastTotalRef.current && newPlayerTotal !== 0) {
            arrayCardsRef.current.push(newPlayerTotal);
            lastTotalRef.current = newPlayerTotal;
        }

        console.log(`🎴 Pontos do Jogador: ${newPlayerTotal} | Histórico: ${arrayCardsRef.current}`);
        setTotalPoints(newPlayerTotal);
        totalPointsRef.current = newPlayerTotal; // Atualiza o ref
        // debugger;
        verificaTurnoD();
        if (newPlayerTotal > 21) {
            setGameStatus("DERROTA! VOCÊ ESTOUROU");
            visRestart(); // Torna o botão visível sempre que o jogo termina
        } else if (!playerStopped) {
            if (calculatePoints(dealerCards) <17) {
                setTimeout(drawDealerCard, 1000);

            }
             else {
                setGameStatus("DEALER PAROU.")
            }
        }
        if (newPlayerTotal === 21) {

            checkWinner()

        }
    }, [cards]);

    // 3. Atualiza pontos do Dealer
    useEffect(() => {
        const dTotal = calculatePoints(dealerCards);
        console.log(`🏦 Pontos do Dealer: ${dTotal}`);
        setDealerPoints(dTotal);
        setTotalDealer(dTotal);
        totalDealerRef.current = dTotal; // Atualiza o ref
        if (dTotal > 21) {
            console.log("STOP!");

            checkWinner()
        } else if (dTotal < 21 && dTotal !== totalpoints) {
            verificaTurnoJ();
        } else if (dTotal === 21) {
            setGameStatus("DEALER PAROU.")

        }

    }, [dealerCards]);

    // 4. Função para puxar carta para o Dealer
    const drawDealerCard = () => {
        if (!deckId) return;
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            .then(resp => resp.json())
            .then(data => {
                if (data.success && data.cards.length > 0) {
                    console.log(`🃏 Dealer comprou: ${data.cards[0].code}`);
                    setDealerCards(prevCards => [...prevCards, data.cards[0]]);
                }
            })
            .catch(err => console.error("Erro ao pegar carta do dealer:", err));
    };

    // 5. Verifica o vencedor
    const checkWinner = () => {
        console.log(`⚖️ Verificando vencedor... Jogador: ${totalPointsRef.current} | Dealer: ${totalDealerRef.current}`);

        if (totalDealerRef.current > 21) {
            setGameStatus("VITÓRIA! O DEALER ESTOUROU");
        } else if (totalPointsRef.current > 21) {
            setGameStatus("DERROTA! VOCÊ ESTOUROU");
        } else if (totalDealerRef.current > totalPointsRef.current) {
            setGameStatus("DERROTA! O DEALER GANHOU");
        } else if (totalDealerRef.current < totalPointsRef.current) {
            setGameStatus("VITÓRIA! VOCÊ GANHOU");
        } else {
            setGameStatus("EMPATE!");
        }

        visRestart(); // Torna o botão visível sempre que o jogo termina

    };

    // 6. O jogador decide parar
    const stopCards = () => {
        console.log("🚦 Jogador decidiu parar!");
        setPlayerStopped(true);
        console.log(totalDealer + "-" + totalpoints);

        dealerTurn();


    };

    // 7. Turno do Dealer
    const dealerTurn = () => {
        console.log("♠️ Turno do Dealer...");
        let dealerTotal = totalDealerRef.current;

        const dealerPlay = () => {

            if (dealerTotal < totalpoints) {
                setTimeout(() => {
                    drawDealerCard();
                    dealerTotal = calculatePoints([...dealerCards, { value: "random" }]); // Simula uma carta
                    dealerPlay();
                }, 1000);
            } else {
                checkWinner();
            }
        };

        dealerPlay();
    };

    const verificaTurnoJ = () => {
        setGameStatus("VEZ DO JOGADOR")
    }
    const verificaTurnoD = () => {
        setGameStatus("VEZ DO DEALER")
    }

    return (
        <div className='App'>
            <Header gameStatus={gameStatus} isRestartVisible={isRestartVisible} />
            <PointArea
                dealerPoints={dealerPoints}
                totalDealer={totalDealer}
                totalpoints={totalpoints}
                currentpoints={cards.map(card => card.code)}
            />
            <Gameboard
                cards={cards}
                drawCard={drawCard}
                stopCards={stopCards}
                dealerCards={dealerCards}
            />
        </div>
    );
}

export default App;
