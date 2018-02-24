export function changeInTime (func, time) {
  const startAt = Date.now()
  const tickFunc = () => {
    const now = Date.now()
    const progress = (now - startAt) / time
    func(progress)
  }
  PIXI.ticker.shared.add(tickFunc)
  setTimeout(() => {
    PIXI.ticker.shared.remove(tickFunc)
    func(1)
  }, time)
}

export function calcLinear ({from, to, progress}) {
  return from + (to - from) * progress
}

/* global PIXI */
