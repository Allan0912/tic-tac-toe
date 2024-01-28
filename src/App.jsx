import { useState } from 'react'
import confetti from 'canvas-confetti'
import './App.css'

const Turns = { //Se definen los turnos
  X: "x",
  O: "o"
}

const Square = ({children,isSelected, updateBoard, index})=>{
  const className = `square ${isSelected ? 'is-selected' : ''}`
  const handleClick = () =>{
    updateBoard(index)
  }
  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WinnerCombos =[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6] 
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null)) //muestraa los cuadros nulos
  const [turn, setTurn] = useState(Turns.X)
  const [winner, SetWinner] = useState(null)

  const checkWinner = (boardToCheck)=>{
    //revisar combinaciones ganadoras 
    for (const combo of WinnerCombos){
      const [a,b,c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] && 
        boardToCheck[a] === boardToCheck[c] 
      ){
        return boardToCheck[a]
      }
    }
    return null
  }

  const resetGame = ()=>{
    setBoard(Array(9).fill(null))
    setTurn(Turns.X)
    SetWinner(null)
  }

  const checkEndGame = (newBoard)=>{
    //se revisa si no hay empate

    return newBoard.every((Square)=>Square !== null)
  }

  const updateBoard = (index) =>{
    //para que el board no sobre escriba cuando le de click
    if(board[index] || winner)return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === Turns.X ? Turns.O : Turns.X
    setTurn(newTurn)

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

     {
      winner !== null &&(
        <section className='winner'>
          <div className='text'>
            <h2>
              {
                winner === false
                  ? 'Empate'
                  : 'Gano: ' 
              }
            </h2>
            <header className='win'>
              {winner && <Square>{winner}</Square>}
            </header>
            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
          </div>
        </section>
      )
     }
    </main>
  )
}

export default App
