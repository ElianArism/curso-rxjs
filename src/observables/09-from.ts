import { from, Observer, of } from "rxjs"
/**
 * Creacion de observables con funciones de la libreria
 * from() crea un observable en base a un array, promise,
 * iterable, observable, etc. y devuelve la secuencia de valores
 * resultante
 */

const observer: Observer<any> = {
  next: (next) => console.log("next: ", next),
  error: console.log,
  complete: () => console.log("Complete"),
}

// Comparacion

/**
 * envia un arreglo de 5 elementos y se completa
 */
const of$ = of([1, 2, 3, 4, 5])
of$.subscribe(observer)

/**
 * En base al arreglo destructura sus elementos,
 * los envia en una secuencia de valores y se completa
 */
const from$ = from([1, 2, 3, 4, 5])
from$.subscribe(observer)

/**
 * Mas ejemplos
 */

/**
 * iterable to observable
 */

const generator = function* () {
  // yield == emitir valor
  yield "1st value"
  yield "2nd value"
  yield "3rd value"
  yield "4r  value"
  yield "5ve value"
}

const myIterable = generator()

const iterable$ = from(myIterable)
iterable$.subscribe(observer)

/**
 * Promise to observable usando from
 */
const promise$ = from(fetch("https://api.github.com/users/klerith"))

promise$.subscribe(async (res) => {
  console.log(res.ok)
  console.log(await res.json())
})
