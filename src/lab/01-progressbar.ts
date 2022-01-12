import { fromEvent, map } from "rxjs"
/**
 * document.clientHeight = altura de lo que se puede mostrar en la pantalla sin hacer scroll
 * document.scrollHeight = altura total del documento con todo su contenido
 * document.scrollTop = todo lo que se ha hecho scroll (medido en px) hasta ahora
 *
 *
 * Laboratorio:
 * crear progressBar usando rxjs
 */

// HTML
const text = document.createElement("div")
text.innerHTML = `
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dignissim vulputate enim sit amet porta. Mauris venenatis dignissim augue, dignissim ullamcorper dolor faucibus sit amet. Sed mollis odio nec commodo porta. Etiam a posuere nibh, a finibus massa. Proin fringilla ultricies turpis sed commodo. Donec sodales sem at commodo dictum. Quisque dolor purus, convallis id pulvinar vel, dictum id turpis. Cras vel sodales neque, sed lacinia nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec in dignissim purus. Donec euismod cursus iaculis. Etiam quis neque vitae leo commodo scelerisque at eu lorem. In neque quam, mollis sed convallis ac, porttitor at metus.
  </p>
  <p>
    Curabitur vitae sapien ut nulla mattis pretium. Praesent condimentum eleifend mauris sit amet porta. Sed tortor nisi, luctus interdum iaculis eu, pharetra non nisi. Mauris ut porta orci, in aliquet sem. Ut eros justo, pellentesque sed sodales ac, facilisis sit amet erat. In ut lacus vulputate, suscipit orci et, semper lorem. Vivamus tempor lectus eu dolor auctor, vitae eleifend erat fringilla. Aenean eu augue nisi. Maecenas vel tellus scelerisque, semper dui ut, condimentum eros.
  </p>
  <p>
    Nam vestibulum libero in lorem tempor lobortis. Aenean et eros in diam euismod vulputate sed a neque. Aenean cursus tortor non pretium fringilla. Praesent ut quam non sem rhoncus bibendum. Nulla at rhoncus massa, ut tristique dui. Nulla tempus tellus turpis, id condimentum leo laoreet posuere. Vestibulum a hendrerit turpis. Nunc hendrerit, justo at mollis finibus, sem nunc convallis massa, id tristique lectus odio efficitur ipsum. In bibendum purus eu metus mollis, eget pretium leo porta. In mauris enim, euismod ac efficitur id, vulputate non sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
  </p>
  <p>
    Vivamus dui lacus, hendrerit eget vehicula at, semper ac augue. Quisque aliquam, lectus eu lacinia aliquet, arcu nisl iaculis augue, eu congue erat orci vel nisi. Morbi mollis sem a auctor rhoncus. Duis placerat, elit vitae semper posuere, ante leo elementum mi, eu bibendum orci tortor vitae mauris. Praesent non sapien consectetur urna hendrerit imperdiet. Donec id condimentum ex. Nunc suscipit dignissim lacus in feugiat. Sed quis gravida felis. Etiam quis faucibus ex. In ac sem turpis. Nullam accumsan arcu sed fringilla aliquam. Nulla et felis eu justo elementum vulputate nec quis felis. Curabitur imperdiet sed ligula vel tempor. Nam consequat augue sed lectus mattis rhoncus.
  </p>
  <p>
    Nullam magna nisi, pretium eget mattis et, fermentum ut erat. Fusce sit amet nibh finibus, condimentum lacus vel, ornare ex. In sit amet luctus orci, et pretium justo. Sed ac velit at dolor porttitor accumsan eu consectetur ligula. Vestibulum pharetra est id vulputate bibendum. Vivamus consectetur pulvinar lorem, vel efficitur ligula. Sed vel tincidunt ligula, vel ultricies nisi. Cras suscipit justo id tellus lobortis dictum.
  </p>
`
const body = document.querySelector("body")
body.appendChild(text)

const progressBar = document.createElement("div")
progressBar.classList.add("progress-bar")

body.appendChild(progressBar)

// Functions
const calculateScroll = ({
  scrollTop,
  scrollHeight,
  clientHeight,
}: {
  scrollTop: number
  scrollHeight: number
  clientHeight: number
}): number => {
  return Math.round((scrollTop / (scrollHeight - clientHeight)) * 100)
}

// observables
const scroll$ = fromEvent(document, "scroll")

const progress$ = scroll$.pipe(
  map((event: any) => {
    const scrollInfo = {
      scrollTop: event.target.documentElement.scrollTop,
      scrollHeight: event.target.documentElement.scrollHeight,
      clientHeight: event.target.documentElement.clientHeight,
    }

    return calculateScroll(scrollInfo)
  })
)

progress$.subscribe((percent: number) => {
  progressBar.style.width = percent + "%"
  if (percent === 100) {
    progressBar.style.backgroundColor = "green"
  } else {
    progressBar.style.backgroundColor = "purple"
  }
})
