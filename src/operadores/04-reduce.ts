import { interval, reduce, take } from "rxjs"
/**
 * operador: reducer()
 * Acumular valores y enviar valores cuando se complete
 */

// reduce en js
const numbers = [1, 2, 3, 4, 5]

const totalReducer = (acumulator: number, currentValue: number) => {
  return acumulator + currentValue
}

const total = numbers.reduce(totalReducer, 0)

console.log("total numbers: ", total)

// reducer rxjs
interval(1000)
  .pipe(
    // completa el observable despues de una cantidad entera
    // de valores emitidos
    take(3),
    // toma dos parametros 1: cb, 2: valor a acumular inicial (x def = 0)
    reduce(totalReducer)
  )
  .subscribe({
    next: (number) => {
      console.log("total numbers: ", number)
    },
    complete: () => {
      console.log("Complete")
    },
  })
