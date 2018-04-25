A TAP test-reporter for nodejs, like [tap-dot](https://github.com/scottcorgan/tap-dot), but with more information about failures, and where to find them.

based on [am-tap-dot](http://github.com/amokrushin/am-tap-dot) by [amokrushin](https://github.com/amokrushin). (Thanks!)

```bash
# local
npm i tap-dance --save-dev

# global
npm i tap-dance -g
```

### API
```js
const test = require('tape');
const TapDance = require('tap-dance');

test.createStream()
    .pipe(new TapDance())
    .pipe(process.stdout);
```

### Command-line
```bash
tape test/index.js | node_modules/.bin/tap-dance
```
or in **package.json**,

```json
{
  "name": "module-name",
  "scripts": {
    "test": "node ./test/tap-test.js | tap-dance"
  }
}
```

Then run with `npm test`

MIT
