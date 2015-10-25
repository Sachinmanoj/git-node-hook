(function () {
	'use strict';

	var execSh = require('exec-sh');
	var path = require('path');

	angular.module('gitHookApp').
	service('gitHook', ['testRunner', function (testRunner) {

		var stagedFiles = [],
			gitRootDir,
			postSuccessCB,
			postErrorCB;

		/*
		 *
		 */
		var getStagedFilesCallback = function (err, stdout, stderr) {
			if (err) {
				console.error('Error : ' + err);
				if (postErrorCB) {
					postErrorCB(err, stderr);
				}
				return;
			}
			// Root Directory
			stagedFiles = stdout.split('\n');
			stagedFiles.pop();
			console.log(stagedFiles);

			/*
			 * Call testing module
			 */
			testRunner.runtest(stagedFiles, gitRootDir, postSuccessCB, postErrorCB);
		};

		/*
		 *
		 */
		var getRootDirCallback = function (err, stdout, stderr) {
			if (err) {
				console.error('Error : ' + err);
				if (postErrorCB) {
					postErrorCB(err, stderr);
				}
				return;
			}
			// Root Directory
			gitRootDir = stdout;
			gitRootDir = gitRootDir.replace('\n', '');
			gitRootDir = path.resolve(gitRootDir);

			execSh('git diff --name-only --cached', true, getStagedFilesCallback);

		};

		/*
		 *
		 */
		this.process = function (successCB, errorCB) {

			/*
			 * Get root directory of GIT repo
			 */
			postSuccessCB = successCB;
			postErrorCB = errorCB;
			execSh('git rev-parse --show-toplevel', true, getRootDirCallback);
		};

		this.getStagedFiles = function () {
			return stagedFiles;
		};

		this.getGitRootDir = function () {
			return gitRootDir;
		};
	}])
})();
