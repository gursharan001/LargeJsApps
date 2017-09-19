"use strict";

var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var Cachebuster = require("gulp-cachebust");
var htmltojson = require("gulp-html-to-json");
var ts = require("gulp-typescript");
var gulpif = require("gulp-if");
var order = require("gulp-order");

gulp.task("buildKoTemplates", function () {
    "use strict";
    var t1 = gulp.src("src/components/moduleComponentTemplates.tpl")
        .pipe(htmltojson({
            filename: "moduleComponentTemplates",
            useAsVariable: true
        }))
        .pipe(gulp.dest("src/components"));

    return t1;
});

var buster = new Cachebuster();

gulp.task("buildjs", ["clean", "buildKoTemplates"],
    function () {
        var tsproj = ts.createProject("./tsconfig.json");

        var files = [
            "src/**/*.ts",
            "src/**/*.js",
            "!src/**/*spec.ts",
        ];

        return gulp
            .src(files,
            {
                base: "."
            })
            .pipe(order(files))
            .pipe(sourcemaps.init())
            .pipe(gulpif(/\.ts$/, tsproj(ts.reporter.fullReporter(true))))
            .pipe(concat("module.min.js"))
            .pipe(uglify())
            .pipe(buster.resources())
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest("dist"));
    });

gulp.task('build', ["buildjs"], function () {
    return gulp.src('index.html')
        .pipe(buster.references())
        .pipe(gulp.dest('dist'));
})