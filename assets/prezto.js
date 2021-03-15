export default function Prezto() {
  const slides = document.querySelectorAll("body > div")
  let current = 0
  const last = slides.length - 1;

  function jumpTo(slide) {
    slides[current].classList.add("hidden")
    current = slide
    slides[current].classList.remove("hidden")
  }

  function next() {
    return jumpTo(Math.min(last, current + 1))
  }

  function prev() {
    return jumpTo(Math.max(0, current - 1))
  }

  document.body.addEventListener("keydown", ev => {
    switch (ev.key) {
      case "ArrowLeft":
        return prev()
      case "ArrowRight":
      case " ":
        return next()
      case "Home":
        return jumpTo(0)
    }
  })

  for (const slide of slides) {
    slide.classList.add("hidden")
  }

  jumpTo(current)
}
