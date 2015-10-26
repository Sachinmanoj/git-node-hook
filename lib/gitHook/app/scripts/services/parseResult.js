(function () {
	'use strict';
	var fs = require('fs');
	var path = require('path');
	var xml2js = require('xml2js');
	var parser = new xml2js.Parser();

	angular.module('gitHookApp').
	service('parseResult', ['testResultObj', function (testResultObj) {

		this.postSuccessCB = undefined;
		this.postErrorCB = undefined;
		this.stagedFiles = undefined;
		this.gitRootDir = undefined;
		var self = this;
		var testResult;

		var loopFunc = function (loop) {
			var index = loop.iteration();
			var fileName = self.stagedFiles[index];
			var resultFile = self.gitRootDir + '/test-results/' + path.parse(fileName).name + '.result.xml';
			fs.readFile(resultFile, function (err, data) {
				parser.parseString(data, function (err, result) {
					var failure = parseInt(result.testsuite.$.failures);
					testResult.pushTestResults(fileName, '', failure);
					loop.next();
				});
			});

		};


		/*
		 *
		 */
		this.testResults = function (err, stdout, stderr) {
			if (err) {
				console.error('Error : ' + err);
				if (self.postErrorCB) {
					self.postErrorCB(err, stderr);
				}
				return;
			}
			testResult = testResultObj.getInstance();
			fs.readFile(self.gitRootDir + '/coverage/cobertura-coverage.xml', function (err, data) {
				parser.parseString(data, function (err, result) {
					console.log(result);
					asyncLoop(self.stagedFiles.length, loopFunc, self.postSuccessCB);
				});
			});
		};

	}]);
})();
