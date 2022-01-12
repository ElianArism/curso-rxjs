import { interval, fromEvent, mergeMap, switchMap, take, concatMap } from "rxjs"

/**
 * Operador concatMap() => operador de aplanamiento
 *
 * por cada valor emitido por la fuente concatMap crea
 * una "cola de espera" y concatena el ultimo valor
 * emitido por la primer subscripcion interna antes
 * de completarse al primer valor emitido por la
 * siguiente subscripcion en la cola de espera
 * y asi hasta el infinito
 */

const interval$ = interval(500).pipe(take(3))
const click$ = fromEvent(document, "click")

click$
  .pipe(
    /*
      Ejecuta las  subscripciones de forma secuencial,
      cuando termina de emitir valores la primera, empieza la
      segunda, etc
    */
    concatMap(() => interval$)
  )
  .subscribe(console.log)
