const gulp = require('gulp');

gulp.task('default', function(cb) {

    console.log('hello world');
    cb();
});

gulp.task('ch', function(cb) {

    console.log('你好');
    cb();
});

gulp.task('hello-world', function(cb) {

    console.log('hello world');
    cb();
});
