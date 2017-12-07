const babelJest = require('babel-jest');

// DISCLAIMER START:
// this file wasn't written by me
// it's a part of soon to be merged (probably) default template for preact-cli with Jest and preact-render-spy integration
// made by @fokusferit - https://github.com/fokusferit/default
// DISCLAIMER END:

// Get the babelConfig
// This one should be somehow optimized
const preactCLIBabelRC = require('preact-cli/lib/lib/babel-config.js');

const transformer = () => {
	// set environment to test
	// currently there is no test config but it works
	// It is important so set the modules options otherwise it is 'false' and Jest can't use babel to transpile
	let babelConfig = preactCLIBabelRC.default('test', { modules: 'commonjs' } );
	return babelJest.createTransformer(babelConfig);
};

module.exports = transformer();