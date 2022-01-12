import { Observable, Observer } from "rxjs"

// Crear observables
const obs$: Observable<string> = new Observable<string>(
  /**
   * El constructor de Observable recibe un callback con la
   * capacidad de emitir valores. Al momento de subscribirse a
   * obs$ los valores enviados a traves de este callback son los
   * que se enviaran a traves del flujo de datos
   *
   * Por otro lado el parametro subscriber refiere al callback del
   * subscriptor, es decir, lo que cada subscriptor realiza al momento
   * de obtener los valores enviados por el observable
   * @param subscriber: Subscriber<T>
   *
   */
  (subscriber) => {
    subscriber.next("hola 1")
    subscriber.next("hola 2")
    subscriber.next("hola 3")
    subscriber.complete()
    /**
     * Despues del complete() el subscriber no recibira mas valores
     * enviados por el obs
     */
    subscriber.next("hola 4")
  }
)

// Formas de enviar observers en el subscribe
// Solo obtener lo retornado por obs$.next()
obs$.subscribe((res) => {
  console.log(res)
})

// Un cb por cada caso, next, error o complete (DEPRECATED)
obs$.subscribe(
  (res) => {},
  (err) => {},
  () => {}
)

// un obj con una prop por cada caso next, err o complete (recomendado)
const observer: Observer<string> = {
  next: console.log,
  error: (err) => console.log("ERR: ", err),
  complete: () => console.log("complete"),
}

obs$.subscribe(observer)
