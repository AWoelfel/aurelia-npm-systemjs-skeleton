var gulp = require("gulp");

require("require-dir")("build/gulp/tasks");

gulp.task("default",  ["build"]);


