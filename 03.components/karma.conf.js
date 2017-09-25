// Karma configuration
// Generated on Fri Dec 19 2014 09:56:38 GMT+1100 (AUS Eastern Summer Time)

module.exports = function (config) {
    "use strict";
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: ".",


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ["jasmine-ajax", "jasmine"],


        // list of files / patterns to load in the browser
        files: [
            "../libs/knockout-min.js",
            "../libs/jquery.min.js",            
            "src/**/*.js",
            "src/**/*.ts",
        ],

        // list of files to exclude
        exclude: [
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            "src/**/*.ts": ["typescript", "sourcemap"],
            "tests/**/*.ts": ["typescript", "sourcemap"]
        },

        mime: {
            'text/x-typescript': ['ts','tsx']
        },

        typescriptPreprocessor: {
            tsconfigPath: "tsconfig.json",
            compilerOptions: {
                "typescript": require("typescript")
            },
            // options passed to the typescript compiler
            sourcemapOptions: {
                includeContent: true,
                sourceRoot: "/src"
            },
            ignorePath: function (path) {
                return /\.d\.ts$/.test(path);
            },
            transformPath: [function (path) { // *optional
                return path.replace(/\.ts$/, ".js");
            }],
            typings: [
                'node_modules/@types/**/*.d.ts'
            ]
        },

        // test results reporter to use
        // possible values: "dots", "progress"
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ["spec"],


        // web server port
        port: 9886,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ["PhantomJS"],
        //browsers: ["Chrome"],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Longer timeout for teamcity
        browserNoActivityTimeout: 10000,
        // Try to connect number of times
        browserDisconnectTolerance: 5
    });
};