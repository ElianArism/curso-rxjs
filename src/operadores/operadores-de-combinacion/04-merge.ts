import { merge, fromEvent, map } from "rxjs"
import { pluck } from "rxjs/operators"
/**
 * Funcion: merge()
 * recibe observables
 *
 * la salida del merge sera la combinacion de los valores
 * emitidos por sus argumentos en forma secuencial
 *
 * a = 1----2--3--
 * b = x-b----c--d
 *
 * salida = 1 x b 2 c 3 d
 *
 * Solo se completa el merge cuando todos los observables
 * pasados como parametro se completan
 */

const keyup$ = fromEvent(document, "keyup")
const click$ = fromEvent(document, "click")

merge(keyup$.pipe(pluck("type")), click$.pipe(pluck("type"))).subscribe((res) => {
  console.log(res)
})
