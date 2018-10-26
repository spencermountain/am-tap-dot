

//add commas to numbers
const niceNumber = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const pad = function(str, width, char) {
  char = char || ' ';
  str = str.toString();
  while (str.length < width) {
    str += char;
  }
  return str;
};

const nicePath = (abs) => {
  //print the path to the test
  let shortPath = abs.replace(/^.+test\//, '');
  shortPath = path.relative(process.cwd(), shortPath);
  shortPath = './' + shortPath;
  const line = test[0].error.at.line;
  if (line || line === 0) {
    shortPath += ':' + line;
  }
  return shortPath;
};

const duration = (start) => {
  return ((Date.now() - start) / 1000).toFixed(2);
};

module.exports = {
  niceNumber: niceNumber,
  pad: pad,
  nicePath: nicePath,
  duration: duration
};
