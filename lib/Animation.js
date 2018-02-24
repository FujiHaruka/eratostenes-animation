// 関数 frameAction を frames フレームで実行するアニメーション
class Animation {
  constructor ({frameAction, frames}) {
    Object.assign(this, {
      frameAction,
      frames,
      currentFrame: 0,
    })
  }

  nextFrame () {
    const {frameAction, frames} = this
    if (this.currentFrame < frames) {
      this.currentFrame += 1
      const progress = this.currentFrame / frames
      return () => frameAction(progress)
    } else {
      return null
    }
  }

  get isFinished () {
    return this.currentFrame >= this.frames
  }
}

export default Animation
