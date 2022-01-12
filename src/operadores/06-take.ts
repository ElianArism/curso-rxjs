import { of, take, range, interval, tap } from "rxjs"
/**
 * Operador: take()
 * take permite subscribirnos a un numero finito de valores emitidos
 * por el observable. Una vez que la cantidad de valores emitidos
 * supera el numero finito definido en take, este completa
 * el observable
 */

const numbers = of(10, 20, 30, 40, 50)

numbers.pipe(take(3)).subscribe({
  next: (numbers) => console.log("next: ", numbers),
  complete: () => console.log("Complete"),
})

/**
 * NOTE: take() cancela la ejecucion del observable una vez que
 * finaliza, por lo que se puede usar en vez del unsubscribe
 */

// Ejemplo
const observer = {
  next: (next) => console.log("next: ", next),
  complete: () => console.log("Complete"),
}

// se puede usar
interval(1000).pipe(take(5)).subscribe(observer)

// en vez de
const range$ = interval(1000).subscribe(observer)

setTimeout(() => {
  range$.unsubscribe()
}, 5000)
