import { fromEvent, tap, of, exhaustMap, Observable, map } from "rxjs"
import { ajax } from "rxjs/ajax"
import { catchError } from "rxjs/operators"

// Interface
interface httpResponse {
  ok: boolean
  token: string | null
}

// Utils
const httpLoginRequest = (body: {
  email: string
  password: string
}): Observable<httpResponse> =>
  ajax.post("https://reqres.in/api/login?delay=1", body).pipe(
    map(({ response }) => ({ ok: true, ...(response as { token: string }) })),
    catchError((err) =>
      of({
        ok: false,
        token: null,
      })
    )
  )

// HTML
const form = document.createElement("form")
const inputEmail = document.createElement("input")
const inputPass = document.createElement("input")
const submitBtn = document.createElement("button")

// Config
inputEmail.type = "email"
inputEmail.value = "eve.holt@reqres.in"
inputEmail.placeholder = "Type you email..."

inputPass.type = "password"
inputPass.value = "cityslicka"
inputPass.placeholder = "Type you password..."

submitBtn.textContent = "Log In"

form.append(inputEmail, inputPass, submitBtn)
document.body.appendChild(form)

// Streams
const submitForm$ = fromEvent<Event>(form, "submit").pipe(
  tap((e) => e.preventDefault()),
  exhaustMap(({ target }) =>
    httpLoginRequest({
      email: target[0]["value"],
      password: target[1]["value"],
    })
  )
)

/**
 * Para que se dispare el obs siempre debe de
 * existir una subscripcion
 */
submitForm$.subscribe({
  next: ({ token, ok }: httpResponse) => console.log(`ok: ${ok}, token: ${token}`),
  error: (err) => console.log(err),
  complete: () => console.log("Complete"),
})
