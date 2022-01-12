import { auditTime, fromEvent, pluck, tap } from "rxjs"
/**
 * Operador: auditTime(ms)
 *
 * cuando se emite un valor empieza a contar la cantidad
 * de tiempo definida, al finalizar emite el ultimo valor
 * emitido por la fuente
 *
 * Consideraciones
 * - Se emite 'a' pasan los 'x ms' y no se emitio otro valor
 *    ==> el operador envia 'a'
 * - Se emite 'a' pasan los 'x ms' y antes de que ocurra se
 *   emite 'b' y 'c' ==> el operador envia 'c'
 * - Se emite 'a' pasan los 'x ms', antes de que ocurra
 *   se completa el observable y se envia 'b'
 *   ==> el observable se completa y no emite mas valores
 */

const click$ = fromEvent(document, "click")

click$
  .pipe(
    pluck("x"),
    tap((value) => console.log("[tap]:", value)),
    auditTime(3000)
  )
  .subscribe(console.log)
