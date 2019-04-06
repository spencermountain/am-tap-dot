const exec = require('shelljs').exec;

//the quotations here are strangely-important
let cmd = `./node_modules/.bin/tape ~/mountain/wtf_wikipedia/tests/**/*.test.js | ./src/index.js`
console.log(cmd)
exec(cmd);
