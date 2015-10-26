(function () {
	'use strict';
	var config = require('./scripts/config/resultDisplay.json');

	angular.module('gitHookApp')
		.controller('ResultDisplayCtrl', ['$scope', '$location', 'testResultObj',
		function ($scope, $location, testResultObj) {

				/* Node Webkit window size */
				var window = require('nw.gui').Window.get();
				window.x -= config.window.x;
				window.y -= config.window.y;
				window.width = config.window.width;
				window.height = config.window.height;
				var testResult = testResultObj.getInstance();
				$scope.results = testResult.results;
				$scope.button_1 = config.pageConfig.button1Text;
				$scope.button_2 = config.pageConfig.button2Text;

				$scope.proceedTesting = function () {
					process.exit(0);
				}
				$scope.exitWithError = function () {
					process.exit(1);
				}
		}
	]);
})();
