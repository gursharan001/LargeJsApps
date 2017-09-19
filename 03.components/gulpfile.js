"use strict";

var gulp = require("gulp");

require('require-dir')('gulptasks');

// Default Task
gulp.task("default", ["build"]);