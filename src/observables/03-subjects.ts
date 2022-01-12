import { Observer, Observable, Subscription, Subject, Subscriber } from "rxjs"
/**
 * Observable que emite una sucesion de numeros aleatorios
 */
const interval$ = new Observable<number>((subscriber) => {
  let i: number = 0

  const interval = setInterval(() => {
    i++
    subscriber.next(Math.round(Math.random() * 100))
  }, 3500)

  return () => {
    clearInterval(interval)
    console.log("Interval destruido")
  }
})

/**
 * Creacion de un observer
 */
const observer: Observer<number> = {
  next: (res) => console.log("[next]: ", res),
  error: (err) => console.log("ERR: ", err),
  complete: () => console.log("complete"),
}

/**
 * Subscripciones
 */

/**
 * NOTE: al hacerlo de esta manera cada suscripcion obtiene
 * un numero aleatorio distinto, ya que al generarse una instancia
 * del observable por cada subscripcion cada valor es distinto
 * Es decir: existen X instancias generando X numeros aleatorios
 * a la vez
 */
/**
 * Ejemplo sin subject
  const subscription_1: Subscription = interval$.subscribe((res) =>
    console.log("Subs 1 ", res)
  )
  const subscription_2: Subscription = interval$.subscribe((res) =>
    console.log("Subs 2 ", res)
  )
 */

/**
 * Crear un tipo de observable denominado Subject
 * Caracteristicas:
 * - 1. Casteo multiple: todas las subscripciones obtienen la misma informacion
 * - 2. Tambien es un observer
 * - 3. posee los metodos next(), error(), complete()
 * NOTE: Un subject permite transformar un COLD Observable en un
 * HOT Observable
 */
const subject$ = new Subject<number | string>()

/**
 * Usar de observer al subject
 */
const intervalSubscription: Subscription = interval$.subscribe(subject$)

/**
 * De esta manera se obtendria el mismo valor aleatorio,
 * es decir cada numero aleatorio creado es obtenido por todas
 * las subscripciones
 */
const subscription_1: Subscription = subject$.subscribe((res) =>
  console.log("Subs 1 ", res)
)
const subscription_2: Subscription = subject$.subscribe((res) =>
  console.log("Subs 2 ", res)
)
setTimeout(() => {
  /**
   * Al tener el subject$ tambien los metodos next complete and error
   * se puede ingresar al flujo de informacion del observable padre
   * y mutar los datos, enviar otros, filtrar
   * o incluso generar una excepcion
   */
  subject$.next("Subject.next() called")
  /**
   * Y al llamar al complete todos los subscribers dependientes
   * del subject dejaran de recibir informacion, sin embargo
   * la suscripcion del subject al interval en si nunca termino
   * por eso siempre es recomendable tomar la suscripcion
   * y desuscribirse manualmente para evitar fugas de memoria
   */
  subject$.complete()
}, 6000)

setTimeout(() => {
  /**
   * Limpiar suscripcion del interval
   */
  intervalSubscription.unsubscribe()
}, 8000)
