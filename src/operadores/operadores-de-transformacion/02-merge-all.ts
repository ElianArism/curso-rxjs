import { fromEvent, map, debounceTime, filter, tap, Observable, of } from "rxjs"
import { ajax, AjaxResponse } from "rxjs/ajax"
import { mergeAll, pluck } from "rxjs/operators"
import { GithubUser } from "../../interfaces/github-users"

/**
 * Operador: mergeAll()
 * combina todos los valores recibidos por los obs y los devuelve
 * secuencialmente. El operador solo dispara el complete si todas
 * las fuentes se completaron.
 * Estos operadores que combinan varias entradas en una sola salida
 * se conocen como flattening operators (Operadores de aplanamiento)
 */

/**
 * Problema, se necesita implementar un buscador
 * para buscar todos los usuarios que coincidan
 * con un nombre ingresado por el input
 */

// HTML
const body = document.querySelector("body")
const orderLst = document.createElement("ol")
const textInput = document.createElement("input")

body.appendChild(textInput)
body.appendChild(orderLst)

// Streams
const input$ = fromEvent<KeyboardEvent>(textInput, "keyup")

/**
 * Se recomienda tipar tanto la entrada como la salida
 * del observable para que todos los elementos que se
 * subscriban luego tengan esa informacion disponible
 */
input$
  .pipe(
    debounceTime(500),
    filter<KeyboardEvent>(({ code }) => code === "Enter"),
    map<KeyboardEvent, Observable<AjaxResponse<GithubUser[]>>>((event: KeyboardEvent) => {
      const inputText = event.target["value"]
      // return ajax.getJSON(`https://api.github.com/users/${inputText}`) un user
      return ajax(`https://api.github.com/users?q=${inputText}`)
    }),
    mergeAll(),
    map<AjaxResponse<GithubUser[]>, GithubUser[]>((ajax) => ajax.response)
    /**
     * Al utilizar mergeAll el valor que dispare el nuevo
     * observable seguira con el flujo normal de la aplicacion
     * y no se comportara como si fuese un observable indepen-
     * diente al que haya que subscribirse por separado
     */
  )
  .subscribe((users) => {
    console.log(users)
    printResults(users)
  })

/**
 * Extra: Imprimir resultados en lista ordenada
 */

const printResults = (users: GithubUser[]) => {
  users.forEach((u) => {
    const li = document.createElement("li")
    li.innerHTML = `
      <img src="${u.avatar_url}" width="200" />
      <br/>
      Name: ${u.login}
      <br/>
      url: ${u.url}
    `
    orderLst.appendChild(li)
  })
}
