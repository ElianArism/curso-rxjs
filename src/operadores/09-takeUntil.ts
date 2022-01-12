import { interval, fromEvent, takeUntil } from "rxjs"

/**
 * Operador: takeUntil(observableX)
 *
 * permite que el observable emita valores pero cuando el observable
 * que se le pasa como parametro (representado como observableX)
 * emite un valor automaticamente completa el primero
 */

const btn = document.createElement("button")
btn.innerText = "Stop timer!"
document.querySelector("body").appendChild(btn)

const counter$ = interval(1000)
const clickEvent$ = fromEvent(btn, "click")

counter$
  .pipe(
    // cuando se haga click en el btn, el observable se completara
    takeUntil(clickEvent$)
  )
  .subscribe({
    next: (next) => console.log("next timer value: ", next),
    complete: () => console.log("Complete"),
  })
