import Consts from './Consts'
import BoxContainer from './BoxContainer'
import Application from './Application'
import Task from './Task'
import getPrimes from 'get-primes'
import asleep from 'asleep'

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

  const boxContainer = new BoxContainer(100)
  app.addBoxContainer(boxContainer)

  PIXI.ticker.shared.update()

  const frames = 30
  const schedule = getPrimes(100).slice(1).map((primeNumber) => [
    () => boxContainer.setMarkAnimation({frames}),
    () => boxContainer.setArrangementAnimation({primeNumber, frames})
  ]).reduce((a, b) => a.concat(b), [])

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
      await asleep(delta)
    }
    asleep(1000)
  }
}

export default main
