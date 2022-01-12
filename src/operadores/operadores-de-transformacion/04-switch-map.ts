import { fromEvent, map, mergeMap, Observable, switchMap } from "rxjs"
import { ajax, AjaxResponse } from "rxjs/ajax"

/**
 * Operador: switchMap() => operador de aplanamiento
 * cuando la fuente emite el primer valor el switchMap la captura
 * en un cb y retorna el producto de un nuevo observable (los valores que emita)
 * igual que el mergeMap. Pero una vez que la fuente emita otro valor
 * el switchMap completara el primer observable cancelando la subscripcion (y las peticiones de este)
 * y pasara a centrarse en los resultados obtenidos unicamente por la nueva subscripcion
 */

/**
 * Ejercicio del buscador con switchMap
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
     * por cada evento del input switchMap ira cambiando de
     * scope a scope hasta que el usuario deje de teclear
     * enviando entonces una peticion de busqueda con la ultima
     * interaccion y no consumira mas recursos dado que
     * cancela tanto subscripciones como observables anteriores
     */
    switchMap<KeyboardEvent, Observable<AjaxResponse<any>>>((event: KeyboardEvent) => {
      const inputText = event.target["value"]
      return ajax(url + inputText)
    }),
    map<AjaxResponse<any>, any>((res) => res.response)
  )
  .subscribe((searchResults) => {
    console.log(searchResults)
  })
