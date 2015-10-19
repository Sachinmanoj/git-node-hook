(function () {
	'use strict';
	var config = require('./scripts/config/proceedTest.json');

	angular.module('gitHookApp')
		.controller('ProceedTestCtrl', ['$scope', '$location',
		function ($scope, $location) {

				/* Node Webkit window size */
				var window = require('nw.gui').Window.get();
				window.width = config.window.width;
				window.height = config.window.height;

				/* Launch the testing */
		}
	]);
})();