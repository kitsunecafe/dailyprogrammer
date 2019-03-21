import fs from 'fs'
import Trie from './trie'

const enable1 = fs.readFileSync('enable1.txt', 'utf8').split('\n')
const trie = Trie()

enable1.forEach(word => {
  if (word) trie.insert(word)
})

const permute = word => Array(word.split('').length).fill(word).map((w, index) => w.slice(0, index) + w.slice(index + 1))

const funnel = (a, b) => {
  if (Math.abs(a - b) >= 2 || (a[0] !== b[0] && a[1] !== b[0])) return false
  const permutations = permute(a)
  return permutations.indexOf(b) > -1
}

const bonus = word => {
  const permutations = permute(word)
  return permutations.filter(w => trie.search(w)).filter((item, i, a) => a.indexOf(item) === i) 
}

const bonus2 = _ => {
  return enable1.reduce((words, word) => bonus(word).length > 4 ?  words.concat(word) : words, [])
}

// console.log(bonus('dragoon'))
// console.log(bonus('boats'))
// console.log(bonus('affidavit'))

const t0 = process.hrtime()
const words = bonus2()
const t1 = process.hrtime(t0)
words.forEach(word => {
  console.log(bonus(word))
})
console.info('Found %d words', words.length)
console.info('Execution time: %dµs', t1[0] * 1000000 + t1[1] / 1000)
