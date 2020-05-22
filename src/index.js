const types = {
  parentheses: "parentheses",
  number: "number",
  string: "string",
  name: "name"
};
const nodeTypes = {
  Program: "Program",
  NumberLiteral: "NumberLiteral",
  StringLiteral: "StringLiteral",
  CallExpression: "CallExpression"
};
function tokenizer(input) {
  let current = 0;
  let tokens = [];

  while (input.length > current) {
    let char = input[current];

    if (char === "(") {
      tokens.push({
        type: types.parentheses,
        value: char
      });
      ++current;
      continue;
    }

    if (char === ")") {
      tokens.push({
        type: types.parentheses,
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
        type: types.number,
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
        type: types.name,
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
        type: types.string,
        value: char
      });
      ++current;
      continue;
    }
    throw new TypeError("I dont know what this character is: " + char);
  }

  return tokens;
}

function parser(tokens) {
  let current = 0;

  function walk() {
    let token = tokens[current];

    if (token.type === types.number) {
      return {
        type: nodeTypes.NumberLiteral,
        value: token.value
      };
    }
    if (token.type === types.string) {
      return {
        type: nodeTypes.StringLiteral,
        value: token.value
      };
    }
    if (token.type === types.parentheses && token.value === "(") {
      token = tokens[++current];

      const node = {
        type: nodeTypes.CallExpression,
        name: token.value,
        params: []
      };

      token = tokens[++current];

      while (
        token.type !== types.parentheses ||
        (token.type === types.parentheses && token.value !== ")")
      ) {
        node.params.push(walk());
        token = tokens[++current];
      }

      return node;
    }
  }

  const ast = {
    type: "Program",
    body: []
  };

  while (tokens.length > current) {
    ast.body.push(walk());
    ++current;
  }
  return ast;
}

function traverser(ast, visitor) {
  function traverseArray(nodes, parent) {
    nodes.forEach(node => {
      traverseNode(node, parent);
    });
  }

  function traverseNode(node, parent) {
    const method = visitor[node.type];

    method && method.enter && method.enter(node, parent);

    switch (node.type) {
      case nodeTypes.Program:
        traverseArray(node.body, node);
        break;
      case nodeTypes.CallExpression:
        traverseArray(node.params, node);
        break;
      case nodeTypes.StringLiteral:
      case nodeTypes.NumberLiteral:
        break;
      default:
        throw new TypeError(node.type);
    }

    method && method.exit && method.exit(node, parent);
  }

  traverseNode(ast, null);
}
// type: 'ExpressionStatement',
//        expression: {
//          type: 'CallExpression',
//          callee: {
//            type: 'Identifier',
//            name: 'add'
//          },
//          arguments: [{
//            type: 'NumberLiteral',
//            value: '2'
//          }, {
function transformer(ast) {
  const newAst = {
    type: "Program",
    body: []
  };
  ast._context = newAst.body;
  traverser(ast, {
    NumberLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: "NumberLiteral",
          value: node.value
        });
      }
    },
    StringLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: "StringLiteral",
          value: node.value
        });
      }
    },
    CallExpression: {
      enter: (node, parent) => {
        let expression = {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: node.name
          },
          arguments: []
        };

        node._context = expression.arguments;

        if (parent.type !== "CallExpression") {
          expression = {
            type: "ExpressionStatement",
            expression: expression
          };
        }

        parent._context.push(expression);
      }
    }
  });
  return newAst;
}

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
