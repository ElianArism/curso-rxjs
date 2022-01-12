/**
 * Operador: DistinctUntilKeyChanged()
 * Cuando el observable emite objetos, este operador se encuentra pendiente
 * de los valores de una propiedad especifica que le pasemos como parametro,
 * Deja pasar solo objetos cuya propiedad tenga valores distintos, hasta que
 * esa propiedad cambie de valor y vuelva a pasar un valor anterior
 */

import { distinctUntilKeyChanged, from } from "rxjs"

interface Dog {
  name: string
  breed: string // raza
}

const dogs: Dog[] = [
  {
    name: "Kingo",
    breed: "Salchicha",
  },
  {
    name: "Dona",
    breed: "Salchicha",
  },
  {
    name: "Dash",
    breed: "Salchicha",
  },
  {
    name: "Ron",
    breed: "Boxer",
  },
  {
    name: "Emilia",
    breed: "Salchicha",
  },
  {
    name: "Wanda",
    breed: "Boxer",
  },
  {
    name: "Cacho",
    breed: "Doberman",
  },
  {
    name: "Cacho",
    breed: "Doberman",
  },
  {
    name: "Cacho",
    breed: "Doberman",
  },
  {
    name: "Kingo2",
    breed: "Salchicha",
  },
  {
    name: "Wanda2",
    breed: "Boxer",
  },
  {
    name: "Cacho2",
    breed: "Doberman",
  },
  {
    name: "Cacho",
    breed: "Doberman",
  },
]

from(dogs)
  .pipe(distinctUntilKeyChanged("breed"))
  .subscribe((dogs) => console.log(dogs))
