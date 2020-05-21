function tokenizer(input) {
  let current = 0;
  let tokens = [];

  while (input.length > current) {
    let char = input[current];

    if (char === "(") {
      tokens.push({
        type: "parentheses",
        value: char
      });
      ++current;
      continue;
    }

    if (char === ")") {
      tokens.push({
        type: "parentheses",
        value: char
      });
      ++current;
      continue;
    }

    const spaceReg = /\s/;
    if (spaceReg.test(char)) {
      ++current;
      continue;
    }

    // number
    const numberReg = /[0-9]/;
    if (numberReg.test(char)) {
      ++current;
      while (numberReg.test(input[current])) {
        char += input[current];
        ++current;
      }
      tokens.push({
        type: "number",
        value: char
      });
      continue;
    }

    // letter
    const letterReg = /[a-z]/;
    if (letterReg.test(char)) {
      ++current;
      while (letterReg.test(input[current])) {
        char += input[current];
        ++current;
      }
      tokens.push({
        type: "name",
        value: char
      });
      continue;
    }

    //string
    const stringReg = /"/;
    if (stringReg.test(char)) {
      ++current;
      char = "";
      while (!stringReg.test(input[current])) {
        char += input[current];
        ++current;
      }
      tokens.push({
        type: "string",
        value: char
      });
      ++current;
      continue;
    }
    throw new TypeError("I dont know what this character is: " + char);
  }

  return tokens;
}

function parser(tokens) {}

function traverser(ast, visitor) {}

function transformer(ast) {}

function codeGenerator(node) {}

function compiler(input) {}

module.exports = {
  tokenizer,
  parser,
  traverser,
  transformer,
  codeGenerator,
  compiler
};
