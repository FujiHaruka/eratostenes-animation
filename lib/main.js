import Consts from './Consts'
import Box from './Box'
import Application from './Application'
import Task from './Task'
// import primes from 'primes'

function main (pixiView) {
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

  const box = new Box({
    number: 3,
    size: 100,
    x: 0,
    y: 0,
    color: Consts.ACTIVE_BOX_COLOR,
  })
  app.addBox(box)

  box.setMovingAnimation({x: 100, y: 200, frames: 30})
  box.setResizeAnimation({size: 10, frames: 60})
  box.setColorAction({color: Consts.NONACTIVE_BOX_COLOR, frames: 90})

  setInterval(() => {
    const actions = box.getNextActions()
    Task.add(actions)
    Task.doAll()
    PIXI.ticker.shared.update()
  }, 1000 / 10)
}

export default main
