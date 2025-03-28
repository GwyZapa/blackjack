import { useState } from 'react'
import viteLogo from '/vite.svg'
import Gameboard from './components/GameBoard'
import Header from './components/Header'
import PointArea from './components/PointArea'
import useBlackJack from 'E:/PROJETOS_Prog/BlackJack_api/blackjack/src/hooks/useBlackJack'; // Ajuste o caminho se necessário
import useGetCard from 'E:/PROJETOS_Prog/BlackJack_api/blackjack/src/hooks/useGetCard'; // Ajuste o caminho se necessário

// import './App.css'

function App() {

  const deckId = useBlackJack(); // Chama o hook e recebe o deckId
  const { cards, drawCard } = useGetCard(deckId); // Usa o hook para puxar cartas

  const lastCard = cards.length > 0 ? cards[cards.length - 1] : null;


  return (
    
    <div className='App'>
      <Header></Header>
      <PointArea lastCardCode={lastCard ? lastCard.code : ""} ></PointArea>
      <Gameboard cards={cards} drawCard={drawCard}></Gameboard>
    </div>

  )
}

export default App
