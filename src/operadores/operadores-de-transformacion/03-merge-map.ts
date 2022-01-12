import { mergeMap, of, interval, take, map, fromEvent, takeUntil, Observable } from "rxjs"
import { ajax, AjaxResponse } from "rxjs/ajax"
/**
 * Operador: mergeMap()
 * captura los valores obtenidos por la fuente
 * y permite mediante un callback mutar esa salida
 * enviando un nuevo observable y creando otro flujo
 *
 * Por cada nuevo valor emitido por la fuente, se crea
 * un nuevo observable y un nuevo flujo de datos
 * todos los valores de todos los flujos de datos se veran
 * reflejados en la salida
 *
 * Entonces en resumen: mergeMap permite mediante una entrada
 * crear multiples nuevas entradas y resolver sus salidas en
 * un unico flujo final
 *
 * Tendrian que completarse todos los observables internos
 * y la fuente para que mergeMap disparase el complete
 *
 * Este es otro operador de aplanamiento
 */

/**
 * NOTE
 * Primer ejemplo
 */
const words$ = of("a", "b", "c")

words$.pipe(
  // Por cada valor que emita la fuente se crea un interval
  mergeMap((word) =>
    interval(1000).pipe(
      map((i) => `${word}: ${i}`),
      take(3)
    )
  )
)
// .subscribe({
//   next: (next) => console.log(next),
//   complete: () => console.log("Complete"),
// })

/**
 * NOTE
 * Contar cuanto tiempo lleva presionado el click
 */

const mousedown$ = fromEvent(document, "mousedown")
const mouseup$ = fromEvent(document, "mouseup")
/**
 * con el constructor vacio emite una secuencia de numeros
 * a la mayor velocidad que se lo permite su infraestructura
 */
const interval$ = interval()

mousedown$
  .pipe(mergeMap(() => interval$.pipe(takeUntil(mouseup$))))
  .subscribe((timeLapse) => console.log(timeLapse))

/**
 * NOTE
 * Ejercicio del buscador con mergeMap, consideraciones
 */
const url = "https://httpbin.org/delay/1?arg="

const body = document.querySelector("body")
const textInput = document.createElement("input")

body.appendChild(textInput)

// Streams
const input$ = fromEvent<KeyboardEvent>(textInput, "keyup")
input$
  .pipe(
    /**
     * Al utilizar el mergeMap para este fin, por cada letra que el usuario
     * tipee se va a enviar una peticion http distinta y se devolvera su respectiva
     * respuesta, esto genera una cantidad de peticiones basura y realentiza la
     * aplicacion. Lo correcto seria usar otro operador
     */
    mergeMap<KeyboardEvent, Observable<AjaxResponse<any>>>((event: KeyboardEvent) => {
      const inputText = event.target["value"]
      return ajax(url + inputText)
    }),
    map<AjaxResponse<any>, any>((res) => res.response)
  )
  .subscribe((searchResults) => {
    console.log(searchResults)
  })
