(function () {
	'use strict';

	angular.module('gitHookApp').
	factory('testResultObj', function () {
		var testResult,
			factory = {};

		factory.createInstance = function () {
			testResult = new TestResults();
		};

		factory.getInstance = function () {
			if (testResult) {
				return testResult;
			}
			return new TestResults();
		};

		return factory;
	});
})();
