// https://www.reddit.com/r/dailyprogrammer/comments/7vm223/20180206_challenge_350_easy_bookshelf_problem/

function bookshelves(input) {
  const [shelfStrings, ...bookStrings] = input.split('\n')
  const shelves = shelfStrings.split(' ').map(width => parseInt(width, 10)).sort((a, b) => b - a)
  const sum = (prev, cur) => prev + cur
  const bookWidth = bookStrings.map(book => parseInt(book.split(' ')[0], 10)).reduce(sum, 0)
  
  function buy(bought = []) {
    const availableSpace = bought.reduce(sum, 0)
    return availableSpace >= bookWidth ? bought : buy(bought.concat(shelves[bought.length]))
  }

  return shelves.reduce(sum, 0) < bookWidth ? 'impossible' : buy()
}

console.log(bookshelves(`150 150 300 150 150
70 A Game of Thrones
76 A Clash of Kings
99 A Storm of Swords
75 A Feasts for Crows
105 A Dance With Dragons`))

console.log(bookshelves(`500 500 500
1309 Artamene
303 A la recherche du temps perdu
399 Mission Earth`))