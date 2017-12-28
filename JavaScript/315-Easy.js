const xorMult = (a, b, c = 0) => b ? xorMult(a << 1, b >> 1, c ^ a * (b & 1)) : c;
const format = (a, b, fn) => `${a}@${b}=${fn(a, b)}`;
console.log(format(process.argv[2], process.argv[3], xorMult));

