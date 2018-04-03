// https://www.reddit.com/r/dailyprogrammer/comments/7jkfu5/20171213_challenge_344_intermediate_bankers/

class Process {
  constructor(id, resources) {
    if (resources.length % 2 !== 0) throw new Error('Uneven resources count')
    this.id = `P${id}`
    const halfLength = resources.length / 2
    this.allocated = resources.slice(0, halfLength)
    const max = resources.slice(-halfLength)
    this.required = max.map((x, i) => x - this.allocated[i])
  }

  canExecute(available) {
    return !available.map((x, i) => x - this.required[i]).some(x => x < 0)
  }
}

function process(available, processes, order = []) {
  const next = processes.filter(p => p.canExecute(available))
  if (!next.length || !processes.length) return processes.length ? 'Insufficient resources' : order
  const newAvail = next.reduce((prev, cur) => prev.map((x, i) => x + cur.allocated[i]), available)
  const newProcs = processes.filter(p => !next.includes(p))
  return process(newAvail, newProcs, order.concat(next.map(x => x.id)))
}

function execute(resources) {
  const processes = resources.slice(1).map((x, i) => new Process(i, x))
  return process(resources[0], processes)
}


const test = [
  [3, 3, 2],
  [0, 1, 0, 7, 5, 3],
  [2, 0, 0, 3, 2, 2],
  [3, 0, 2, 9, 0, 2],
  [2, 1, 1, 2, 2, 2],
  [0, 0, 2, 4, 3, 3],
]

console.log(execute(test))