import { endWith, of, startWith } from "rxjs"
/**
 * Operador: startWith
 * define cual sera el primer valor que reciba
 * cualquier subscripcion y lo envia
 */

const numeros$ = of(1, 2, 3)

numeros$.pipe(startWith({ sayHello: "Hello world" })).subscribe(console.log)

/**
 * Operador endWith
 * define cual sera el ultimo valor que reciba
 * cualquier subscripcion y lo envia antes de
 * completar el observable
 */

numeros$.pipe(endWith("y", "z", { sayGoodBye: "Good Bye!" })).subscribe(console.log)
