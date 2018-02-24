import Box from './Box'
import {calcBoxPosition, calcBoxSize} from './helpers'
import Consts from './Consts'
import Animation from './Animation'

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
    if (this.waitingAnimation && !this.waitingAnimation.isFinished) {
      const action = this.waitingAnimation.nextFrame()
      boxActions.push(action)
    }
    return boxActions
  }

  showText (max) {
    this.boxes.forEach((box) => {
      if (box.number <= max) {
        box.showText()
      }
    })
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
      if (box.isDecided) {
        continue
      }
      if (box.number === primeNumber) {
        box.setColorAction({color: Consts.PRIME_NUMBER_COLOR, frames})
        box.isPrime = true
      } else if (box.number % primeNumber === 0) {
        box.setColorAction({color: Consts.COMPOSITE_NUMBER_COLOR, frames})
        box.isComposite = true
      }
    }
  }

  setMarkLeftAnimation ({frames}) {
    const primeNumber = this.currentPrimeNumber
    const primeNumberSqure = primeNumber ** 2
    for (const box of this.boxes) {
      if (box.isDecided) {
        continue
      }
      if (box.number < primeNumberSqure && !box.isDecided) {
        box.setColorAction({color: Consts.PRIME_NUMBER_COLOR, frames})
        box.isPrime = true
      }
    }
  }

  setTextHideAnimation ({frames}) {
    for (const box of this.boxes) {
      if (box.isTextVisible) {
        box.setTextHideAnimation({frames})
      }
    }
  }

  setWaitingAnimation ({frames}) {
    this.waitingAnimation = new Animation({
      frames,
      frameAction (progress) {}
    })
  }
}

export default BoxContainer
