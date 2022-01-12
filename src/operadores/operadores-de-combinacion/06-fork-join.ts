import { of, interval, take, delay, forkJoin } from "rxjs"
/**
 * Operador: forkJoin()
 *
 * recibe un arr o un obj de observables finitos
 *
 * toma una serie de observables como parametro y
 * retorna los ultimos resultados de estos cuando se
 * completan
 */

const numbers$ = of(1, 2, 3, 4)
const interval$ = interval(1000).pipe(take(3))
const words$ = of("a", "b", "c", "d", "e").pipe(delay(4000))

/**
 * Ej 1: enviando un arr
 */
forkJoin([numbers$, interval$, words$]).subscribe((res) =>
  console.log(res)
)

/**
 * Ej 2: enviando un obj
 */
forkJoin({ numbers$, interval$, words$ }).subscribe((res) =>
  console.log(res)
)
