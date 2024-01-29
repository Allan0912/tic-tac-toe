import { WinnerCombos } from "../constants"
export const checkWinner = (boardToCheck)=>{
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

export const checkEndGame = (newBoard)=>{
    //se revisa si no hay empate

    return newBoard.every((Square)=>Square !== null)
}
