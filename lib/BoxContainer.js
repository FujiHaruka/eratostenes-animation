import Box from './Box'
import {calcBoxPosition, calcBoxSize} from './helpers'
import Consts from './Consts'

// 複数の Box を一元管理する
class BoxContainer {
  constructor (boxCount) {
    this.currentPrimeNumber = 2
    const size = calcBoxSize(this.currentPrimeNumber)
    this.boxes = new Array(boxCount).fill(null)
      .map((_, i) => {
        const number = i + 1
        const {x, y} = calcBoxPosition({
          number,
          cols: this.currentPrimeNumber,
          size,
        })
        return new Box({
          number,
          x,
          y,
          color: Consts.DEFAULT_NUMBER_COLOR,
          size,
        })
      })
  }

  getNextActions () {
    let boxActions = []
    for (const box of this.boxes) {
      const actions = box.getNextActions()
      boxActions = boxActions.concat(actions)
    }
    return boxActions
  }

  showText () {
    this.boxes.forEach((b) => b.showText())
  }

  hideText () {
    this.boxes.forEach((b) => b.hideText())
  }

  setArrangementAnimation ({primeNumber, frames}) {
    this.currentPrimeNumber = primeNumber
    for (const box of this.boxes) {
      const size = calcBoxSize(primeNumber)
      const {x, y} = calcBoxPosition({
        number: box.number,
        cols: primeNumber,
        size,
      })
      box.setMovingAnimation({x, y, frames})
      if (size !== box.size) {
        box.setResizeAnimation({size, frames})
      }
    }
  }

  setMarkAnimation ({frames}) {
    const primeNumber = this.currentPrimeNumber
    for (const box of this.boxes) {
      if (box.number === primeNumber) {
        box.setColorAction({color: Consts.PRIME_NUMBER_COLOR, frames})
      } else if (box.number % primeNumber === 0) {
        box.setColorAction({color: Consts.COMPOSITE_NUMBER_COLOR, frames})
      }
    }
  }
}

export default BoxContainer
