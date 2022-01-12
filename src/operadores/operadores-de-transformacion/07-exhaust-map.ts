import { concatMap, exhaustMap, fromEvent, interval, take } from "rxjs"

/**
 * Operador: exhaustMap() => operador de aplanamiento
 *
 * La fuente emite un valor y el exhaustMap
 * crea un obs que maneja una subs interna, emitiendo
 * sus valores hacia la salida.
 * Cuando la fuente emite otro valor pero todavia el
 * primer obs manejado por el exhaustMap no se completo,
 * entonces este ignora ese valor y no crea mas obs ni nada
 * Solo cuando se completa el observable actual dentro del
 * exhaustMap entonces se toma el siguiente valor emitido
 * por la fuente. Los valores que se hayan ignorado se pierden
 */

const interval$ = interval(500).pipe(take(3))
const click$ = fromEvent(document, "click")

click$
  .pipe(
    /*
      Da igual cuantos clicks se hagan, el exhaustMap solo
      maneja una subs interna, por lo que recien tomara 
      nuevos clicks al finalizar el interval

      Es util para controlar problemas de doble submit 
      o muchos eventos redundantes
     */
    exhaustMap(() => interval$)
  )
  .subscribe(console.log)
