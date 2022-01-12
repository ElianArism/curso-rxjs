import { ajax } from "rxjs/ajax"

const url = "https://httpbin.org/delay/1"
// manera mas corta de realizar peticion http
// retorna respuesta del endpoint en si
const obs$ = ajax.getJSON(url, { "Content-Type": "application/json", test: "test" })

obs$.subscribe((data) => {
  console.log("[data]:", data)
})
