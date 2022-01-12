import { from, pluck, reduce, scan } from "rxjs"
/**
 * Operador: scan()
 * por cada valor emitido, opera con ese valor utilizando el cb
 * pasado como parametro lo envia y va acumulando todos los valores
 * para sumarlos con el siguiente valor
 */

const numbers = [1, 2, 3, 4, 5]

const totalAccumulator = (accumulator, current) => accumulator + current

// Reduce
from(numbers)
  .pipe(reduce(totalAccumulator, 0))
  .subscribe((res) => {
    console.log("resultado: ", res)
  })

// Scan
from(numbers)
  .pipe(scan(totalAccumulator, 0))
  .subscribe((res) => {
    console.log(res)
  })

/**
 * Tanto scan como reduce no son solo para valores numericos
 */

/**
 * Ejemplo: Implementacion patron redux con rxjs
 */
interface Player {
  id?: number
  age?: number
  name?: string
  points?: number
}

// simulacion de cadena de cambios
const players: Player[] = [
  {
    id: Date.now() * 100,
    age: 18,
    name: "Juan",
    points: 0,
  },
  {
    id: Date.now() * 100,
    age: 18,
    name: "Juan",
    points: 22,
  },
  {
    id: Date.now() * 100,
    age: 18,
    name: "Juan",
    points: 30,
  },
]

// state
const state$ = from(players).pipe(
  scan<Player, Player>(
    (state, current) => {
      return {
        ...state,
        ...current,
      }
    },
    { points: 10 }
  )
)

// subscribirse a los cambios de points
state$.pipe(pluck("points")).subscribe((points) => {
  console.log(points)
})
