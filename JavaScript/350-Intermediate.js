// https://www.reddit.com/r/dailyprogrammer/comments/7vx85p/20180207_challenge_350_intermediate_balancing_my/

const sum = (p, c) => p.concat((p[p.length - 1] || 0) + c)

function balance(n) {
  const r = n.reduce(sum, [])
  const l = n.reverse().reduce(sum, []).reverse()
  return r.reduce((prev, cur, i) => cur === l[i] ? prev.concat(i) : prev, [])
}

const tests = [
  '0 -3 5 -4 -2 3 1 0',
  '3 -2 2 0 3 4 -6 3 5 -4 8',
  '9 0 -5 -4 1 4 -4 -9 0 -7 -1',
  '9 -7 6 -8 3 -9 -5 3 -6 -8 5'
]

const results = tests.map(val => val.split(' ').map(int => parseInt(int, 10))).map(balance)
console.log(results)
/*
  0  1 2  3  4  5 6 7
  0 -3 5 -4 -2  3 1 0
  0 -3 2 -2 -4 -1 0 0 ->
  0  0 3 -2  2  4 1 0 <-
  x       x         x
*/