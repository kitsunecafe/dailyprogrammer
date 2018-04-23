function concatInts(args, fn) {
  return args.map(v => parseInt(v).toString()).sort(fn).join('')
}

function compare(a, b) {
  return Math.sign((b+a) - (a+b))
}

const args = process.argv.slice(2)
console.log(`${concatInts(args)} ${concatInts(args, compare)}`)

