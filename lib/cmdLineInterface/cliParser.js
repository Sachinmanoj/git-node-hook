/*
 * Parses command line arguments
 * 'commander' node_module is used to parse the command line arguments
 */

/*jslint plusplus: true */
/*jslint node:true */
/*jslint nomen: true */

var commander = require('commander'),
    path = require('path'),
    packageJSONPath = path.join(__dirname, '../../', './package.json'),
    version = require(packageJSONPath).version;

/* List of Command line options */
commander.version(version);

/* Parse the Command Line Arguments */
commander.parse(process.argv);