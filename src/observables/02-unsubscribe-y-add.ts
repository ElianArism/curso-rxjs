import { Observer, Observable, Subscription } from "rxjs"
/**
 * Observable que emite una sucesion de numeros cada cierta cantidad de tiempo
 */
const interval$ = new Observable<number>((subscriber) => {
  let i: number = 0
  /**
   * Siempre que se subscribe a un observable se crea una instancia
   * de este, generando multiples intevalos que siguen corriendo
   * en 2do plano incluso luego de que todos los subscribers
   * hayan realizado el unsubscribe()
   * Eso puede generar incontables fallas en la  aplicacion y
   * fugas de memoria
   */
  const interval = setInterval(() => {
    i++
    subscriber.next(i)
  }, 1000)

  /**
   * REVIEW: COMPLETE() != UNSUBSCRIBE()
   * El metodo complete() dispara automaticamente el return
   * del observable, lo que implica que si se ejecuta un complete
   * no es necesario utilizar el unsubscribe ya que la ejecucion
   * de todas las instancias del observable finalizaran por si solas
     
   * Ejemplo: 
      setTimeout(() => {
        subscriber.complete()
      }, 5000)
   */

  /**
   * Para evitar el problema del interval, se puede utilizar
   * la funcion que retorna el observable cuando cualquier
   * subscriber llama al metodo unsubscribe() ( o se ejecuta complete() )
   * Se utiliza igual como se indica abajo:
   */
  return () => {
    /**
     * Limpiar memoria
     */
    clearInterval(interval)
  }
})

/**
 * Creacion de un observer
 */
const observer: Observer<number> = {
  next: (res) => console.log("NEXT: ", res),
  error: (err) => console.log("ERR: ", err),
  complete: () => console.log("complete"),
}

/**
 * Obtener referencia a la subscripcion para controlar
 * hasta que condicion un subscriber desea recibir valores
 */
const subscription_1: Subscription = interval$.subscribe(observer)
const subscription_2: Subscription = interval$.subscribe(observer)
const subscription_3: Subscription = interval$.subscribe(observer)

setTimeout(() => {
  subscription_1.unsubscribe()
}, 1000)

setTimeout(() => {
  subscription_2.unsubscribe()
}, 2000)

setTimeout(() => {
  subscription_3.unsubscribe()
}, 3000)

/**
 * Encadenar subscripciones es una forma mas limpia de tener
 * multiples subscribers, pero quiza no sea muy util implementarlo
 */
const subscription_4: Subscription = interval$.subscribe(observer)
const subscription_5: Subscription = interval$.subscribe(observer)
const subscription_6: Subscription = interval$.subscribe(observer)

subscription_4.add(subscription_5)
subscription_4.add(subscription_6)

setTimeout(() => {
  subscription_4.unsubscribe()
}, 6000)
