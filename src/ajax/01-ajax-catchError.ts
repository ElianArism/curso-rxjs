import { of } from "rxjs"
import { ajax } from "rxjs/ajax"
import { pluck, catchError } from "rxjs/operators"

/**
 * Peticiones ajax usando rxjs
 * (ajax = asynnchronus javascript and xml)
 */

const _url = "https://api.github.com/users?per_page=5"

// el obj ajax es el equivalente a fetchAPI de js
ajax({ url: _url })
  .pipe(
    pluck("response"),
    /**
     * nuestra fuente emite valores, si ocurre algun error (cualquiera)
     * catchError lo atraparia.
     * Si o si catchError debe retornar un observable
     * podria ser un observable vacio o alguno con cierta informacion
     */
    catchError((err) => {
      console.warn("[err]: ", err)
      return of({ ok: false, data: [] })
    })
  )
  .subscribe((users) => console.log("[Users]: ", users))
