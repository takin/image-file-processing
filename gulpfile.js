const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const mozjpeg = require("imagemin-mozjpeg");
const imageResize = require("gulp-image-resize");

gulp.task("default", function() {
  gulp
    .src("/Users/mtakin/Downloads/Tagihan/D/**/**.jpeg")
    .pipe(imageResize({ width: 800 }))
    .pipe(imagemin([mozjpeg({ quality: 30 })]))
    .pipe(gulp.dest("/Users/mtakin/Downloads/Tagihan-Compressed/D"));
});
