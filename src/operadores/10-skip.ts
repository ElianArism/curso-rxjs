import { fromEvent, interval, tap } from "rxjs"
import { skip, takeUntil } from "rxjs/operators"
/**
 * Operador: skip()
 * salta una cantidad x de emisiones del observable pasada como parametro
 */

const btn = document.createElement("button")
btn.innerText = "Stop timer!"
document.querySelector("body").appendChild(btn)

const counter$ = interval(1000)
const clickEvent$ = fromEvent(btn, "click").pipe(
  tap(() => console.log("tap antes skip")),
  // se salta la primer emision del evento
  skip(1),
  tap(() => console.log("tap despues skip"))
)

counter$
  .pipe(
    // cuando se haga click en el btn, el observable se completara
    takeUntil(clickEvent$)
  )
  .subscribe({
    next: (next) => console.log("next timer value: ", next),
    complete: () => console.log("Complete"),
  })
