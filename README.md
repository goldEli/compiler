# Compiler

learn from [ jamiebuilds /
the-super-tiny-compiler ](https://github.com/jamiebuilds/the-super-tiny-compiler)

```javascript
const { compiler } = require("./index");
const assert = require("assert");

const input = '(add "11" (subtract 44 2))';

const output = 'add("11",subtract(44,2));';

assert.deepEqual(compiler(input), output);
```
