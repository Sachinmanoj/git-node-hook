(function () {
	'use strict';
	var config = require('./scripts/config/proceedTest.json');

	angular.module('gitHookApp')
		.controller('ProceedTestCtrl', ['$rootScope', '$location', 'gitHook', 'testResultObj',
		function ($rootScope, $location, gitHook, testResultObj) {

				/* Node Webkit window size */
				var window = require('nw.gui').Window.get();
				window.width = config.window.width;
				window.height = config.window.height;

				testResultObj.createInstance();

				var successCB = function () {
					$rootScope.$apply(function () {
						$location.path('/result');
					});
				};

				var errorCB = function () {

				};

				/* Launch the testing */
				gitHook.process(successCB, errorCB);
		}
	]);
})();
