"use strict";
var gulp = require("gulp");
var watch = require("gulp-watch");
var browserSync = require('browser-sync');

function reportChange(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task("watch", ["serve"], function () {
    var src = [
        "src/**/*",
        "index.html"
    ];

    gulp.watch(src, ["build", browserSync.reload]).on('change', reportChange);
});