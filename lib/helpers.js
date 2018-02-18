export function changeInTime (func, time, delay = 0) {
  setTimeout(() => {
    const startAt = Date.now()
    const timer = setInterval(() => {
      const now = Date.now()
      const progress = (now - startAt) / time
      func(progress)
    }, 1000 / 60)
    setTimeout(() => {
      clearInterval(timer)
    }, time)
  }, delay)
}

export function calcLinear ({from, to, progress}) {
  return from + (to - from) * progress
}
