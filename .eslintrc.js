// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // non-boilerplate
    "comma-dangle": 0,
    "no-unused-vars": 0,
    "indent": 0, // TODO: remove once formatting works
    "no-tabs": 0, // TODO: remove once formatting works
    "no-trailing-spaces": 0, // TODO: remove once formatting works
    "space-before-function-paren": 0, // TODO: remove once formatting works
    "no-undef": 0, // TODO: remove once formatting works
    "no-unneeded-ternary": 0 // TODO: remove once formatting works
  }
}
