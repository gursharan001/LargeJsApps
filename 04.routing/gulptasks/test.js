var gulp = require('gulp');
var karma = require('karma');

var karmaSingleTestRunTask = function (done) {
    'use strict';
    var server = new karma.Server({
        configFile: process.cwd() + '/karma.conf.js',
        singleRun: true
    }, done);
    server.start();
};

gulp.task('test', karmaSingleTestRunTask);

var karmaContinuousTestRunTask = function (done) {
    'use strict';
    var server = new karma.Server({
        configFile: process.cwd() + '/karma.conf.js',
        singleRun: false
    }, done);
    server.start();
};

gulp.task('tdd', karmaContinuousTestRunTask);