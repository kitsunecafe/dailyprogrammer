function baumSweet(n, i = 1, str = '1') {
  const b = !i.toString(2).split('1').some(x => x.length % 2) ? '1' : '0'
  const newStr = str + ', ' + b
  if (i >= n) return newStr
  return baumSweet(n, i + 1, newStr)
}

