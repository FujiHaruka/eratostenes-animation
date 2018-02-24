class Application extends PIXI.Application {
  addBox (box) {
    this.stage.addChild(box.graphic)
  }

  addBoxContainer (boxContainer) {
    for (const box of boxContainer.boxes) {
      this.addBox(box)
    }
  }
}

export default Application
