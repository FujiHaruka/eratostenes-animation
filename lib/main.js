import Consts from './Consts'
import BoxContainer from './BoxContainer'
import Application from './Application'
import Task from './Task'
import getPrimes from 'get-primes'
import asleep from 'asleep'
import {downloadCanvas, paddingZero} from './helpers'

const downloadEnabled = false
const downloadName = (frame) => 'eratostenes-' + paddingZero(frame)

async function main (pixiView) {
  const app = new Application({
    width: Consts.APP_WIDTH,
    height: Consts.APP_HEIGHT,
    backgroundColor: 0xffffff,
    sharedTicker: true,
    autoStart: false
  })
  pixiView.appendChild(app.view)

  PIXI.ticker.shared.stop()
  PIXI.ticker.shared.update()

  const boxCount = 100
  const boxContainer = new BoxContainer(boxCount)
  app.addBoxContainer(boxContainer)

  PIXI.ticker.shared.update()
  boxContainer.showText(100)

  let currentFrame = 0
  if (downloadEnabled) {
    downloadCanvas(app.view, downloadName(currentFrame))
  }

  const frames = 30
  const primes = Math.floor(Math.sqrt(boxCount))
  const schedule = getPrimes(primes).slice(1).map((primeNumber) => [
    () => boxContainer.setMarkAnimation({frames}),
    () => boxContainer.setWaitingAnimation({frames: frames * 2}),
    () => boxContainer.setArrangementAnimation({primeNumber, frames: frames * 2}),
    () => boxContainer.setWaitingAnimation({frames}),
  ]).reduce((a, b) => a.concat(b), [])
  schedule.splice(14, 0, () => boxContainer.setTextHideAnimation({frames: 15}))
  schedule.push(() => boxContainer.setMarkAnimation({frames}))
  schedule.push(() => boxContainer.setMarkLeftAnimation({frames}))

  const delta = 1000 / 30
  for (const setAnimation of schedule) {
    setAnimation()
    while (true) {
      const actions = boxContainer.getNextActions()
      if (actions.length === 0) {
        break
      }
      Task.add(actions)
      Task.doAll()
      PIXI.ticker.shared.update()
      currentFrame += 1
      if (downloadEnabled) {
        downloadCanvas(app.view, downloadName(currentFrame))
      }
      await asleep(delta)
    }
  }
}

export default main
