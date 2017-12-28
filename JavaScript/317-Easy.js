const tags = { a: 'bc', b: 'a', c: 'aaa' };
function collatz(input) {
  console.log(input);
  return (input.length > 1) ? collatz(input.slice(2) + tags[input[0]]) : input;
}

