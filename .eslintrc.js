/**
 * These rules enforce the Hack Reactor Style Guide
 *
 * Visit this repo for more information:
 *   https://github.com/reactorcore/eslint-config-hackreactor
 */

module.exports = {
  extends: './node_modules/eslint-config-hackreactor/index.js',
  rules: {
    'constructor-super': 1,
    'indent': [1, 2],
    'no-var': 1
  }
};

// Will probably add env variables for mocha/chai/etc in the future --RW