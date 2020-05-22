const {
  tokenizer,
  parser,
  traverser,
  transformer,
  codeGenerator,
  compiler
} = require("./index");
const assert = require("assert");

const input = '(add "11" (subtract 44 2))';
const output = 'add( "11", subtract(44, 2) )';

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

let ast = {
  type: "Program",
  body: [
    {
      type: "CallExpression",
      name: "add",
      params: [
        { type: "StringLiteral", value: "11" },
        {
          type: "CallExpression",
          name: "subtract",
          params: [
            { type: "NumberLiteral", value: "44" },
            { type: "NumberLiteral", value: "2" }
          ]
        }
      ]
    }
  ]
};

const visiter = {
  Program: {
    enter(node, parent) {},
    exit(node, parent) {}
  },
  CallExpression: {
    enter(node, parent) {
      // ...
    },
    exit(node, parent) {
      // ...
    }
  },

  NumberLiteral: {
    enter(node, parent) {
      // ...
    },
    exit(node, parent) {
      // ...
    }
  },
  StringLiteral: {
    enter(node, parent) {
      node.value = "2222";
    },
    exit(node, parent) {}
  }
};

assert.deepEqual(tokenizer(input), tokens);
assert.deepEqual(parser(tokens), ast);

traverser(ast, visiter);

console.log(ast.body[0].params[0]);

// console.log("All Passed!")
