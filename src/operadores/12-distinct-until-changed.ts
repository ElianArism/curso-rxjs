import { of, from, distinctUntilChanged } from "rxjs"
/**
 * Operador: DistinctUntilChanged() = Distinto hasta que cambie
 * Si se ofrece de input un arr = [1,1,1,2,2,1,3,2,]
 * su output usando este operador sera = [1,2,1,3,2]
 */

const numbers$ = of(11, 1, 1, 2, "2", 2, 3, 4, 5, 5, 3, 4, 5, 6, 7, 7, 8, 8, 1, 11)

numbers$.pipe(distinctUntilChanged()).subscribe(console.log)

interface PSGPlayers {
  name: string
  shirt: number
}

const psgPlayers: PSGPlayers[] = [
  {
    name: "Neymar",
    shirt: 10,
  },
  {
    name: "Mbappe",
    shirt: 9,
  },
  {
    name: "Mbappe",
    shirt: 9,
  },
  {
    name: "Mbappe",
    shirt: 9,
  },
  {
    name: "Messi",
    shirt: 20,
  },
  {
    name: "Messi",
    shirt: 20,
  },
  {
    name: "Neymar",
    shirt: 10,
  },
  {
    name: "Messi",
    shirt: 20,
  },
  {
    name: "Mbappe",
    shirt: 9,
  },
  {
    name: "Messi",
    shirt: 20,
  },
]

/**
 * Cuando se trata de objetos se compara una propiedad especifica
 * entre el anterior (previous) y el actual (current)
 * Si los valores de dicha propiedad son iguales (true) entonces el
 * operador filtrara ese obj (porque ya se habra emitido una vez concurrentemente),
 * mientras que, si no son iguales (false) lo dejara pasar dado que asumira que ese valor
 * o nunca se emitio u se emitio pero fue hace x respuestas en el tiempo y corresponde
 * volver a emitirlo
 */
from(psgPlayers)
  .pipe(distinctUntilChanged((previous, current) => previous.name === current.name))
  .subscribe((res) => {
    console.log(res)
  })
