var gulp = require('gulp');
var concat = require('gulp-concat')

gulp.task("default", function() {
    gulp.src(["out/test.html", "out/test2.html"])
        .pipe(concat("test.concat.html"))
    .pipe(gulp.dest("out/"));
});

gulp.task("copy", function() {
    gulp.src(["out/test.html"])
    .pipe(gulp.dest("out/test.copy.html"));
});