import { interval, timer, Observer } from "rxjs"

/**
 * Creacion de observables con funciones de la libreria
 * Interval genera un observable que emite una secuencia de numeros
 * en un intervalo de tiempo
 * Firma
 * - interval(miliseconds: number)
 * Caracteristicas
 * - interval es asincrono por naturaleza
 *
 * Timer genera un observable que emite un valor despues de cierto tiempo y
 * luego de emitirlo el observable se completa
 *
 * Caracteristicas
 * - timer es asincrono por naturaleza
 *
 */

const observer: Observer<any> = {
  next: (next) => console.log("next: ", next),
  error: console.log,
  complete: () => console.log("Complete"),
}

/**
 * Creando observables mediante interval
 */
const interval$ = interval(1000)
// interval$.subscribe(observer)

/**
 * Creando observables mediante timer
 */

// const timer$ = timer(2000)
// timer$.subscribe(observer)

/**
 * NOTE: Al pasarle dos parametros, el timer emitira valores numericos
 * cada 'Y' tiempo pasado como segundo parametro, partiendo despues
 * de cumplir el 'X' tiempo pasado como primer parametro
 */
// const timer$ = timer(2000, 1000)
// timer$.subscribe(observer)

/**
 * Al timer tambien se le pueden pasar fechas como parametro
 * Y de esta manera se logran tareas como ejecutar cierta accion a la media noche
 * o todos los dias al medio dia disparar un callback que ejecute alguna instruccion, etc
 */

const todayAfterFiveSeconds = new Date() // today
todayAfterFiveSeconds.setSeconds(todayAfterFiveSeconds.getSeconds(), 5000) // today after five seconds

const timer$ = timer(todayAfterFiveSeconds)
timer$.subscribe(observer)
