(function () {
	'use strict';
	var config = require('./scripts/config/proceedTest.json');

	angular.module('gitHookApp')
		.controller('ProceedTestCtrl', ['$scope', '$location', 'gitHook',
		function ($scope, $location, gitHook) {

				/* Node Webkit window size */
				var window = require('nw.gui').Window.get();
				window.width = config.window.width;
				window.height = config.window.height;

				var successCB = function () {
					$location.path('/result');
				};

				var errorCB = function () {

				};

				/* Launch the testing */
				gitHook.process(successCB, errorCB);
		}
	]);
})();
