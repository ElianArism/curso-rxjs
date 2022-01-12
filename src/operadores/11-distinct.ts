import { distinct, of, from } from "rxjs"
/**
 * Operador: distinct()
 * Solo deja pasar valores que no se emitieron previamente
 */

const numbers$ = of(11, 1, 1, 2, 3, 4, 5, 5, 6, 7, 7, 8, 8, 1, 11)

numbers$.pipe(distinct()).subscribe(console.log)

// Distinct con objetos
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
    name: "Messi",
    shirt: 20,
  },
  {
    name: "Neymar",
    shirt: 10,
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
 * Se utiliza un cb que retorne un boolean para filtrar
 */
from(psgPlayers)
  .pipe(distinct((p) => p.name))
  .subscribe((res) => {
    console.log(res)
  })
