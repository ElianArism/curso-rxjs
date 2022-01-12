import { fromEvent, map, sampleTime } from "rxjs"

/**
 * Operador: sampleTime(ms)
 * sampleTime solo tomara el ultimo valor emitido por la fuente
 * despues del lapso de tiempo definido
 */

const click$ = fromEvent<MouseEvent>(document, "click")

click$
  .pipe(
    /**
     * Algo importante a tener en cuenta es el orden de los operadores
     * si yo en los 5 segundos lanzo 100 clicks, solo se tomara el evento numero
     * 100 y se operara con el en el map.
     * Sin embargo si yo pusiera primero el map, se operaria con los 100 eventos
     * y solo se tomaria el evento numero 100
     */
    sampleTime(5000),
    map(({ x, y }) => ({ x, y }))
  )
  .subscribe(console.log)
