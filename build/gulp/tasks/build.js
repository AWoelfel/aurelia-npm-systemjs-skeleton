var gulp = require("gulp");
var ts = require("gulp-typescript");
var runSequence = require("run-sequence");
var es = require("event-stream");

// Compile our typescript sources
gulp.task("build-ts", function () {
    var tsProject = ts.createProject('tsconfig.json');

    return gulp.src("app/**/*.ts")
        .pipe(ts(tsProject))
        .pipe(gulp.dest("build/out/app"));
});

// Copy views, stylesheets and other scripts to output directory
gulp.task("copy-additional-files", function () {
    var html = gulp.src("app/**/*.html")
        .pipe(gulp.dest("build/out/app"));

    var scripts = gulp.src("scripts/**/*")
        .pipe(gulp.dest("build/out/scripts"));

    var css = gulp.src("content/**/*")
        .pipe(gulp.dest("build/out/content"));

    var rootElements = gulp.src(["index.html", "config.js"])
        .pipe(gulp.dest("build/out"));

    return es.concat(html, scripts, css, rootElements);
});

gulp.task("build", function () {
    return runSequence("clean", ["build-ts", "copy-additional-files"], "bundle");
});
