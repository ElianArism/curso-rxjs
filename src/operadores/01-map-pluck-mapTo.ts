import { map, range, fromEvent, pluck, of, mapTo } from "rxjs"
/**
 * NOTE
 * Operadores: map()
 * Toma los valores del observable y ejecuta algun callback con ellos
 */

console.log("--- MAP ---")
const range$ = range(1, 5).pipe(map((value) => value * 10))

range$.subscribe((res) => {
  console.log(res)
})

const keyup$ = fromEvent<KeyboardEvent>(document, "keyup")

const code$ = keyup$.pipe(map(({ code }) => code))

code$.subscribe((code) => {
  console.log("code: ", code)
})

console.log("---END MAP ---")

/**
 * NOTE
 * Operadores: pluck()
 * Toma una  propiedad de un objeto literal enviado por el observable
 * y lo retorna
 */
console.log("--- PLUCK ---")
const key$ = keyup$.pipe(pluck("key"))

key$.subscribe((key) => {
  console.log("key: ", key)
})

/**
 * Tambien se pueden tomar propiedades de subdocumentos
 * con pluck
 */
const human = {
  name: {
    firstName: "Juan",
    lastName: "Perez",
  },
  age: 18,
}

const human$ = of(human).pipe(
  pluck(
    "name", // property
    "firstName" // subproperty
  )
)

human$.subscribe((res) => {
  console.log(res)
})

console.log("---END PLUCK ---")
/**
 * NOTE
 * Operadores: mapTo()
 * Transforma cualquier valor enviado por el
 * observable en una salida especifica
 */

console.log("--- MAP-TO ---")
const clickEvent$ = fromEvent<MouseEvent>(document, "click").pipe(mapTo("Se hizo click"))

clickEvent$.subscribe((res) => {
  console.log(res)
})
