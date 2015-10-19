/*
 * Start of the program
 */

/*jslint node:true */
/*jslint nomen: true */

var cliReader = require('./cmdLineInterface/cliParser'),
	cp = require('child_process'),
	path = require('path'),
	nodeWebkit = path.resolve(path.join(__dirname, '../', './node_modules/nw/nwjs/nw')),
	gitHook = path.resolve(path.join(__dirname, './gitHook'));

function mainApp() {
	'use strict';
	var execCmd = nodeWebkit + ' ' + gitHook;
	console.log(execCmd);
	cp.exec(execCmd, function (err, done) {
		console.log(err);
	});
}

if (module && module.exports) {
	module.exports.mainApp = mainApp;
}