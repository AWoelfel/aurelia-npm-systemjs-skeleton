var gulp = require('gulp');
var bundler = require('aurelia-bundler');
var fs = require("fs");

var bundles = {
    "app/app-bundle": {
        "includes": [
            "[app/**/*.js]",
            "app/**/*.html!text",
            "content/**/*.css!text"
        ],
        "excludes": [
            "config.js"
        ],
        "options": {
            "inject": true,
            "minify": false,
            "htmlminopts": {
                // Supports all options here https://github.com/kangax/html-minifier#options-quick-reference
            },
            "cssminopts" : {
                // Supports all options here https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-api
            },
            "rev": false
        }
    },
    "content/style-bundle": {
        "includes": [
            "content/**/*.css!text"
        ],
        "options": {
            "inject": true,
            "minify": false,
            "rev": false
        }
    },
    "scripts/aurelia-bundle": {
        "includes": [
            "aurelia-binding",
            "aurelia-bootstrapper",
            "aurelia-dependency-injection",
            "aurelia-event-aggregator",
            "aurelia-framework",
            "aurelia-history",
            "aurelia-history-browser",
            "aurelia-loader",
            "aurelia-loader-default",
            "aurelia-logging",
            "aurelia-logging-console",
            "aurelia-metadata",
            "aurelia-pal",
            "aurelia-pal-browser",
            "aurelia-path",
            "aurelia-route-recognizer",
            "aurelia-router",
            "aurelia-task-queue",
            "aurelia-templating",
            "aurelia-templating-binding",
            "aurelia-templating-resources",
            "aurelia-templating-router"
        ],
        "options": {
            "inject": true,
            "minify": false,
            "rev": false
        }
    },
    "scripts/scripts-bundle": {
        "includes": [
            "scripts/bluebird.js",
            "scripts/core.js",
            "scripts/text.js"
        ],
        "options": {
            "inject": true,
            "minify": false,
            "rev": false
        }
    }
};

var config = {
    force: true,
    baseURL: 'build/out',
    configPath: 'build/out/config.js',
    bundles: bundles
};

// Revert bundling changes
gulp.task('unbundle', function() {
    return bundler.unbundle(config);
});

// Do bundling
gulp.task('bundle', ['unbundle'],  function() {
    return bundler.bundle(config);
});
