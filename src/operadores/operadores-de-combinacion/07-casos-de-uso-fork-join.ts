import { forkJoin, of } from "rxjs"
import { ajax } from "rxjs/ajax"
import { catchError } from "rxjs/operators"

/**
 * Caso de uso del forkJoin
 */

const github_api = `https://api.github.com/users`
const github_user = `ElianArism`

forkJoin({
  /**
   * Para evitar sobreescribir las peticiones podemos agregar
   * un catchError en cada peticion por separado, de esa forma
   * si una falla pero las demas son correctas se devolverian
   * los resultados correctos y el error capturado
   */
  user: ajax.getJSON(`${github_api}/${github_user}`).pipe(
    catchError((err) => {
      console.log(err)
      return of(err.message)
    })
  ),
  repositories: ajax
    .getJSON(`${github_api}/${github_user}/repos`)
    .pipe(
      catchError((err) => {
        console.log(err)
        return of(err.message)
      })
    ),
  gists: ajax.getJSON(`${github_api}/${github_user}/gists`).pipe(
    catchError((err) => {
      console.log(err)
      return of(err.message)
    })
  ),
})
  /**
 * Al capturar errores de esta forma estariamos sobreescribiendo
 * las respuestas de las peticiones que no hayan dado error 
 .pipe(
   catchError((err) => {
     console.log(err)
     return of(err.message)
    })
    )
*/
  .subscribe(console.log)
