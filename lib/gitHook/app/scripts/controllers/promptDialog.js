(function () {
	'use strict';
	var config = require('./scripts/config/promptDialog.json');

	angular.module('gitHookApp')
		.controller('PromptDialogCtrl', ['$scope', '$location',
		function ($scope, $location) {

				/* Node Webkit window size */
				var window = require('nw.gui').Window.get();
				window.width = config.window.width;
				window.height = config.window.height;

				$scope.question = config.dialog.message;
				$scope.button_1 = config.dialog.button1Text;
				$scope.button_2 = config.dialog.button2Text;

				$scope.proceedTesting = function () {
					$location.path('/result');
				};

				$scope.exitWithError = function () {
					process.exit(1);
				};
		}
	]);
})();