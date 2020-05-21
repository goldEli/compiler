const {
  tokenizer,
  parser,
  traverser,
  transformer,
  codeGenerator,
  compiler
} = require("./index");

const tokens = [
  { type: "parentheses", value: "(" },
  { type: "name", value: "add" },
  { type: "string", value: "11" },
  { type: "parentheses", value: "(" },
  { type: "name", value: "subtract" },
  { type: "number", value: "44" },
  { type: "number", value: "2" },
  { type: "parentheses", value: ")" },
  { type: "parentheses", value: ")" }
];

const assert = require("assert");

const input = '(add "11" (subtract 44 2))';

assert.deepEqual(tokenizer(input), tokens);

// const tokens = tokenizer(input);
// console.log(JSON.stringify(tokens));
