import { of, range, asyncScheduler, observeOn } from "rxjs"

/**
 * Creacion de observables con funciones de la libreria
 * Crear un observable que emite una secuencia de numeros
 * en base a un rango
 *
 * Caracteristicas
 * - por defecto es sincrono
 * - si solo se le pasa un parametro X recorrera desde el 0
 *   hasta la cantidad de posiciones equivalentes a ese parametro X
 */

// const exampleWithOf$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
// exampleWithOf$.subscribe(console.log)

// const range$ = range(1, 10) // 1 ... 10
const range$ = range(3) // 0, 1, 2

console.log("inicio")
range$.subscribe(console.log) // por defecto range es sincrono
console.log("fin")

/**
 * el asyncScheduler transforma el range sincrono a uno asincrono
 */
/**
 * NOTE: Forma antigua (DEPRECATED)
  const asyncRange$ = range(1, 10, asyncScheduler)
  */
const asyncRange$ = range(1, 10).pipe(observeOn(asyncScheduler))

console.log("inicio")
asyncRange$.subscribe(console.log) // por defecto range es sincrono
console.log("fin")
