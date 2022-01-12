import { fromEvent, map, debounceTime, filter, tap } from "rxjs"
import { ajax } from "rxjs/ajax"
import { pluck } from "rxjs/operators"
/**
 * Problema, se necesita implementar un buscador
 * para agregar buscar urls de github por usuario
 */

// HTML
const body = document.querySelector("body")
const orderLst = document.createElement("ol")
const textInput = document.createElement("input")

body.appendChild(textInput)
body.appendChild(orderLst)

// Streams
const input$ = fromEvent<KeyboardEvent>(textInput, "keyup")

input$
  .pipe(
    debounceTime(500),
    filter(({ code }) => code === "Enter"),
    /**
     * Al retornar un nuevo observable lo
     * que genera es una cadena y para tratarlo
     * sin operadores ocurriria lo siguiente
     */
    map((event: KeyboardEvent) => {
      const inputText = event.target["value"]
      return ajax.getJSON(`https://api.github.com/users/${inputText}`)
    })
  )
  .subscribe((ajaxResponse) => {
    // se subscribe al nuevo obs
    ajaxResponse
      .pipe(
        // se obtiene  de la respuesta la url
        pluck("url")
      )
      .subscribe((response) => {
        // se imprime la respuesta
        console.log(response)
      })
  })

/**
 * Para evitar esa complejidad agregada es que se
 * utilizan los operadores de transformacion
 */
