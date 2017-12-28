const fs = require('fs');

function isRollerCoaster(word) {
  const charCodes = word.split('').map(ch => ch.charCodeAt(0));
  const truthMap = charCodes.map((v, i, a) => i ? Math.sign(a[i - 1] - v) : 0);
  const hasDuplicates = truthMap.filter((v, i, a) => i && (!v || v === a[i - 1]));
  return !hasDuplicates.length
}

const words = fs.readFileSync('../assets/enable1.txt', 'utf-8').split('\n').filter(word => word.length > 4);
const rcWords = words.filter(isRollerCoaster);
console.log(rcWords.length);

