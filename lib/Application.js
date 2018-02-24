class Application extends PIXI.Application {
  addBox (box) {
    this.stage.addChild(box.graphic)
  }
}

export default Application
