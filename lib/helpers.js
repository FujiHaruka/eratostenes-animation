import Color from 'color'

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

export function calcLinearColor ({from, to, progress}) {
  const srcColor = Color(from).array()
  const destColor = Color(to).array()
  const indexes = [0, 1, 2]
  const resultColor = Color(indexes.map((i) =>
    calcLinear({from: srcColor[i], to: destColor[i], progress})
  ))
  return resultColor.rgbNumber()
}

/* global PIXI */
