import { concat, interval, take } from "rxjs"
/**
 * Funcion: concat()
 * recibe observables, arreglos e iterables
 *
 * toma los observables pasados como parametro
 * y envia los valores del primero de forma secuencial
 * hasta que se complete, luego va
 * emitiendo valores del segundo de forma secuencial,
 * etc
 *
 * IMPORTANTE
 * Si el primer observable nunca se completa, nunca se
 * emitiran los valores de los demas observables pasados
 * como parametro
 *
 * Solo se completa una subscripcion al concat
 * si todos los observables que tiene en sus argumentos
 * se completaron
 */

const interval$ = interval(1000)

concat(interval$.pipe(take(3)), interval$.pipe(take(4))).subscribe((res) => {
  console.log(res)
})
