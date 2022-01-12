import { fromEvent } from "rxjs"

/**
 * Creacion de observables con funciones de la libreria
 * Crear observables de eventos con fromEvent
 */

const mouseEvent$ = fromEvent<MouseEvent>(
  document, // event.target
  "click" // event name
)

const keyboardEvent$ = fromEvent<KeyboardEvent>(document, "keyup")

mouseEvent$.subscribe((event) => {
  console.log("[click target]: ", event.target)
  console.log("[Mouse coords x]: ", event.x)
  console.log("[Mouse coords y]: ", event.y)
})

keyboardEvent$.subscribe(({ key, code }) => {
  console.log("[key]: ", key)
  console.log("[code]: ", code)
})
