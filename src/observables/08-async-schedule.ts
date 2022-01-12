import { asyncScheduler } from "rxjs"

/**
 * (Subscription es el producto de un subscribe)
 * asyncScheduler crea una subscription
 *
 * asyncScheduler.schedule(callback, tiempoAEjecutarCallBack, state/cbParams)
 */

const sayHello = () => console.log("Hello world")
const sayHello2 = (name) => console.log(`Hello ${name}`)

/**
  * setTimeout(() => {}, 3000) pero utilizando asyncScheduler
 asyncScheduler.schedule(sayHello, 3000)
 asyncScheduler.schedule(sayHello2, 3000, "Juan")
 */

/**
 * setInterval(() => {}, 3000) pero utilizando asyncScheduler
 */

const subscription = asyncScheduler.schedule(
  function (state) {
    console.log("state", state)
    this.schedule(state + 1, 1000)
  },
  0,
  0
)

// setTimeout(() => {}, 3000) pero utilizando asyncScheduler
asyncScheduler.schedule(() => subscription.unsubscribe(), 3000)
