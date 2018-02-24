import 'pixi.js/dist/pixi.js'
import main from './main'

window.addEventListener('DOMContentLoaded', () => {
  const pixiView = document.getElementById('pixi-view')
  main(pixiView)
})
