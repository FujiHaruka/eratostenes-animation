import 'pixi.js/dist/pixi.js'
import NumberBox from './NumberBox'

function main () {
  var width = 800
  var height = 400

  const app = new PIXI.Application({
    width,
    height,
    backgroundColor: 0xffffff
  })
  document.getElementById('pixi-view').appendChild(app.view)

  const box = new NumberBox({app, number: 1})
  box.enable()

  box.shake()
  setTimeout(() => {
    box.resizeTo({size: 5, time: 1000})
  }, 1000)
  setTimeout(() => {
    box.resizeTo({size: 64, time: 1000})
  }, 2000)

  app.ticker.add((delta) => {
    // box.x += 10
  })
}

window.addEventListener('DOMContentLoaded', main)

/* global PIXI */
