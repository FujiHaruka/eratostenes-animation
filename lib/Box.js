import {calcLinear, calcLinearColor} from './helpers'
import Animation from './Animation'

const FONT_SIZE_SCALE = 0.85
const TEXT_COLOR = 0xFFFFFF

class Box {
  constructor (settings = {}) {
    const {
      number,
      size,
      x,
      y,
      color,
    } = settings

    const graphic = new PIXI.Graphics()
    graphic.beginFill(color)
    graphic.drawRect(0, 0, size, size)
    graphic.endFill()
    graphic.x = x
    graphic.y = y

    const numberStr = number < 10 ? ' ' + number : String(number)
    const numberText = new PIXI.Text(numberStr, {
      fontSize: size * FONT_SIZE_SCALE,
      fontWeight: '100',
      fill: TEXT_COLOR
    })

    Object.assign(this, {
      number,
      size,
      graphic,
      numberText,
      color,
      isTextVisible: false,
      movingAnimation: null,
      colorAnimation: null,
      resizeAnimation: null,
      isPrime: false,
      isComposite: false,
    })
  }

  get isDecided () {
    return this.isPrime || this.isComposite
  }

  showText () {
    if (!this.isTextVisible) {
      this.isTextVisible = true
      this.graphic.addChild(this.numberText)
    }
  }

  hideText () {
    if (this.isTextVisible) {
      this.isTextVisible = false
      this.graphic.removeChild(this.numberText)
    }
  }

  getNextActions () {
    const actions = []
    const animations = [this.movingAnimation, this.colorAnimation, this.resizeAnimation, this.textHideAnimation].filter(Boolean)
    for (const animation of animations) {
      if (animation.isFinished) {
        continue
      }
      const action = animation.nextFrame()
      if (action) {
        actions.push(action)
      }
    }
    return actions
  }

  setMovingAnimation ({x, y, frames}) {
    const {graphic} = this
    const {x: origX, y: origY} = graphic
    this.movingAnimation = new Animation({
      frames,
      frameAction (progress) {
        graphic.x = calcLinear({from: origX, to: x, progress})
        graphic.y = calcLinear({from: origY, to: y, progress})
      }
    })
  }

  setColorAction ({color: destColor, frames}) {
    const s = this
    const {graphic, color} = s
    this.colorAnimation = new Animation({
      frames,
      frameAction (progress) {
        const nextColor = calcLinearColor({from: color, to: destColor, progress})
        graphic.beginFill(nextColor)
        graphic.drawRect(0, 0, s.size, s.size)
        graphic.endFill()
        s.color = nextColor
      }
    })
  }

  setResizeAnimation ({size: destSize, frames}) {
    const s = this
    const {graphic, size, numberText} = s
    this.resizeAnimation = new Animation({
      frames,
      frameAction (progress) {
        graphic.clear()
        graphic.beginFill(s.color)
        const nextSize = calcLinear({from: size, to: destSize, progress})
        graphic.drawRect(0, 0, nextSize, nextSize)
        graphic.endFill()
        numberText.style.fontSize = nextSize * FONT_SIZE_SCALE
        s.size = nextSize
      }
    })
  }

  setTextHideAnimation ({frames}) {
    const s = this
    const {numberText} = s
    this.textHideAnimation = new Animation({
      frames,
      frameAction (progress) {
        if (progress === 1) {
          s.hideText()
        } else {
          const destColor = s.color
          const nextColor = calcLinearColor({from: TEXT_COLOR, to: destColor, progress})
          numberText.style = Object.assign({}, numberText.style, {
            fill: nextColor
          })
        }
      }
    })
  }
}

export default Box
