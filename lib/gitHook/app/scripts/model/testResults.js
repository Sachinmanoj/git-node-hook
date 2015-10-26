function TestResults() {
	this.results = [];
}
TestResults.prototype.pushTestResults = function (srcFileName, coverage, failedTest) {
	var data = {};
	data.srcFileName = srcFileName;
	data.coverage = coverage;
	data.failedTest = failedTest;
	this.results.push(data);
}
