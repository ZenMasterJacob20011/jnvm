const path = require('path');
module.exports = {
  entry: './lib/index.js',
  mode: "production",
  target: 'node',
  output: {
    filename: 'jnvm.js',
    path: path.join(__dirname, 'dist')
  }
}
