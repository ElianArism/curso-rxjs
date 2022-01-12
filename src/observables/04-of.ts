import { of, Observer } from "rxjs"
interface Student {
  age: number
  name: string
  course: string
}

export const students: Student[] = [
  {
    name: "Juan",
    age: 18,
    course: "Math",
  },
  {
    name: "Pedro",
    age: 20,
    course: "Databases",
  },
  {
    name: "Pedro",
    age: 20,
    course: "Algorithms",
  },
]

/**
 * Crear observables mediante rxjs con
 * funciones de la libreria
 */

/**
 * of: crea un observable que emite los valores
 * que le pasemos de manera sincrona y al terminar
 * se completa
 */

const obs$ = of(1, 2, 3, 4, 5, 6)
// const obs$ = of(1, 'Hola', function() {}, true, Promise.resolve(true))
// const obs$ = of<Student[]>(students)

const observer: Observer<any> = {
  next: (next) => console.log("[next]: ", next),
  error: (err) => console.log("[error]: ", err),
  complete: () => console.log("Complete"),
}

console.log("Inicio del obs$")
obs$.subscribe(observer)
/**
 * Ya que es un observable sincrono,
 * la ejecucion sera secuencial
 */
console.log("Inicio del obs$")
