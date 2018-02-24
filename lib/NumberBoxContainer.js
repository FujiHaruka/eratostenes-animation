import NumberBox from './NumberBox'
import Consts from './Consts'

const {
  APP_WIDTH,
  MAX_BOX_SIZE,
} = Consts

class NumberBoxContainer {
  constructor ({app, maxNumber = 100, targetNumber = 2}) {
    this.targetNumber = targetNumber
    this.size = this.calcBoxSize()
    this.numberBoxes = new Array(maxNumber).fill(null)
      .map((_, i) => {
        const number = i + 1
        const {x, y} = this.calcBoxPosition(number)
        return new NumberBox({app, size: this.size, number, x, y})
      })
  }

  changeTargetNumber ({number: targetNumber, time = 1000}) {
    this.targetNumber = targetNumber
    const size = this.calcBoxSize()
    const shouldUpdateSize = this.size !== size
    this.size = size
    for (const box of this.numberBoxes) {
      const {x, y} = this.calcBoxPosition(box.number)
      box.moveTo({x, y, time})
      if (shouldUpdateSize) {
        box.resizeTo({size, time})
      }
    }
  }

  markAsSynthesis (number) {
    const boxes = this.numberBoxes.filter(
      (box) => box.number % number === 0 && box.number !== number
    )
    for (const box of boxes) {
      if (!box.isNonActive) {
        box.nonActive()
      }
    }
  }

  calcBoxPosition (number) {
    const {size, targetNumber: raws} = this
    const x = size * ((number - 1) % raws)
    const y = size * Math.floor((number - 1) / raws)
    return {x, y}
  }

  calcBoxSize () {
    return Math.min(APP_WIDTH / this.targetNumber, MAX_BOX_SIZE)
  }

  enable () {
    for (const box of this.numberBoxes) {
      box.enable()
    }
  }

  disable () {
    for (const box of this.numberBoxes) {
      box.disable()
    }
  }
}

export default NumberBoxContainer
