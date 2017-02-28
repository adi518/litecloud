const path = require('path');

module.exports = {
  entry: './app/src/jsx/main.jsx',
  output: {
    path: path.resolve(__dirname, 'app/assets/js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,  
        loader: 'babel-loader'
      }
    ]
  }
};
