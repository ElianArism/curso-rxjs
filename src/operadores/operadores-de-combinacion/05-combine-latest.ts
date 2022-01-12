import { combineLatest, fromEvent } from "rxjs"
import { pluck } from "rxjs/operators"
/**
 * Operador: combineLatest()
 * recibe un arr de observables
 *
 * combina el valor enviado por una de las fuentes
 * con el ultimo valor enviado por las demas
 * (lo envia en forma de arreglo)
 *
 * ACLARACION: Solo envia valores cuando todos los observables
 * hayan emitido al menos un valor
 *
 * Deben completarse todos los observables para que se
 * complete el combineLatest
 */

/**
 * Ej 1
 */
const keyup$ = fromEvent(document, "keyup")
const click$ = fromEvent(document, "click")

combineLatest([
  keyup$.pipe(pluck("type")),
  click$.pipe(pluck("type")),
]).subscribe((res) => {
  // console.log(res)
})

/**
 * Ej 2
 */
const input1 = document.createElement("input")
const input2 = document.createElement("input")

input1.placeholder = "email@email.com"
input2.placeholder = "***************"
input2.type = "password"

document.body.append(input1, input2)

// helper
const createInputStream = (element: HTMLInputElement) =>
  fromEvent<KeyboardEvent>(element, "keyup").pipe(
    pluck("target", "value")
  )

combineLatest([
  createInputStream(input1),
  createInputStream(input2),
]).subscribe((res) => {
  console.log(res)
})
