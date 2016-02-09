var gulp = require("gulp");
var vinylPaths = require("vinyl-paths");
var del = require("del");

// Clean output folder
gulp.task("clean", function () {
    return gulp.src("build/out")
        .pipe(vinylPaths(del));
});
