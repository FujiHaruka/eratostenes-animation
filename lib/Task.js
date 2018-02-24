class TaskCreator {
  constructor () {
    this.queue = []
  }

  add (func) {
    if (Array.isArray(func)) {
      const funcs = func
      this.queue = this.queue.concat(funcs)
    } else {
      this.queue.push(func)
    }
  }

  doAll () {
    this.queue.forEach((func) => func && func())
    this.queue = []
  }
}

const Task = new TaskCreator()

export default Task
