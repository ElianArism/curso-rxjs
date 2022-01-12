import { interval, sample, fromEvent } from "rxjs"
/**
 * Operador sample(observable)
 * Este operador permite enlazar una fuente con otro observable
 * y este ultimo tiene la capacidad de tomar una muestra (sample)
 * cada ver que el primero (la fuente principal) haya emitido un valor
 */

const interval$ = interval(500) // emite valores cada 500ms
const click$ = fromEvent(document, "click")

/**
 * por mas que el primer obs emita valores cada 500ms, solo se va a
 * imprimir por pantalla un resultado cuando el obs click$ emita valores
 */
interval$.pipe(sample(click$)) //.subscribe(console.log)

// Otro ejemplo
const interval2$ = interval(5000) // emite valores cada 5000ms
const click2$ = fromEvent(document, "click")

/**
 * Por mas que se emitan 100 clicks,
 * solo se va a imprimir un valor cuando el interval lo emita
 */
interval2$.pipe(sample(click2$)).subscribe(console.log)
