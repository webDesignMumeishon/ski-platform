
/**
 * mocharc.js (or simply mocha.opts for versions prior to Mocha 8.0.0) is a configuration file used to customize the behavior of the Mocha test runner. 
 * This file allows you to define various options, settings, and command-line arguments that affect how your tests are executed. 
 * By using a mocharc.js file, you can avoid passing command-line arguments every time you run Mocha
 */


const suite = process.env.TEST_SUITE || 'unit';
const isUnit = suite === 'unit';
const timeout = isUnit ? 50 : 3000;

const requiredFiles = [
	'ts-node/register', // It allows you to directly run TypeScript code in Node.js without having to explicitly compile it to JavaScript first. By using ts-node/register, you're telling Node.js to use the TypeScript compiler (ts-node) to transpile your TypeScript code on-the-fly before executing it.
	'test/config.ts', // Load config file to set up middlewares
	'source-map-support/register', // When an error occurs, this utility helps translate the error location from the compiled JavaScript back to the original TypeScript source code.
];

module.exports = {
	timeout,
	exit: true,
	parallel: false,//isUnit,
	recursive: true,
	require: requiredFiles
};
