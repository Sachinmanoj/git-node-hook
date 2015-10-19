'use strict';

/**
 * @ngdoc overview
 * @name gitHookApp
 * @description
 * # gitHookApp
 *
 * Main module of the application.
 */
angular
	.module('gitHookApp', [
    'ngRoute'
  ])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/promptDialog.html',
				controller: 'PromptDialogCtrl',
				controllerAs: 'prompt'
			})
			.when('/proceed', {
				templateUrl: 'views/proceedTest.html',
				controller: 'ProceedTestCtrl',
				controllerAs: 'testing'
			})
			.when('/result', {
				templateUrl: 'views/resultDisplay.html',
				controller: 'ResultDisplayCtrl',
				controllerAs: 'result'
			})
			.otherwise({
				redirectTo: '/'
			});
	});


function init() {

	require("nw.gui").Window.get().setResizable(false);

}

init();