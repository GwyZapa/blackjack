import { useState, useEffect, useRef } from 'react';
import Gameboard from './components/GameBoard';
import Header from './components/Header';
import PointArea from './components/PointArea';
import useBlackJack from './hooks/useBlackJack';
import useGetCard from './hooks/useGetCard';
import Ranking from './components/Ranking'

function App() {
    const deckId = useBlackJack();
    const { cards, drawCard } = useGetCard(deckId);

    const [totalpoints, setTotalPoints] = useState(0);
    const [gameStatus, setGameStatus] = useState("EM ANDAMENTO");
    const [dealerCards, setDealerCards] = useState([]);
    const [totalDealer, setTotalDealer] = useState(0);
    const [playerStopped, setPlayerStopped] = useState(false);
    const [statusColor, setStatusColor] = useState("neutral");
    const [rounds, setRounds] = useState(0)
    const [score, setScore] = useState(0);


    const currentRoundsRef = useRef(0)
    const currentScoreRef = useRef(0)

    // Refs para armazenar os valores mais recentes
    const totalPointsRef = useRef(0);
    const totalDealerRef = useRef(0);

    const [isRestartVisible, setIsRestartVisible] = useState(false);
    const [isShowRanking, setIsShowRanking] = useState(false);




    const visRestart = () => {
        setIsRestartVisible(true);
        setIsShowRanking(false);

    };

    // Restarta o jogo completo
    const restartGame = () => {
        setIsShowRanking(false);

        localStorage.removeItem("score")
        localStorage.removeItem("blackjack_rounds");
        setRounds(0);
        currentRoundsRef.current = 0;

        window.location.reload()
    }


    const showModal = () => {
        setIsShowRanking(true);

    }

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

    // Rounds
    useEffect(() => {
        const savedRounds = localStorage.getItem("blackjack_rounds");
        if (savedRounds) {
            setRounds(Number(savedRounds));
            currentRoundsRef.current = Number(savedRounds);
        } else {
            setRounds(1);
            currentRoundsRef.current = 1;
            localStorage.setItem("blackjack_rounds", 1);
        }


        if (currentRoundsRef.current == 11) {
            setIsShowRanking(true)
            restartGame()
        }
    }, []);


    // 1. Dealer recebe a primeira carta apenas uma vez
    const hasRun = useRef(false); // Controle de execução única

    useEffect(() => {
        if (deckId && !hasRun.current) {
            hasRun.current = true; // Marca como executado
            console.log("🚀 Dealer recebe a PRIMEIRA carta");
            drawDealerCard();
            verificaTurnoJ();
        }
        setIsShowRanking(false);
    }, [deckId]); // Dependência: deckId


    // 2. Atualiza pontos do jogador e verifica vencedor
    const arrayCardsRef = useRef([]);
    const lastTotalRef = useRef(null);

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
            setStatusColor("defeat");
            addScore("derrota")
            let currentRounds = currentRoundsRef.current;
            currentRounds++;
    
            setRounds(currentRounds - 1);
            currentRoundsRef.current = currentRounds;
            localStorage.setItem("blackjack_rounds", currentRounds);
            visRestart(); // Torna o botão visível sempre que o jogo termina
        } else if (!playerStopped) {
            if (calculatePoints(dealerCards) < 17 && calculatePoints(dealerCards) !== 21) {
                setTimeout(drawDealerCard, 1000);

            }
            else {
                setGameStatus("DEALER PAROU.")
            }
        }
        if (newPlayerTotal === 21) {

            stopCards()

        }
    }, [cards]);

    // 3. Atualiza pontos do Dealer
    useEffect(() => {
        const dTotal = calculatePoints(dealerCards);
        console.log(`🏦 Pontos do Dealer: ${dTotal}`);
        setTotalDealer(dTotal);
        totalDealerRef.current = dTotal; // Atualiza o ref
        if (dTotal > 21) {
            console.log("STOP!");

            checkWinner()
        } else if (dTotal < 21 && dTotal !== totalpoints && totalpoints !== 21) {
            verificaTurnoJ();
        } else if (dTotal === 21 && dTotal >= 17) {
            setGameStatus("DEALER PAROU.")

        }

    }, [dealerCards]);

    // 4. Função para puxar carta para o Dealer
    const drawDealerCard = async () => {
        const resp = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        const data = await resp.json();
        if (data.success && data.cards.length > 0) {
            const newCard = data.cards[0];
            setDealerCards(prev => [...prev, newCard]);
            return newCard;
        }
        return null;
    };


    // Scores e Ranking
    useEffect(() => {
        const currentScore = localStorage.getItem("score");

        if (currentScore) {
            setScore(Number(currentScore))
            currentScoreRef.current = Number(currentScore)
        } else {
            
            setScore(0);
            currentScoreRef.current = 0;
            console.log(currentScoreRef.current);
            localStorage.setItem("score", 0);
        }
    })


    function addScore(status) {
        const randomV = Math.floor(Math.random() * (38 - 20 + 1)) + 20;
        const randomD = Math.floor(Math.random() * (-20 - (-30) + 1)) + (-30);
        const randomE = Math.floor(Math.random() * (3 - (-2) + 1)) + (-2);

        if (status == "vitoria") {

            const prevScore = Number(localStorage.getItem("score")) || 0;
            const newScore = prevScore + randomV;
            setScore(newScore)
            localStorage.setItem("score", newScore);

        } else if (status == "derrota") {

            const prevScore = Number(localStorage.getItem("score")) || 0;
            const newScore = prevScore + randomD;
            setScore(newScore)
            localStorage.setItem("score", newScore);

        } else {

            const prevScore = Number(localStorage.getItem("score")) || 0;
            const newScore = prevScore + randomE;
            setScore(newScore)
            localStorage.setItem("score", newScore);

        }
        
    }

    // 5. Verifica o vencedor
    const checkWinner = () => {
        console.log(`⚖️ Verificando vencedor... Jogador: ${totalPointsRef.current} | Dealer: ${totalDealerRef.current}`);

        if (totalDealerRef.current > 21 && gameStatus!=="VITÓRIA! VOCÊ GANHOU") {
            setGameStatus("VITÓRIA! O DEALER ESTOUROU");
            setStatusColor("victory");
            addScore("vitoria")
            console.log(Number(localStorage.getItem("score")));
            
        } else if (totalPointsRef.current > 21) {
            setGameStatus("DERROTA! VOCÊ ESTOUROU");
            setStatusColor("defeat");
            addScore("derrota")
            console.log(Number(localStorage.getItem("score")));
        } else if (totalDealerRef.current > totalPointsRef.current) {
            setGameStatus("DERROTA! O DEALER GANHOU");
            setStatusColor("defeat");
            addScore("derrota")
            console.log(Number(localStorage.getItem("score")));
        } else if (totalDealerRef.current < totalPointsRef.current) {
            setGameStatus("VITÓRIA! VOCÊ GANHOU");
            setStatusColor("victory");
            addScore("vitoria")
        } else {
            setGameStatus("EMPATE!");
            setStatusColor("draw");
            addScore("empate")
        }
        let currentRounds = currentRoundsRef.current;
        currentRounds++;

        setRounds(currentRounds - 1);
        currentRoundsRef.current = currentRounds;
        localStorage.setItem("blackjack_rounds", currentRounds);
        console.log("📦 LocalStorage:", localStorage.getItem("blackjack_rounds"));

        visRestart(); // Torna o botão visível sempre que o jogo termina

    };

    // 6. O jogador decide parar
    const stopCards = () => {
        console.log("🚦 Jogador decidiu parar!");
        setPlayerStopped(true);
        // console.log(totalDealer + "-" + totalpoints);

        dealerTurn();


    };

    // 7. Turno do Dealer
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const dealerTurn = async () => {
        console.log("♠️ Turno do Dealer...");

        let localDealerCards = [...dealerCards];
        let dealerTotal = calculatePoints(localDealerCards);

        while (
            dealerTotal <= totalpoints &&
            dealerTotal < 17 &&
            dealerTotal <= 21
        ) {
            console.log("⏳ Dealer pensando...");

            const newCard = await drawDealerCard(); // ainda adiciona no estado oficial
            if (newCard) {
                localDealerCards.push(newCard); // atualiza a cópia local manualmente
                dealerTotal = calculatePoints(localDealerCards);
                console.log("🃏 Dealer total atualizado:", dealerTotal);
            }

            await sleep(1000);
        }


        if (dealerTotal >= 17 || dealerTotal > totalpoints && totalpoints !== 21) {
            checkWinner();

        }
    };


    const verificaTurnoJ = () => {
        setGameStatus("VEZ DO JOGADOR")
        setStatusColor("player");

    }
    const verificaTurnoD = () => {
        setGameStatus("VEZ DO DEALER")
        setStatusColor("dealer");
    }
    const closeRanking = () => {
        setIsShowRanking(false);
    };

    return (
        <div className='App'>
            <Ranking isShowRanking={isShowRanking} closeRanking={closeRanking} ></Ranking>
            <Header gameStatus={gameStatus} isRestartVisible={isRestartVisible} statusColor={statusColor} restartGame={restartGame} currentRounds={rounds} showModal={showModal} currentScore={score}/>
            <PointArea
                dealerCurrentPoints={dealerCards.map(card => card.code)}
                totalDealer={totalDealer}
                totalpoints={totalpoints}
                currentpoints={cards.map(card => card.code)}
            />
            <Gameboard
                cards={cards}
                drawCard={drawCard}
                stopCards={stopCards}
                dealerCards={dealerCards}
                playerStopped={playerStopped}
            />
        </div>
    );
}

export default App;
