// https://www.reddit.com/r/dailyprogrammer/comments/7j33iv/20171211_challenge_344_easy_baumsweet_sequence/
// 344.js

// If the binary representation includes an uneven amount of zeroes, 0, else 1

const Benchmark = require('benchmark')
const suite = new Benchmark({
  setup: function() {
    const baumArray = new Array(21).fill().map((e, i) => i++).map(baumTest);
  }
}).Suite

// suite
// .add('Mochan#baumSweet', function() {
//   baumSweet(20)
// })
// .add('Rixium#baumSweet', function() {
//   rixium()
// })
// .add('Kazcandra#baumSweetSome', function() {
//   kazcandra()
// })
// .add('Kazcandra#baumSweetModified', function() {
//   kazcandraModified()
// })
// .on('cycle', function(event) {
//   console.log(String(event.target));
// })
// .on('complete', function() {
//   console.log('Fastest is ' + this.filter('fastest').map('name'));
// })
// .run({ 'async': true });

function kazcandra() {
  function baumTest(num) {
    // convert to binary
    let bin = num.toString(2);
    // in a baum-sweet sequence, 0 is always 1 because screw logic
    if (bin == "0") {
        return 1;
    }
    if (bin.split("1").filter(x => x.length%2).length >= 1) {
        return 0;
    } else {
        return 1;
    }
  }

  let baumArray = new Array(21).fill().map((e, i) => i++).map(x => baumTest(x));
}

function kazcandraModified() {
  function baumTest(num) {
    // convert to binary
    const bin = num.toString(2);
    // in a baum-sweet sequence, 0 is always 1 because screw logic
    const isZero = bin === "0"
    const hasOddZeroes = !bin.split('1').some(x => x.length % 2)

    return (isZero || hasOddZeroes) ? 1 : 0
  }

  let baumArray = new Array(21).fill().map((e, i) => i++).map(baumTest);
}

function rixium() {
  function baumSweet(number) {
    if(number == 0) {
      return 1;
    }

    var binary = number.toString(2);
    var count = 0;

    for(var i = 0; i < binary.length; i++) {
      if(binary[i] == 0) {
        count++;
      } else {
        if(count % 2 == 1) {
          return 0;
        } else {
          count = 0;
        }
      }
    }

  return (count % 2) ? 0 : 1;
  }

  var sequence = "";
  for(var i = 0; i <= 20; i++) {
  sequence += baumSweet(i) + " ";
  }
}

function baumSweet(n, i = 1, str = '1') {
  const b = !i.toString(2).split('1')  .some(x => x.length % 2) ? '1' : '0'
  const newStr = str + ', ' + b
  if (i >= n) return newStr
  return baumSweet(n, i + 1, newStr)
}

console.log(baumSweet(20))
