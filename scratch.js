const exec = require('shelljs').exec;

//the quotations here are strangely-important
let cmd = `tape ~/mountain/nlp-compromise/test/unit/**/*.test.js | ./src/index.js`
console.log(cmd)
exec(cmd);
