var gulp = require('gulp');
var path = require("path");
var fs = require("fs");

gulp.task("copy-aurelia-typings", function () {
    return gulp.src("node_modules/aurelia*/dist/amd/*.d.ts")
        .pipe(debug())
        .pipe(flatten())
        .pipe(gulp.dest("typings/aurelia"));
});

gulp.task("copy-aurelia-libs", function () {
    var destFolder = "scripts/aurelia";

    if (!fs.existsSync(destFolder)) {
        fs.mkdirSync(destFolder);
    }

    return gulp.src("node_modules/aurelia*/dist/commonjs/*.js")
        .pipe(gulp.dest(function(file) {
            var part = file.path.substr(file.base.length);
            var moduleName = part.substr(0, part.indexOf(path.sep));
            file.path = file.base + moduleName + '/' + path.basename(file.path);

            generateIndexFile(destFolder, moduleName);

            return destFolder;
        }));
});

function generateIndexFile(destFolder, moduleName) {
    var content = 'define(["aurelialib:' + moduleName + '/' + moduleName + '"], function(main) { return main; });';
    fs.writeFileSync(destFolder + '/' + moduleName + ".js", content);
}
