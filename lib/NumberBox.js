import {changeInTime, calcLinear} from './helpers'

const LIMIT_TEXT_SIZE = 16

class NumberBox {
  constructor (config = {}) {
    const {
      app,
      number,
      color = 0x66CCFF,
      size = 64,
      x = 200,
      y = 200,
    } = config
    const graphic = new PIXI.Graphics()
    graphic.beginFill(color)
    graphic.drawRect(0, 0, size, size)
    graphic.endFill()
    graphic.x = x
    graphic.y = y
    this.graphic = graphic
    const text = new PIXI.Text(String(number), {
      align: 'center',
      fontSize: size - 4,
      fontWeight: '100',
    })
    if (size > LIMIT_TEXT_SIZE) {
      this.graphic.addChild(text)
      this.enabledText = true
    } else {
      this.enabledText = false
    }
    this.text = text
    Object.assign(this, {
      app,
      number,
      color,
      size
    })
  }

  enable () {
    this.app.stage.addChild(this.graphic)
  }

  disable () {
    this.app.stage.removeChild(this.graphic)
  }

  shake () {
    const {graphic, color, size} = this
    const time = 100
    const largeSize = size * 1.2
    for (let i = 0; i < 4; i++) {
      const isExpand = i % 2 === 0
      const from = isExpand ? size : largeSize
      const to = isExpand ? largeSize : size
      changeInTime((progress) => {
        graphic.clear()
        graphic.beginFill(color)
        const nextSize = calcLinear({from, to, progress})
        const pos = (size - nextSize) / 2
        graphic.drawRect(pos, pos, nextSize, nextSize)
        graphic.endFill()
      }, time, time * i)
    }
  }

  moveTo ({x, y, time}) {
    const {graphic} = this
    const {x: origX, y: origY} = graphic
    changeInTime((progress) => {
      graphic.x = calcLinear({from: origX, to: x, progress})
      graphic.y = calcLinear({from: origY, to: y, progress})
    }, time)
  }

  resizeTo ({size: targetSize, time}) {
    const {graphic, size, color, text} = this
    changeInTime((progress) => {
      graphic.clear()
      graphic.beginFill(color)
      const nextSize = calcLinear({from: size, to: targetSize, progress})
      graphic.drawRect(0, 0, nextSize, nextSize)
      graphic.endFill()
      this.size = nextSize
      if (this.enabledText) {
        text.style.fontSize = nextSize - 4
      }
      if (this.size > LIMIT_TEXT_SIZE && !this.enabledText) {
        this.enabledText = true
        text.style.fontSize = nextSize - 4
        graphic.addChild(text)
      }
      if (this.size <= LIMIT_TEXT_SIZE && this.enabledText) {
        this.enabledText = false
        graphic.removeChild(text)
      }
    }, time)
  }
}

export default NumberBox

/* global PIXI */
