var gulp = require("gulp");
var ts = require("gulp-typescript");
var es = require("event-stream");
var sourcemaps = require('gulp-sourcemaps');

var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');

// Compile our typescript sources
gulp.task("build-ts-local", ["build", "clean"], function () {
    var tsProject = ts.createProject('tsconfig.json');

    return gulp.src('app/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("build/out/app"));
});

gulp.task("build-ts", ["clean"], function () {
    var tsProject = ts.createProject('tsconfig.json');

    return gulp.src('app/**/*.ts')
        .pipe(ts(tsProject))
        .pipe(gulp.dest("build/out/app"));
});

gulp.task("compile-ts", ["clean"], function () {
    var tsProject = ts.createProject('tsconfig.json');

    return gulp.src('app/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));
});

gulp.task("compile-less", ["clean"], function () {

    gulp.src('./content/**/*.less')
        .pipe(less())
        .pipe(concat('styles.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('./build/out/content'));

});

gulp.task("copy-contents", ["clean", "compile-less", "copy-additional-files", "copy-dependent-lib-files"]);



// Copy views, stylesheets and other scripts to output directory
gulp.task("copy-additional-files", ["build-ts"], function () {
    var html = gulp.src("app/**/*.html")
        .pipe(gulp.dest("build/out/app"));

    var scripts = gulp.src("scripts/**/*")
        .pipe(gulp.dest("build/out/scripts"));

    var rootElements = gulp.src(["index.html", "config.js"])
        .pipe(gulp.dest("build/out"));

    var images = gulp.src("content/images/**/*")
        .pipe(gulp.dest("./build/out/content/images"));

    var svg = gulp.src("content/svg/**/*")
        .pipe(gulp.dest("./build/out/content/svg"));


    return es.concat(html, scripts, rootElements, images);
});


// Copy third party libraries
gulp.task("copy-dependent-lib-files", ["clean"], function () {

    var additionalFiles = ['node_modules/moment/min/moment-with-locales.min.js'];
    return gulp.src(additionalFiles).pipe(gulp.dest("build/out/scripts"));

});


// Copy ts files for local debugging
gulp.task("copy-ts-files", ["build-ts-local"], function (cb) {
    return gulp.src("app/**/*.ts").pipe(gulp.dest("build/out/app"));
});
gulp.task("copy-ts-typings", ["build-ts-local"], function (cb) {
    return gulp.src("typings/**/*").pipe(gulp.dest("build/out/typings"));
});



gulp.task("build", ["build-ts", "copy-contents", "clean"]);

gulp.task("build-local", ["build-ts-local", "copy-ts-files", "copy-ts-typings"]);

