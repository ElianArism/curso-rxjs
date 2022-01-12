import { range, tap } from "rxjs"
/**
 * Operadores: tap()
 * Se utiliza para disparar un callback como efecto secundario cuando
 * un observable emita un valor
 *
 * NOTE Las instrucciones colocadas en el tap no afectan el flujo
 * normal del observable
 *
 * Tambien se le puede pasar como parametro un observer, de tal manera que
 * se ejecutaria:
 * - next cuando el obs emita un valor,
 * - err cuando haya un error,
 * - complete o cuando se complete el observable
 */

const numbers$ = range(1, 5)

numbers$
  .pipe(
    tap({
      next: (val) => {
        console.log("tap: ", val)
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
        console.log("obs completed")
      },
    })
  )
  .subscribe({
    next: (val) => {
      console.log("next: ", val)
    },
  })
