import { useState } from 'react'
import confetti from 'canvas-confetti'
import './App.css'
import { Square } from './components/Square'
import { Turns} from './constants'
import { checkWinner, checkEndGame} from './logic/board'
import { WinnerModal } from './components/WinnerModal'
function App() {
  const [board, setBoard] = useState(()=>{
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ?  JSON.parse(boardFromStorage): Array(9).fill(null) //muestraa los cuadros nulos
  }) 
  
  const [turn, setTurn] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? Turns.X
  })
  const [winner, SetWinner] = useState(null)

  

  const resetGame = ()=>{
    setBoard(Array(9).fill(null))
    setTurn(Turns.X)
    SetWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')

  }

  
  const updateBoard = (index) =>{
    //para que el board no sobre escriba cuando le de click
    if(board[index] || winner)return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === Turns.X ? Turns.O : Turns.X
    setTurn(newTurn)
    //Guardar partida 
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)


    //revisar si hay ganador

    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      SetWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      SetWinner(false) // empate
    }

  }
  return (
    <main className='board'>
      <h1>tic-tac-toe</h1>
      <button onClick={resetGame}>Reset game</button>
      <section className='game'>
        {
          board.map((square, index)=>{
            return(
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}>
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>   
        <Square  isSelected={turn === Turns.X}>
          {Turns.X}
        </Square>

        <Square isSelected={turn === Turns.O}>
          {Turns.O}
        </Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame} />       
    </main>
  )
}

export default App
