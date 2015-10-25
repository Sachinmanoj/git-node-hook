(function () {
	'use strict';
	var config = require('./scripts/config/proceedTest.json');

	angular.module('gitHookApp')
		.controller('ProceedTestCtrl', ['$rootScope', '$location', 'gitHook',
		function ($rootScope, $location, gitHook) {

				/* Node Webkit window size */
				var window = require('nw.gui').Window.get();
				window.width = config.window.width;
				window.height = config.window.height;

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
