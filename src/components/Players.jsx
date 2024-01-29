import { Square } from "./Square"
import { Turns } from "../constants"



export function Players(){
    <section className='turn'>   
    <Square  isSelected={turn === Turns.X}>
      {Turns.X}
    </Square>

    <Square isSelected={turn === Turns.O}>
      {Turns.O}
    </Square>
  </section>
}