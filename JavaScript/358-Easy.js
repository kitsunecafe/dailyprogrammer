// https://www.reddit.com/r/dailyprogrammer/comments/8eger3/20180423_challenge_358_easy_decipher_the_seven/

const range = (n, m) => [...Array(m || n)].map((_, i) => m ? i + n : i)
const strToBin = str => str.split('').map(ch => /\s/.test(ch) ? '0' : '1')
const concat = (a, b) => `${a}${b}`
const nums = { 175: 0, 9: 1, 158: 2, 155: 3, 57 : 4, 179: 5, 183: 6, 137: 7, 191: 8, 187: 9 }

function decipher(input) {
  const grep = input.match(/([\s||_]{3})\n?/g).map(match => match.replace('\n', ''))
  const numLen = grep.length / 3
  const grouped = range(numLen).map((_, ia) => range(3).map((_, ib) => grep[ia + (ib * numLen)]))
  const binary = grouped.map(group => group.map(strToBin))
  const ints = binary.map(group => parseInt(group.map(bin => bin.reduce(concat)).reduce(concat), 2))
  return ints.map(int => nums[int]).reduce(concat)
}

const input =`    _  _     _  _  _  _     _  _     _  _  _  _ 
  | _| _||_||_ |_   ||_|  | _| _||_||_ |_   || |
  ||_  _|  | _||_|  ||_|  ||_  _|  | _||_|  ||_|
`

console.log(decipher(input))
