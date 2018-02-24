import 'pixi.js/dist/pixi.js'
import NumberBoxContainer from './NumberBoxContainer'
import Consts from './Consts'
import primes from 'primes'

function main () {
  const app = new PIXI.Application({
    width: Consts.APP_WIDTH,
    height: Consts.APP_HEIGHT,
    backgroundColor: 0xffffff,
    sharedTicker: true
  })
  document.getElementById('pixi-view').appendChild(app.view)

  const container = new NumberBoxContainer({
    app,
    maxNumber: 2000,
    targetNumber: 2
  })
  container.enable()
  // setTimeout(() => {
  //   container.changeTargetNumber({number: 2, time: 1000})
  // }, 1000)

  const primeList = primes(100)
  for (let i = 0; i < primeList.length; i++) {
    let prime = primeList[i]
    // setTimeout(() => {
    //   container.markAsSynthesis(prime)
    // }, 3000 * (i + 1) + 1000)
    setTimeout(() => {
      container.changeTargetNumber({number: prime, time: 2000})
    }, 3000 * (i + 1))
  }
}

window.addEventListener('DOMContentLoaded', main)

/* global PIXI */
