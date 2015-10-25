(function () {
	'use strict';

	var execSh = require('exec-sh');
	var path = require('path');

	angular.module('gitHookApp').
	service('testRunner', function () {

		var postSuccessCB,
			postErrorCB,
			testExt,
			ext;

		testExt = '.test';

		/*
		 *
		 */
		var testResults = function (err, stdout, stderr) {
			if (err) {
				console.error('Error : ' + err);
				if (postErrorCB) {
					postErrorCB(err, stderr);
				}
				return;
			}
			postSuccessCB();
		};

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

			// filter - Get the Javascript file name
			stagedFiles = stagedFiles.filter(function (elem) {
				ext = path.extname(elem);
				return (ext.toUpperCase() === '.JS');
			});

			// Map - Set test file name
			stagedFiles = stagedFiles.map(function (elem) {
				return path.parse(elem).name + testExt + path.parse(elem).ext;
			});

			return stagedFiles;
		};

		var executeTest = function (stagedFiles) {

			if (stagedFiles && stagedFiles.length > 0) {

				var stagedFilesCli = getTestFiles(stagedFiles);
				stagedFilesCli = stagedFiles.join(',');
				execSh('npm test -d true -fa ' + stagedFilesCli, true, testResults);

			} else if (postSuccessCB) {
				postSuccessCB();
			}
		};

		this.runtest = function (stagedFiles, gitRootDir, successCB, errorCB) {

			postSuccessCB = successCB;
			postErrorCB = errorCB;

			changeWorkingDir(gitRootDir);
			executeTest(stagedFiles);
		};
	});
})();
