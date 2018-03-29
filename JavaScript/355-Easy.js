#!/usr/bin/env node

// const alpha = 'abcdefghijklmnopqrstuvwxyz'.split('')
const alpha = ch => ch.charCodeAt(0) - 97
const shift = (dir = 1) => (a, b) => String.fromCharCode(((alpha(a) + (alpha(b) * dir) + 26) % 26) + 97)

function cipher(input, dir) {
  const shiftDir = shift(dir)
  const stringMap = (str, cb) => str.split('').map(cb).join('')
  const [secret, message] = input.split(' ')
  const paddedSecret = stringMap(message, (_, i) => secret.charAt(i % secret.length))
  return stringMap(message, (l, i) => shiftDir(l, paddedSecret[i], dir))
}

const result = cipher('snitch thepackagehasbeendelivered', 1)
console.log(result)
