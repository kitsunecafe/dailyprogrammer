const request = require('request');
const cheerio = require('cheerio');

function findPhilosophy(article, visited = []) {
  const newVisited = visited.concat(article);

  if(article === 'Philosophy') {
    console.log(newVisited)
    return;
  }

  request('https://en.wikipedia.org/wiki/' + article, (error, response, body) => {
    const $ = cheerio.load(body);
    const links = $('#bodyContent p a');
    const invalid = str => !str || visited.indexOf(str) > -1 || str.indexOf('Help:') > -1
    const next = links.toArray().reverse().reduce((p, c) => invalid(c.attribs.title) ? p : c.attribs.title, false);
    if(!next) return;
    findPhilosophy(next, newVisited);
  });
}

const tests = ['Molecule', 'Telephone'];
tests.forEach(test => findPhilosophy(test));

