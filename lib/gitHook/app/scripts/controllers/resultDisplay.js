(function () {
	'use strict';
	var config = require('./scripts/config/resultDisplay.json');

	angular.module('gitHookApp')
		.controller('ResultDisplayCtrl', ['$scope', '$location',
		function ($scope, $location) {

				/* Node Webkit window size */
				var window = require('nw.gui').Window.get();
				window.x -= config.window.x;
				window.y -= config.window.y;
				window.width = config.window.width;
				window.height = config.window.height;

		}
	]);
})();