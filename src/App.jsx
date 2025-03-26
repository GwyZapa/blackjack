import { useState } from 'react'
import viteLogo from '/vite.svg'
import Gameboard from './components/GameBoard'
import Header from './components/Header'
import PointArea from './components/PointArea'
// import './App.css'

function App() {
  return (
      <div className='App'>
        <Header></Header>
        <PointArea></PointArea>
        <Gameboard></Gameboard>
      </div>
    
  )
}

export default App
