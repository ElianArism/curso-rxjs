import { from, fromEvent, map, takeWhile } from "rxjs"
/**
 * Operador: takeWhile()
 * funciona como el take pero en vez de un valor entero
 * recibe un cb que devuelve una condicion (valor booleano)
 * mientras que sea verdadera los valores se emitiran
 * cuando no lo sea, se completa el observable
 *
 * el segundo parametro que recibe es inclusive, este ultimo
 * envia el valor que completo el observable si esta en true
 * por defecto es false
 */

const observer = {
  next: (next) => console.log("Next: ", next),
  complete: () => console.log("Complete"),
}

const mouseEvent$ = fromEvent<MouseEvent>(document, "click")

// registrar eventos cuando y >= 150
mouseEvent$
  .pipe(
    map(({ x, y }) => ({ x, y })),
    takeWhile(({ x, y }) => y >= 150)
  )
  .subscribe(observer)

// registrar eventos cuando x >= 150 y el click que no cumpla
// esa condicion y complete el observable
mouseEvent$
  .pipe(
    map(({ x, y }) => ({ x, y })),
    takeWhile(({ x, y }) => x >= 150, true)
  )
  .subscribe(observer)
