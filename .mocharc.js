const unitConfigs = require('./unit.mocharc.json')
const e2eConfigs = require('./e2e.mocharc.json')
/**
 * mocharc.js (or simply mocha.opts for versions prior to Mocha 8.0.0) is a configuration file used to customize the behavior of the Mocha test runner. 
 * This file allows you to define various options, settings, and command-line arguments that affect how your tests are executed. 
 * By using a mocharc.js file, you can avoid passing command-line arguments every time you run Mocha
 */

const UNIT = 'unit'

class Test {
	unit = unitConfigs
	e2e = e2eConfigs

	constructor(suite){
		this.suite = suite
	}

	getConfigs(){
		if(this.suite === 'unit'){
			return this.unit
		}
		else{
			return this.e2e
		}
	}
}

const suite = process.env.TEST_SUITE || UNIT;
const suiteConfigs = new Test(suite)

module.exports = suiteConfigs.getConfigs()
