import { interval, fromEvent, mergeMap, switchMap } from "rxjs"

const interval$ = interval(1000)
const click$ = fromEvent(document, "click")

/**
 * Merge map puede tener infinitas subscripciones
 * internas activas
 */
click$.pipe(mergeMap(() => interval$)).subscribe(console.log)
/**
 * Switch map solo tiene una subscripcion interna
 * activa
 */
click$.pipe(switchMap(() => interval$)).subscribe(console.log)
