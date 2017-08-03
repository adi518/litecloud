const path = require('path');

module.exports = {
  entry: './app/src/js/init.jsx',
  output: {
    path: path.resolve(__dirname, 'app/assets/js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        // test: /\.jsx?/,
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};
