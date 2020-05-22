const {
  tokenizer,
  parser,
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

const newAst = {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "CallExpression",
        callee: { type: "Identifier", name: "add" },
        arguments: [
          { type: "StringLiteral", value: "11" },
          {
            type: "CallExpression",
            callee: { type: "Identifier", name: "subtract" },
            arguments: [
              { type: "NumberLiteral", value: "44" },
              { type: "NumberLiteral", value: "2" }
            ]
          }
        ]
      }
    }
  ]
};

assert.deepEqual(tokenizer(input), tokens);
assert.deepEqual(parser(tokens), ast);
assert.deepEqual(transformer(ast), newAst);

// console.log("All Passed!")
