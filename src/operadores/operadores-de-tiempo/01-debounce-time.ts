import { debounceTime, fromEvent, map, pluck, distinctUntilChanged } from "rxjs"
/**
 * Operador de tiempo: DebounceTime(ms)
 * Nos ayuda a restringir la cantidad de emisiones que nuestra fuente (observable)
 */

// Ejemplo 1

/**
 * Da igual cuantos click se hagan, tomara solamente el ultimo click que se haya hecho
 * pasada esa cierta cantidad de tiempo
 */
const click$ = fromEvent<PointerEvent>(document, "click").pipe(debounceTime(3000))
click$.subscribe(console.log)

// Ejemplo 2

/**
 * Utilizar debounceTime con inputs
 * Ejemplo de buscador: Si esto fuese un buscador
 * hacer una peticion http por cada tecla que presione el usuario es un
 * desperdicio de recursos excepcional, por ende en estos casos es
 * buena idea usar un debounce time
 */

const input = document.createElement("input")
document.querySelector("body").appendChild(input)

const input$ = fromEvent<KeyboardEvent>(input, "keyup")
input$
  .pipe(
    debounceTime(1000),
    pluck("target", "value"),
    /**
     * Ademas, para evitar que el usuario
     * busque dos veces lo mismo se puede utilizar
     * el distinctUntilChanged, de esta forma se
     * evitaria enviar dos veces seguidas la misma busqueda
     */
    distinctUntilChanged()
  )
  .subscribe(console.log)
