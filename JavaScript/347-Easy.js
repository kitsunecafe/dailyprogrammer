// https://www.reddit.com/r/dailyprogrammer/comments/7qn07r/20180115_challenge_347_easy_how_long_has_the/

function* range(start, stop, step = 1) {
  if (stop === undefined) [start, stop] = [0, start]
  if (step > 0) while (start < stop) yield start, start += step
  else if (step < 0) while (start > stop) yield start, start += step
} 

function count(lights) {
  const numbers = lights
    .split('\n')
    .map(n => n.split(' '))
    .map(([a, b]) => [...range(a, b)])
    .reduce((prev, cur) => prev.concat(cur))

  return new Set(numbers).size
}