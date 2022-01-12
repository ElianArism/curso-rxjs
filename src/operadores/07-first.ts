import { first, fromEvent, Observable } from "rxjs"
/**
 * Operador: first()
 * POR DEFECTO: toma el primer valor del observable y se completa
 * PERSONALIZADO: se puede pasar un cb que resuelva un valor booleano
 * (como una condicion) y toma el valor que cumpla esa
 * condicion, luego se completa
 */
const observer = {
  next: (next) => console.log("Next: ", next),
  complete: () => console.log("Complete"),
}
const click$: Observable<MouseEvent> = fromEvent<MouseEvent>(document, "click")

// default
// click$.pipe(first()).subscribe(observer)

// with cb
click$.pipe(first<MouseEvent>(({ clientY }) => clientY >= 150)).subscribe(observer)
