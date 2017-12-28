const assert = require('assert');

function countAtoms(accumulator, element) {
  const match = /([A-Z][a-z]?)(\d+)?/.exec(element);
  const ch = match[1];
  let result = accumulator || {};
  const atoms = (result[ch] || 0) + (parseInt(match[2], 10) || 1);
  result[ch] = atoms;
  return result;
}

function handleParens(chemical) {
  const re = /(\((.+?)\)(\d)?)/g;
  let match = re.exec(chemical);
  return (match) ? match[2].repeat(match[3]) : chemical;
}

function countChemical(chemical) {
  const empty = (v) => v.length > 0;
  const ch = /([A-Z][a-z]?\d*)/;
  const ns = /(\(.+?\)\d?)/;
  const formatted = chemical.split(ns).filter(empty).map(handleParens).join('');
  return formatted.split(ch).filter(empty).reduce(countAtoms, {});
}

function test() {
  const inputs = [
    { input: 'C6H12O6', expect: { C: 6, H: 12, O: 6 }},
    { input: 'CCl2F2', expect: { C: 1, Cl: 2, F: 2 }},
    { input: 'NaHCO3', expect: { Na: 1, H: 1, C: 1, O: 3 }},
    { input: 'C4H8(OH)2', expect: { C: 4, H: 10, O: 2 }},
    { input: 'PbCl(NH3)2(COOH)2', expect: { C: 2, Cl: 1, H: 8, N: 2, O: 4, Pb: 1 }}
  ];

  for (let input of inputs) {
    console.log(countChemical(input.input));
    assert.deepEqual(countChemical(input.input), input.expect);
  }
}

test();

