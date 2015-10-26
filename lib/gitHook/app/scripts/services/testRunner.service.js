(function () {
	'use strict';

	var execSh = require('exec-sh');
	var path = require('path');

	angular.module('gitHookApp').
	service('testRunner', ['parseResult', function (parseResult) {

		var postSuccessCB,
			postErrorCB,
			testExt,
			ext;

		testExt = '.test';

		var changeWorkingDir = function (gitRootDir) {
			process.chdir(gitRootDir);
		};

		var getTestFiles = function (stagedFiles) {

			// Map - Get the file name
			stagedFiles = stagedFiles.map(function (elem) {
				elem = path.resolve(elem);
				return path.parse(elem).base;
			});

			// EXCLUDE FEW FILES IF NECCESSARY
			stagedFiles = stagedFiles.filter(function (elem) {
				return (elem.indexOf('source/app/') > -1);
			});

			// filter - Get the Javascript file name
			stagedFiles = stagedFiles.filter(function (elem) {
				ext = path.extname(elem);
				return (ext.toUpperCase() === '.JS');
			});

			// Store the source file names
			parseResult.stagedFiles = stagedFiles;

			// Map - Set test file name
			stagedFiles = stagedFiles.map(function (elem) {
				return path.parse(elem).name + testExt + path.parse(elem).ext;
			});

			return stagedFiles;
		};

		var executeTest = function (stagedFiles) {

			var stagedFilesCli = getTestFiles(stagedFiles);

			if (stagedFilesCli && stagedFilesCli.length > 0) {

				stagedFilesCli = stagedFiles.join(',');
				execSh('npm test -d true -fa ' + stagedFilesCli, true, parseResult.testResults);

			} else if (parseResult.postSuccessCB) {
				parseResult.postSuccessCB();
			}
		};

		this.runtest = function (stagedFiles, gitRootDir, successCB, errorCB) {

			parseResult.postSuccessCB = successCB;
			parseResult.postErrorCB = errorCB;
			parseResult.gitRootDir = gitRootDir;

			changeWorkingDir(gitRootDir);
			executeTest(stagedFiles);
		};
	}]);
})();
