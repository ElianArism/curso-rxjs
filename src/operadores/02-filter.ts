import { filter, range, from, fromEvent, map } from "rxjs"

/**
 * Operadores: filter()
 * filtra los valores enviados por el observable y devuelve
 * los que corresponden segun una condicion
 */

/**
 * Filtrar solo numeros impares
 */
range(1, 10).pipe(
  filter((value, indx) => {
    return value % 2 === 1
  })
)
// .subscribe(console.log)

/**
 * Filtrar por marca
 */

const shoes = [
  {
    brand: "Nike",
    Name: "Airmax",
  },
  {
    brand: "Adidas",
    Name: "111",
  },
  {
    brand: "Jaguar",
    Name: "default",
  },
]

from(shoes).pipe(filter(({ brand }) => brand === "Nike"))
// .subscribe(console.log)

const keyup$ = fromEvent<KeyboardEvent>(document, "keyup")
  .pipe(
    map((event) => event.code),
    filter((code) => code === "Enter") // Solo llegan al subscribe los code === 'Enter'
  )
  .subscribe(console.log)
