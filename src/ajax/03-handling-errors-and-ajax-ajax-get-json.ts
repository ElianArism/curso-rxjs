import { of } from "rxjs"
import { ajax, AjaxError } from "rxjs/ajax"
import { catchError } from "rxjs/operators"

const url = "https://httpbin.org/delay/1"

const handleError = (err: AjaxError) => {
  console.warn("[err]: ", err)
  return of({ ok: false, msg: "Ajax Err" })
}

/**
 * Diferencias entre ajax y ajax.getJSON
 */

// ajax devuelve mas informacion, su metodo en cambio
// solo retorna concretamente la respuesta del endpoint

const obs$ = ajax.getJSON(url, { "Content-Type": "application/json", test: "test" })
const obs2$ = ajax({ url, headers: { "Content-Type": "application/json", test: "test" } })

// obs$.pipe(catchError(handleError)).subscribe((data) => {
//   console.log("[ajax.getJSON data]:", data)
// })

// obs2$.pipe(catchError(handleError)).subscribe((data) => {
//   console.log("[ajax data]:", data)
// })

// otras maneras de handlear errores
/**
 * CONSIDERACIONES
 * - al handlear errores de esta manera el observable
 *   no llega a completarse, en cambio usando catchError
 *   si sucede el complete ya que ese metodo resuelve un
 *   observable
 */
const obs3$ = ajax({ url, headers: { "Content-Type": "application/json", test: "test" } })
obs3$.subscribe({
  next: (next) => console.log(next),
  error: (err) => console.log(err),
  complete: () => console.log("complete"),
})
