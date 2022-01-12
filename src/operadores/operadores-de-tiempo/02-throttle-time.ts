import { asyncScheduler } from "rxjs"
import {
  debounceTime,
  fromEvent,
  map,
  pluck,
  distinctUntilChanged,
  throttleTime,
} from "rxjs"

/**
 * Operador: throttleTime(ms)
 * Cuando la fuente (observable) emite un valor el operador
 * empezara a contar la cantidad de tiempo pasada como parametro,
 * todos los demas valores emitidos por la fuente dentro de ese
 * intervalo de tiempo seran ignorados gracias a ese observable.
 * Cuando ese intervalo se termine, el operador dejara pasar
 * otro valor y comenzara el ciclo nuevamente
 */

// Ejemplo 1

/**
 * Da igual cuantos click se hagan, tomara solamente un click en
 * el intervalo de tiempo definido
 */
const click$ = fromEvent<PointerEvent>(document, "click").pipe(throttleTime(3000))
click$.subscribe(console.log)

// Ejemplo 2

/**
 * Utilizar throttleTime con inputs
 * Ejemplo de buscador: Si esto fuese un buscador
 * se puede configurar el operador para que devuelva
 * tanto el primer como el ultimo valor enviado en el
 * intervalo de tiempo, como tambien solo el ultimo
 * valor enviado en el intervalo de tiempo
 */

const input = document.createElement("input")
document.querySelector("body").appendChild(input)

const input$ = fromEvent<KeyboardEvent>(input, "keyup")
/**
 * Enviar primer y ultimo valor
 */
input$.pipe(
  throttleTime(1000, asyncScheduler, {
    leading: true, // comienzo
    trailing: true, // final,
  }),
  pluck("target", "value")
)
// .subscribe(console.log)
/**
 * Enviar ultimo valor
 */
input$
  .pipe(
    throttleTime(1000, asyncScheduler, {
      leading: false, // comienzo
      trailing: true, // final,
    }),
    pluck("target", "value")
  )
  .subscribe(console.log)
