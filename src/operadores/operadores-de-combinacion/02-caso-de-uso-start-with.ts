import { ajax } from "rxjs/ajax"
import { startWith } from "rxjs"

/**
 * Caso de uso startWith
 * crear un loading / spinner
 */

const loadingDiv = document.createElement("div")
loadingDiv.classList.add("loading")
loadingDiv.innerHTML = "Loading..."

const body = document.querySelector("body")

// Stream
ajax
  .getJSON("https://reqres.in/api/users/2?delay=3")
  .pipe(startWith(true))
  .subscribe((res) => {
    if (res === true) {
      body.appendChild(loadingDiv)
    } else {
      loadingDiv.remove()
    }
  })
